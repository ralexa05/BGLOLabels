import { ComAtprotoLabelDefs } from '@atcute/client/lexicons';
import { LabelerServer } from '@skyware/labeler';

import { DID, SIGNING_KEY } from './config.js';
import { DELETE, LABELS, LABEL_LIMIT } from './constants.js';
import logger from './logger.js';

export const labelerServer = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });

export const label = (did: string, rkey: string) => {
  logger.info(`Received rkey: ${rkey} for ${did}`);

  if (rkey === 'self') {
    logger.info(`${did} liked the labeler. Returning.`);
    return;
  }

  processLabel(did, rkey);
};

function processLabel(did: string, rkey: string) {
  try {
    const labels = fetchCurrentLabels(did);

    if (rkey.includes(DELETE)) {
      deleteAllLabels(did, labels);
    } else {
      addOrUpdateLabel(did, rkey, labels);
    }
  } catch (error) {
    logger.error(`Error in processLabel function: ${error}`);
  }
}

function fetchCurrentLabels(did: string): Set<string> {
  const query = labelerServer.db
    .prepare<ComAtprotoLabelDefs.Label[]>(`SELECT * FROM labels WHERE uri = ?`)
    .all(did);

  const labels = query.reduce((set, label) => {
    if (!label.neg) set.add(label.val);
    else set.delete(label.val);
    return set;
  }, new Set<string>());

  logCurrentLabels(labels);
  return labels;
}

function logCurrentLabels(labels: Set<string>) {
  if (labels.size > 0) {
    logger.info(`Current labels: ${Array.from(labels).join(', ')}`);
  } else {
    logger.info('No current labels found.');
  }
}

function deleteAllLabels(did: string, labels: Set<string>) {
  const labelsToDelete: string[] = Array.from(labels);

  if (labelsToDelete.length === 0) {
    logger.info(`No labels to delete`);
    return;
  }

  logger.info(`Deleting labels: ${labelsToDelete.join(', ')}`);
  labelerServer.createLabels({ uri: did }, { negate: labelsToDelete })
    .then(() => logger.info('Successfully deleted all labels'))
    .catch(error => logger.error(`Error deleting labels: ${error}`));
}

function addOrUpdateLabel(did: string, rkey: string, existingLabels: Set<string>) {
  const newLabel = LABELS.find(label => label.rkey === rkey);

  if (!newLabel) {
    logger.warn(`Label not found for rkey: ${rkey}`);
    return;
  }

  if (existingLabels.size >= LABEL_LIMIT) {
    logger.info(`Label limit reached, negating existing labels`);
    negateLabels(did, existingLabels);
    return;
  }

  labelerServer.createLabel({ uri: did, val: newLabel.identifier })
    .then(() => logger.info(`Labeled ${did} as '${newLabel.identifier}'`))
    .catch(error => logger.error(`Error adding label: ${error}`));
}

function negateLabels(did: string, labels: Set<string>) {
  labelerServer.createLabels({ uri: did }, { negate: Array.from(labels) })
    .then(() => logger.info(`Negated labels for ${did}`))
    .catch(error => logger.error(`Error negating labels: ${error}`));
}

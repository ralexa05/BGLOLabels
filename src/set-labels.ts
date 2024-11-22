import { type ComAtprotoLabelDefs } from '@atproto/api';
import { type LoginCredentials, setLabelerLabelDefinitions } from '@skyware/labeler/scripts';

import { BSKY_IDENTIFIER, BSKY_PASSWORD } from './config.js';
import { LABELS } from './constants.js';
import logger from './logger.js';

const loginCredentials: LoginCredentials = {
  identifier: BSKY_IDENTIFIER,
  password: BSKY_PASSWORD,
};

// Function to create label definitions from LABELS
function createLabelDefinitions(): ComAtprotoLabelDefs.LabelValueDefinition[] {
  return LABELS.map(label => ({
    identifier: label.identifier,
    severity: 'inform',
    blurs: 'none',
    defaultSetting: 'warn',
    adultOnly: false,
    locales: label.locales,
  }));
}

async function setLabelDefinitions() {
  const labelDefinitions = createLabelDefinitions();
  try {
    await setLabelerLabelDefinitions(loginCredentials, labelDefinitions);
    logger.info('Label definitions set successfully.');
  } catch (error) {
    logger.error(`Error setting label definitions: ${error instanceof Error ? error.message : error}`);
  }
}

setLabelDefinitions();


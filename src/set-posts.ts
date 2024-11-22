import { Bot } from '@skyware/bot';

import { BSKY_IDENTIFIER, BSKY_PASSWORD } from './config.js';
import { LABELS } from './constants.js';
import logger from './logger.js';

const bot = new Bot();

async function main() {
  try {
    await bot.login({
      identifier: BSKY_IDENTIFIER,
      password: BSKY_PASSWORD,
    });
  } catch (error) {
    logger.error('Error logging in:', error);
    process.exit(1);
  }

  process.stdout.write('WARNING: This will delete all posts in your profile. Are you sure you want to continue? (y/n) ');

  const answer = await new Promise(resolve => {
    process.stdin.once('data', data => {
      resolve(data.toString().trim().toLowerCase());
    });
  });

  if (answer !== 'y') {
    logger.info('Operation cancelled.');
    process.exit(0);
  }

  try {
    const postsToDelete = await bot.profile.getPosts();
    for (const post of postsToDelete.posts) {
      await post.delete();
    }
    logger.info('All posts have been deleted.');
  } catch (error) {
    logger.error('Failed to delete posts:', error);
    process.exit(1);
  }

  try {
    const post = await bot.post({
      text: 'Like the replies to this post to receive labels.',
      threadgate: { allowLists: [] },
    });

    const labelNames = LABELS.map(label => label.locales.map(locale => locale.name).join(' | '));
    const labelRkeys: Record<string, string> = {};

    for (const labelName of labelNames) {
      const labelPost = await post.reply({ text: labelName });
      labelRkeys[labelName] = labelPost.uri.split('/').pop()!;
    }

    logger.info('Label rkeys:');
    for (const [name, rkey] of Object.entries(labelRkeys)) {
      logger.info(`    name: '${name}',`);
      logger.info(`    rkey: '${rkey}',`);
    }

    const deletePost = await bot.post({ text: 'Like this post to delete all labels.' });
    const deletePostRkey = deletePost.uri.split('/').pop()!;
    logger.info(`Delete post rkey: '${deletePostRkey}';`);

  } catch (error) {
    logger.error('An error occurred during post creation or reply:', error);
    process.exit(1);
  }

  process.exit(0);
}

main();

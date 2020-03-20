/**
 * This script applies a hotfix that prevents tsc build errors on compiled grammar files.
 */

import { configure, format, add, transports } from 'winston';
import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';

/**
 * Set up logger.
 */
configure({
  level: 'info',
  format: format.combine(format.colorize({ all: true }), format.simple()),
});
const logger = add(new transports.Console());

/**
 * Project root path.
 */
const projectRoot = join(__dirname, '..', '..');

/**
 * Grammar file.
 */
const grammarFile = join(projectRoot, 'src', 'mysql', 'language', 'grammar.ts');

/**
 * Main function for this script.
 */
const main = async (): Promise<void> => {
  logger.info('Applying grammar hotfix...');

  let lastError = null;

  const buffer = await new Promise<Buffer>(resolve => {
    readFile(grammarFile, (error, buffer) => {
      lastError = error;
      resolve(buffer);
    })
  });

  if (lastError) {
    logger.error(`Error reading grammar file: ${lastError}`);
    process.exit(1);
  }

  const hotfix = buffer.toString().replace('interface NearleyToken', 'interface NearleyToken extends moo.Token');

  await new Promise<void>(resolve => {
    writeFile(grammarFile, hotfix, (error) => {
      lastError = error;
      resolve();
    })
  });

  if (lastError) {
    logger.error(`Error writing grammar file: ${lastError}`);
    process.exit(1);
  }
};

main().then(async () => {
  logger.info('Hotfix applied successfully!');
});

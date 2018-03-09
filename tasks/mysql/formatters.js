/**
 * This script copies contents of formatters to the lib folder.
 */

const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

/**
 * Set up logger.
 */
winston.configure({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});
const logger = winston.add(new winston.transports.Console());

/**
 * Project root path.
 */
const projectRoot = path.join(__dirname, '..', '..');

/**
 * Input.
 */
const srcFolder = path.join(projectRoot, 'src', 'mysql', 'formatter');
const compiledFolder = path.join(projectRoot, 'lib', 'mysql', 'formatter');

logger.info('Copying formatters...');

/**
 * Main function for this script.
 *
 * @returns {void}
 */
const main = async() => {

  let lastError = null;

  /**
   * Copy formatter folder.
   */

  await new Promise(resolve =>
    fs.copy(srcFolder, compiledFolder)
      .then(resolve)
      .catch(error => {
        lastError = error;
        resolve();
      })
  );

  if (lastError) {
    logger.error(`Error copying formatters folder: ${lastError}`);
    process.exit(1);
  }
};

main().then(async() => {
  logger.info('Formatters copied successfully!');
});

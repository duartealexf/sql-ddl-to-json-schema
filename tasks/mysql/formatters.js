/**
 * This script copies contents of formatters to the lib folder.
 */

const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const babel = require('babel-core');

const utils = require('../../src/shared/utils');

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

/**
 * Filter functions that gets only .js files.
 * @param {string} filepath Filepath.
 * @returns {boolean} Whether it is .js file.
 */
const filter = filepath => filepath.substr(-3) === '.js';

logger.info('Transpiling formatters...');

/**
 * Main function for this script.
 *
 * @returns {Promise<void>} Main function promise.
 */
const main = async() => {

  const lastError = null;

  /**
   * Get filelist from formatter folder.
   * @type {string[]}
   */
  const filelist = await new Promise(resolve => {
    resolve(utils.getFilelist(srcFolder, filter));
  });

  filelist.forEach(filepath => {
    const { code } = babel.transformFileSync(filepath);
    const filepathParts = filepath.split(path.sep);
    const destFile = filepathParts.pop();
    const destFolder = path.join(
      compiledFolder,
      filepathParts.join(path.sep).substr(srcFolder.length + 1)
    );

    logger.info(`Transpiling ${filepath}...`);

    fs.mkdirpSync(destFolder);
    fs.writeFileSync(path.join(destFolder, destFile), code);
  });
};

main().then(async() => {
  logger.info('Formatters transpiled successfully!');
});

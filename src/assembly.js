/**
 * This script gets contents of lexer.ne, and .ne files in rules folder,
 * concatenating them all to lib/compiled/grammar.ne, so it can be
 * later compiled to grammar.js by nearleyc.
 *
 * It is also responsible for copying the dictionary and shared folder to
 * lib/compiled folder (so it can be read by the compiled grammar files).
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
const projectRoot = path.join(__dirname, '..');

/**
 * Input.
 */
const lexerFile = path.join(projectRoot, 'src', 'lexer.ne');
const rulesFolder = path.join(projectRoot, 'src', 'rules');

/**
 * Output.
 */
const compiledFolder = path.join(projectRoot, 'lib', 'compiled');
const nearleyGrammar = path.join(compiledFolder, 'grammar.ne');

logger.log('info', 'Sarting grammar assembly...');

/**
 * Main function for this script.
 *
 * @returns {void}
 */
const main = async() => {

  logger.log('info', 'Obtaining rules...');

  let lastError = null;

  /**
   * Rules filepaths.
   * @type {string[]}
   */
  let files = await new Promise(resolve =>
    fs.readdir(rulesFolder, (error, arr) => {
      lastError = error;
      resolve(arr);
    })
  );

  if (lastError) {
    logger.log('error', `Error reading rules files: ${lastError}`);
    process.exit(1);
  }

  /**
   * Filter .ne files and prepend full path.
   */
  files = files
    .filter(file => file.split('.').pop() === 'ne')
    .map(file => path.join(rulesFolder, file));

  logger.log('info', 'Obtaining lexer...');

  /**
   * Lexer file contents.
   * @type {Buffer}
   */
  const lexer = await new Promise(resolve =>
    fs.readFile(lexerFile, (error, buffer) => {
      lastError = error;
      resolve(buffer);
    })
  );

  if (lastError) {
    logger.log('error', `Error reading lexer file: ${lastError}`);
    process.exit(1);
  }

  logger.log('info', 'Appending lexer to grammar...');

  /**
   * Clear output file and start by writing lexer contents into it.
   */
  lastError = await new Promise(resolve => fs.writeFile(nearleyGrammar, lexer, resolve));

  if (lastError) {
    logger.log('error', `Error writing grammar file: ${lastError}`);
    process.exit(1);
  }

  /**
   * Append rules files to grammar file.
   */
  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    const filename = file.split(path.delimiter).pop();
    logger.log('info', `Obtaining contents of ${filename}...`);

    /**
     * Get file contents.
     * @type {Buffer}
     */
    const contents = await new Promise(resolve =>
      fs.readFile(file, (error, buffer) => {
        lastError = error;
        resolve(buffer);
      })
    );

    if (lastError) {
      logger.log('error', `Error reading rules file (${file}): ${lastError}`);
      process.exit(1);
    }

    logger.log('info', `Writing contents to grammar...`);

    lastError = await new Promise(resolve => fs.appendFile(nearleyGrammar, contents, resolve));

    if (lastError) {
      logger.log('error', `Error appeding rules of file (${file}) to grammar: ${lastError}`);
      process.exit(1);
    }
  }

  /**
   * Copy dictionary folder.
   */
  logger.log('info', 'Copying dictionary folder...');

  await new Promise(resolve =>
    fs.copy(
      path.join(projectRoot, 'src', 'dictionary'),
      path.join(projectRoot, 'lib', 'compiled', 'dictionary')
    )
      .then(resolve)
      .catch(error => {
        lastError = error;
        resolve();
      })
  );

  /**
   * Copy shared folder.
   */
  logger.log('info', 'Copying shared folder...');

  await new Promise(resolve =>
    fs.copy(
      path.join(projectRoot, 'src', 'shared'),
      path.join(projectRoot, 'lib', 'compiled', 'shared')
    )
      .then(resolve)
      .catch(error => {
        lastError = error;
        resolve();
      })
  );

  if (lastError) {
    logger.log('error', `Error copying shared folder: ${lastError}`);
    process.exit(1);
  }
};

main().then(async() => {
  logger.log('info', 'Grammar assembled successfully!');
});

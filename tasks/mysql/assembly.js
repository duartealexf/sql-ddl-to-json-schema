/**
 * This script gets contents of lexer.ne, and .ne files in parser / rules,
 * folder concatenating them all to lib/compiled/grammar.ne, so it can be
 * later compiled to grammar.js by nearleyc.
 *
 * It is also responsible for copying the dictionary and shared folder to
 * lib/compiled folder (so it can be read by the compiled grammar files).
 */

const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

/**
 * Get keywords to be matched as an identifier where
 * needed (see S_IDENTIFIER in lexer.ne file).
 */
const keywords = require('../../src/mysql/parser/dictionary/keywords');

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
const srcFolder = path.join(projectRoot, 'src', 'mysql', 'parser');
const rulesFolder = path.join(srcFolder, 'rules');
const lexerFile = path.join(srcFolder, 'lexer.ne');

/**
 * Output.
 */
const compiledFolder = path.join(projectRoot, 'lib', 'mysql', 'parser');
const nearleyGrammar = path.join(compiledFolder, 'grammar.ne');

if (!fs.existsSync(compiledFolder)) {
  fs.mkdirSync(compiledFolder);
}

/**
 * Other files and folder that are also copied.
 */
const dictionaryFrom = path.join(srcFolder, 'dictionary');
const dictionaryTo = path.join(compiledFolder, 'dictionary');
const sharedFrom = path.join(projectRoot, 'src', 'shared');
const sharedTo = path.join(projectRoot, 'lib', 'shared');

logger.info('Starting grammar assembly...');

/**
 * Main function for this script.
 *
 * @returns {void}
 */
const main = async() => {

  logger.info('Obtaining rules...');

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
    logger.error(`Error reading rules files: ${lastError}`);
    process.exit(1);
  }

  /**
   * Filter .ne files and prepend full path.
   */
  files = files
    .filter(file => file.split('.').pop() === 'ne')
    .map(file => path.join(rulesFolder, file));

  logger.info('Obtaining lexer...');

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
    logger.error(`Error reading lexer file: ${lastError}`);
    process.exit(1);
  }

  logger.info('Appending lexer to grammar...');

  /**
   * Clear output file and start by writing lexer contents into it.
   */
  lastError = await new Promise(resolve => fs.writeFile(nearleyGrammar, lexer, resolve));

  if (lastError) {
    logger.error(`Error writing grammar file: ${lastError}`);
    process.exit(1);
  }

  /**
   * Append keywords to S_IDENTIFIER rule (see rule in lexer.ne).
   */
  logger.info('Appending keywords as identifier rule...');

  const ruleString = ' ' +
    Object.keys(keywords).reduceRight((concat, key) => {
      concat += ` | %${key} {% d => d[0].value %}`;
      return concat;
    }, '') +
    '\n\n';

  lastError = await new Promise(resolve => fs.appendFile(nearleyGrammar, ruleString, resolve));

  if (lastError) {
    logger.error(`Error appending identifier rule to file: ${lastError}`);
    process.exit(1);
  }

  /**
   * Append rules files to grammar file.
   */
  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    const filename = file.split(path.delimiter).pop();
    logger.info(`Obtaining contents of ${filename}...`);

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
      logger.error(`Error reading rules file (${file}): ${lastError}`);
      process.exit(1);
    }

    logger.info(`Writing contents to grammar...`);

    lastError = await new Promise(resolve => fs.appendFile(nearleyGrammar, contents, resolve));

    if (lastError) {
      logger.error(`Error appeding rules of file (${file}) to grammar: ${lastError}`);
      process.exit(1);
    }
  }

  /**
   * Copy dictionary folder.
   */
  logger.info('Copying dictionary folder...');

  await new Promise(resolve =>
    fs.copy(dictionaryFrom, dictionaryTo)
      .then(resolve)
      .catch(error => {
        lastError = error;
        resolve();
      })
  );

  if (lastError) {
    logger.error(`Error copying dictionary folder: ${lastError}`);
    process.exit(1);
  }

  /**
   * Copy shared folder.
   */
  logger.info('Copying shared folder...');

  await new Promise(resolve =>
    fs.copy(sharedFrom, sharedTo)
      .then(resolve)
      .catch(error => {
        lastError = error;
        resolve();
      })
  );

  if (lastError) {
    logger.error(`Error copying shared folder: ${lastError}`);
    process.exit(1);
  }
};

main().then(async() => {
  logger.info('Grammar assembled successfully!');
});

/**
 * This script gets contents of lexer.ne, and .ne files in parser / rules,
 * folder concatenating them all to lib/mysql/grammar.ne, so it can be
 * later compiled to grammar.js by nearleyc.
 *
 * It is also responsible for copying the dictionary and shared folder to
 * lib/mysql folder (so it can be read by the compiled grammar files).
 */

const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const babel = require('babel-core');

const utils = require('../../src/shared/utils');

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
  fs.mkdirpSync(compiledFolder);
}

/**
 * Other files and folder that are also copied.
 */
const dictionaryFrom = path.join(srcFolder, 'dictionary');
const dictionaryTo = path.join(compiledFolder, 'dictionary');
const sharedFrom = path.join(projectRoot, 'src', 'shared');
const sharedTo = path.join(projectRoot, 'lib', 'shared');

/**
 * Filter functions that gets only .js files.
 * @param {string} filepath Filepath.
 * @returns {boolean} Whether it is .js file.
 */
const filter = filepath => filepath.substr(-3) === '.js';

logger.info('Starting grammar assembly...');

/**
 * Main function for this script.
 *
 * @returns {Promise<void>} Main function promise.
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
   * Transpile dictionary folder.
   */
  logger.info('Transpiling dictionary folder...');

  /**
   * Get filelist from dictionary folder.
   * @type {string[]}
   */
  let filelist = await new Promise(resolve => {
    resolve(utils.getFilelist(sharedFrom, filter));
  });

  filelist.forEach(filepath => {
    const { code } = babel.transformFileSync(filepath);
    const filepathParts = filepath.split(path.sep);
    const destFile = filepathParts.pop();
    const destFolder = path.join(
      sharedTo,
      filepathParts.join(path.sep).substr(sharedFrom.length + 1)
    );

    logger.info(`Transpiling ${filepath}...`);

    fs.mkdirpSync(destFolder);
    fs.writeFileSync(path.join(destFolder, destFile), code);
  });

  /**
   * Transpile shared folder.
   */
  logger.info('Transpiling shared folder...');

  filelist = await new Promise(resolve => {
    resolve(utils.getFilelist(dictionaryFrom, filter));
  });

  filelist.forEach(filepath => {
    const { code } = babel.transformFileSync(filepath);
    const filepathParts = filepath.split(path.sep);
    const destFile = filepathParts.pop();
    const destFolder = path.join(
      dictionaryTo,
      filepathParts.join(path.sep).substr(dictionaryFrom.length + 1)
    );

    logger.info(`Transpiling ${filepath}...`);

    fs.mkdirpSync(destFolder);
    fs.writeFileSync(path.join(destFolder, destFile), code);
  });
};

main().then(async() => {
  logger.info('Grammar assembled successfully!');
});

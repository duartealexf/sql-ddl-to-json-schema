/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * This script gets contents of lexer.ne, and .ne files in parser / rules,
 * folder concatenating them all to lib/mysql/grammar.ne, so it can be
 * later compiled to grammar.js by nearleyc.
 *
 * It is also responsible for copying the dictionary and shared folder to
 * lib/mysql folder (so it can be read by the compiled grammar files).
 */

import { existsSync, mkdirpSync, readdir, readFile, writeFile, appendFile } from 'fs-extra';
import { join, delimiter } from 'path';
import { configure, format, add, transports } from 'winston';

/**
 * Get keywords to be matched as an identifier where
 * needed (see S_IDENTIFIER in lexer.ne file).
 */
import keywords from '../../src/mysql/language/dictionary/keywords';

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
 * Input.
 */
const langFolder = join(projectRoot, 'src', 'mysql', 'language');
const rulesFolder = join(langFolder, 'rules');
const lexerFile = join(langFolder, 'lexer.ne');

/**
 * Output.
 */
const compiledFolder = langFolder;
const compiledNearleyGrammar = join(compiledFolder, 'grammar.ne');

if (!existsSync(compiledFolder)) {
  mkdirpSync(compiledFolder);
}

logger.info('Starting grammar assembly...');

/**
 * Main function for this script.
 */
const main = async (): Promise<void> => {
  logger.info('Obtaining rules...');

  let lastError = null;

  /**
   * Rules filepaths.
   * @type {string[]}
   */
  let files: string[] = await new Promise((resolve) =>
    readdir(rulesFolder, (error, arr) => {
      lastError = error;
      resolve(arr);
    }),
  );

  if (lastError) {
    logger.error(`Error reading rules files: ${lastError}`);
    process.exit(1);
  }

  /**
   * Filter .ne files and prepend full path.
   */
  files = files
    .filter((file) => file.split('.').pop() === 'ne')
    .map((file) => join(rulesFolder, file));

  logger.info('Obtaining lexer...');

  /**
   * Lexer file contents.
   * @type {Buffer}
   */
  const lexer: Buffer = await new Promise((resolve) =>
    readFile(lexerFile, (error, buffer) => {
      lastError = error;
      resolve(buffer);
    }),
  );

  if (lastError) {
    logger.error(`Error reading lexer file: ${lastError}`);
    process.exit(1);
  }

  logger.info('Appending lexer to grammar...');

  /**
   * Clear output file and start by writing lexer contents into it.
   */
  lastError = await new Promise((resolve) => writeFile(compiledNearleyGrammar, lexer, resolve));

  if (lastError) {
    logger.error(`Error writing grammar file: ${lastError}`);
    process.exit(1);
  }

  /**
   * Append keywords to S_IDENTIFIER rule (see rule in lexer.ne).
   */
  logger.info('Appending keywords as identifier rule...');

  const ruleString = ` ${Object.keys(keywords).reduceRight((concat, key) => {
    concat += ` | %${key} {% d => d[0].value %}`;
    return concat;
  }, '')}\n\n`;

  lastError = await new Promise((resolve) =>
    appendFile(compiledNearleyGrammar, ruleString, resolve),
  );

  if (lastError) {
    logger.error(`Error appending identifier rule to file: ${lastError}`);
    process.exit(1);
  }

  /**
   * Append rules files to grammar file.
   */
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];

    const filename = file.split(delimiter).pop();
    logger.info(`Obtaining contents of ${filename}...`);

    /**
     * Get file contents.
     * @type {Buffer}
     */
    const contents: Buffer = await new Promise((resolve) =>
      readFile(file, (error, buffer) => {
        lastError = error;
        resolve(buffer);
      }),
    );

    if (lastError) {
      logger.error(`Error reading rules file (${file}): ${lastError}`);
      process.exit(1);
    }

    logger.info('Writing contents to grammar...');

    lastError = await new Promise((resolve) =>
      appendFile(compiledNearleyGrammar, contents, resolve),
    );

    if (lastError) {
      logger.error(`Error appeding rules of file (${file}) to grammar: ${lastError}`);
      process.exit(1);
    }
  }
};

main().then(async () => {
  logger.info('Grammar assembled successfully!');
});

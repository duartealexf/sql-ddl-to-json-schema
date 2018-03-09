const winston = require('winston');

winston.configure({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});
const logger = winston.add(new winston.transports.Console());

/**
 * Formatter for P_RENAME_TABLE rule's parsed JSON.
 * Alters one of given existingTables, renaming it.
 *
 * @param {any} def Rule's JSON definition.
 * @param {any[]} existingTables Already existing tables array.
 * @returns {void}
 */
const P_RENAME_TABLE = (def, existingTables) => {
  const tableName = def.table;
  const table = existingTables.find(t => t.name === tableName);

  if (!table) {
    logger.warn(`Found "RENAME TABLE" statement for an unexisting table ${tableName}`);
    return;
  }

  table.name = def.newName;
};

module.exports = {
  P_RENAME_TABLE
};

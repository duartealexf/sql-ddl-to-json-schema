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
 * Formatter for P_DROP_INDEX rule's parsed JSON.
 * Drops index in one of existingTables.
 *
 * @param {any} def Rule's JSON definition.
 * @param {any[]} existingTables Already existing tables array.
 * @returns {void}
 */
const P_DROP_INDEX = (def, existingTables) => {
  const tableName = def.table;
  const table = existingTables.find(t => t.name === tableName);

  if (!table) {
    logger.warn(`Found "DROP INDEX" statement for an unexisting table ${tableName}`);
    return;
  }

  const indexName = def.name;
  const index = table.indexes.find(i => i.name === indexName);

  if (!table) {
    logger.warn(`Found "DROP INDEX" statement for an unexisting index ${indexName} in table ${tableName}`);
    return;
  }

  const end = table.indexes.splice(table.indexes.indexOf(index));
  end.shift();
  table.indexes.concat(end);
};

module.exports = {
  P_DROP_INDEX
};

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
 * Formatter for P_DROP_TABLE rule's parsed JSON.
 * Drops one of given existingTables.
 *
 * @param {any} def Rule's JSON definition.
 * @param {any[]} existingTables Already existing tables array.
 * @returns {void}
 */
const P_DROP_TABLE = (def, existingTables) => {
  def.forEach(tableName => {
    const table = existingTables.find(t => t.name === tableName);

    if (!table) {
      logger.warn(`Found "DROP TABLE" statement for an unexisting table ${tableName}`);
      return;
    }

    const end = existingTables.splice(existingTables.indexOf(table));
    end.shift();
    existingTables.concat(end);
  });
};

module.exports = {
  P_DROP_TABLE
};

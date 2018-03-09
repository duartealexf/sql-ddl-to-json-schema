const utils = require('../../shared/utils.js');
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
 * Formatter for P_CREATE_INDEX rule's parsed JSON.
 * Alters one of given existingTables.
 *
 * @param {any} def Rule's JSON definition.
 * @param {any[]} existingTables Already existing tables array.
 * @returns {void}
 */
const P_CREATE_INDEX = (def, existingTables) => {
  const tableName = def.table;
  const table = existingTables.find(t => t.name === def.table);

  if (!table) {
    logger.warn(`Found "CREATE INDEX" statement for an unexisting table ${tableName}`);
    return;
  }

  const type = def.type.toLowerCase();

  if (type.includes('unique')) {
    table.uniqueKeys.push(
      {
        symbol: null,
        name: def.name,
        indexType: P_INDEX_TYPE(def.index),
        columns: P_INDEX_COLUMN(def.columns),
        options: O_INDEX_OPTION(def.options)
      }
    );
  }
  else if (type.includes('fulltext')) {
    table.fulltextIndexes.push(
      {
        name: def.name,
        columns: P_INDEX_COLUMN(def.columns),
        options: O_INDEX_OPTION(def.options)
      }
    );
  }
  else if (type.includes('spatial')) {
    table.spatialIndexes.push(
      {
        name: def.name,
        columns: P_INDEX_COLUMN(def.columns),
        options: O_INDEX_OPTION(def.options)
      }
    );
  }
  else {
    table.indexes.push(
      {
        name: def.name,
        indexType: P_INDEX_TYPE(def.index),
        columns: P_INDEX_COLUMN(def.columns),
        options: O_INDEX_OPTION(def.options)
      }
    );
  }
};

/**
 * Formatter for O_INDEX_OPTION rule's parsed JSON.
 * Merges index options into a single object.
 *
 * @param {any[]} options Index options.
 * @returns {any} Merged object.
 */
const O_INDEX_OPTION = options => {
  options = utils.mergeLatestToObject(
    options.map(opt => opt.def)
  );

  if (options.indexType) {
    options.indexType = P_INDEX_TYPE(options.indexType);
  }

  return options;
};

/**
 * Formatter for P_INDEX_COLUMN rule's parsed JSON.
 * Simplifies columns definitions.
 *
 * @param {any} cols Rule's JSON definition.
 * @returns {any} Datatype definition.
 */
const P_INDEX_COLUMN = cols => {
  return cols.map(opt => opt.def);
};

/**
 * Formatter for P_INDEX_TYPE rule's parsed JSON.
 * Returns index type in lower case.
 *
 * @param {any} index Rule's JSON definition.
 * @returns {string} Index type.
 */
const P_INDEX_TYPE = index => {
  return index ? index.def.toLowerCase() : null;
};

module.exports = {
  P_CREATE_INDEX,
  O_INDEX_OPTION,
  P_INDEX_COLUMN,
  P_INDEX_TYPE
};

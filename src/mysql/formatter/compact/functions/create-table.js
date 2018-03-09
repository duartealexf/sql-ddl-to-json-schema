const winston = require('winston');

const utils = require('../../../../shared/utils');
const P_INDEX_COLUMN = require('./create-index').P_INDEX_COLUMN;
const O_INDEX_OPTION = require('./create-index').O_INDEX_OPTION;
const P_INDEX_TYPE = require('./create-index').P_INDEX_TYPE;
const O_DATATYPE = require('./datatype').O_DATATYPE;

winston.configure({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});
const logger = winston.add(new winston.transports.Console());

/**
 * Formatter for P_CREATE_TABLE_COMMON rule's parsed JSON.
 *
 * @param {any} def Rule's JSON definition.
 * @returns {any} Created table definition.
 */
const P_CREATE_TABLE_COMMON = def => {
  const table = {
    columns: [],
    fulltextIndexes: [],
    spatialIndexes: [],
    foreignKeys: [],
    uniqueKeys: [],
    indexes: []
  };

  const columns         = def.columnsDef.def.filter(json => utils.isDefined(json.def.column));
  const fulltextIndexes = def.columnsDef.def.filter(json => utils.isDefined(json.def.fulltextIndex));
  const spatialIndexes  = def.columnsDef.def.filter(json => utils.isDefined(json.def.spatialIndex));
  const foreignKeys     = def.columnsDef.def.filter(json => utils.isDefined(json.def.foreignKey));
  const uniqueKeys      = def.columnsDef.def.filter(json => utils.isDefined(json.def.uniqueKey));
  const indexes         = def.columnsDef.def.filter(json => utils.isDefined(json.def.index));

  const primaryKey      = def.columnsDef.def.find(json   => utils.isDefined(json.def.primaryKey));

  table.columns = columns.map(json => {
    let column = json.def.column;
    column = {
      name: column.name,
      type: O_DATATYPE(column.def.datatype),
      options: O_COLUMN_DEFINITION(column.def.columnDefinition)
    };

    if (!utils.isDefined(column.options.nullable)) {
      column.options.default = null;
      column.options.nullable = true;
    }

    if (utils.isDefined(column.options.unique)) {
      table.uniqueKeys.push({
        symbol: null,
        name: null,
        indexType: null,
        columns: [{ column: column.name, length: null, sort: null }],
        options: null
      });

      delete column.options.unique;
    }

    if (utils.isDefined(column.options.primary)) {
      table.primaryKey = {
        symbol: null,
        indexType: null,
        columns: [{ column: column.name, length: null, sort: null }],
        options: null
      };

      delete column.options.primary;
    }

    if (utils.isDefined(column.options.reference)) {
      table.foreignKeys.push({
        symbol: null,
        name: null,
        columns: [{ column: column.name, length: null, sort: null }],
        reference: P_COLUMN_REFERENCE(column.options.reference.def)
      });

      delete column.options.reference;
    }

    return column;
  });

  table.fulltextIndexes = fulltextIndexes.map(json => {
    const fulltextIndex = json.def.fulltextIndex;
    return {
      name: fulltextIndex.name,
      columns: P_INDEX_COLUMN(fulltextIndex.columns),
      options: O_INDEX_OPTION(fulltextIndex.options)
    };
  });

  table.spatialIndexes = spatialIndexes.map(json => {
    const spatialIndex = json.def.spatialIndex;
    return {
      name: spatialIndex.name,
      columns: P_INDEX_COLUMN(spatialIndex.columns),
      options: O_INDEX_OPTION(spatialIndex.options)
    };
  });

  table.foreignKeys = foreignKeys.map(json => {
    const foreignKey = json.def.foreignKey;
    return {
      symbol: foreignKey.symbol,
      name: foreignKey.name,
      columns: P_INDEX_COLUMN(foreignKey.columns),
      reference: P_COLUMN_REFERENCE(foreignKey.reference.def)
    };
  });

  if (primaryKey) {
    if (table.primaryKey) {
      logger.warn(`Found "CREATE TABLE" adding a primary key, when another primary key already existed.`);
    }
    else {
      table.primaryKey = {
        symbol: primaryKey.def.primaryKey.symbol,
        indexType: P_INDEX_TYPE(primaryKey.def.primaryKey.index),
        columns: P_INDEX_COLUMN(primaryKey.def.primaryKey.columns),
        options: O_INDEX_OPTION(primaryKey.def.primaryKey.options)
      };
    }
  }

  table.uniqueKeys = uniqueKeys.map(json => {
    const uniqueKey = json.def.uniqueKey;
    return {
      symbol: uniqueKey.symbol,
      name: uniqueKey.name,
      indexType: P_INDEX_TYPE(uniqueKey.index),
      columns: P_INDEX_COLUMN(uniqueKey.columns),
      options: O_INDEX_OPTION(uniqueKey.options)
    };
  });

  table.indexes = indexes.map(json => {
    const index = json.def.index;
    return {
      name: index.name,
      indexType: P_INDEX_TYPE(index.index),
      columns: P_INDEX_COLUMN(index.columns),
      options: O_INDEX_OPTION(index.options)
    };
  });

  table.options = P_CREATE_TABLE_OPTIONS(def.tableOptions);

  table.name = def.table;

  return table;
};

/**
 * Formatter for P_CREATE_TABLE_LIKE rule's parsed JSON.
 * Replicates another table according to an existing one.
 *
 * @param {any} def Rule's JSON definition.
 * @param {any[]} existingTables Already existing tables array.
 * @returns {any} Replicated table.
 */
const P_CREATE_TABLE_LIKE = (def, existingTables) => {

  const alikeTable = existingTables.find(table => table.name === def.like);

  if (!alikeTable) {
    logger.warn(`Found "CREATE TABLE LIKE" statement referencing unexisting table ${def.like}.`);
    return;
  }

  const table = utils.mergeDeep({}, alikeTable);
  table.name = def.table;

  return table;
};

/**
 * Formatter for P_CREATE_TABLE_OPTIONS rule's parsed JSON.
 * Joins several CREATE TABLE options into one object.
 *
 * @param {any} def Rule's JSON definition.
 * @returns {any} Single object with all options.
 */
const P_CREATE_TABLE_OPTIONS = def => {
  if (!def) {
    return {};
  }

  return utils.mergeLatestToObject(
    def.def.map(json => json.def)
  );
};

/**
 * Formatter for O_COLUMN_DEFINITION rule's parsed JSON.
 * Merges column definitions into a single object.
 *
 * @param {any[]} columnDefinitions Column definitions.
 * @returns {any} Merged object.
 */
const O_COLUMN_DEFINITION = columnDefinitions => {
  return utils.mergeLatestToObject(
    columnDefinitions.map(json => json.def)
  );
};

/**
 * Formatter for P_COLUMN_REFERENCE rule's parsed JSON.
 *
 * @param {any} reference Rule's JSON definition.
 * @returns {any} Reference object.
 */
const P_COLUMN_REFERENCE = reference => {
  return {
    table: reference.table,
    columns: P_INDEX_COLUMN(reference.columns),
    match: reference.match,
    on: reference.on.map(json => {
      return {
        trigger: json.trigger.toLowerCase(),
        action: json.action.toLowerCase()
      };
    })
  };
};

module.exports = {
  P_CREATE_TABLE_COMMON,
  P_CREATE_TABLE_LIKE,
  P_CREATE_TABLE_OPTIONS,
  O_COLUMN_DEFINITION,
  P_COLUMN_REFERENCE
};

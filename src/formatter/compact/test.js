// const Parser = require('../../../lib');
const utils = require('../../shared/utils.js');
const mysqlJson = require('./mysql.json');
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
 * Formatter for main rule's parsed JSON.
 *
 * @param {any[]} def Rule's JSON definition.
 * @returns {any[]} Array of table definitions.
 */
const MAIN = def => {

  let tables = [];

  def.forEach(json => {

    if (json.def.id === 'P_CREATE_TABLE') {

      if (json.def.def.id === 'P_CREATE_TABLE_COMMON') {
        tables = tables.concat(P_CREATE_TABLE_COMMON(json.def.def.def));
      }
      else {
        tables = tables.concat(P_CREATE_TABLE_LIKE(json.def.def.def, tables));
      }
    }

    else if (json.def.id === 'P_CREATE_INDEX') {
      P_CREATE_INDEX(json.def.def, tables);
    }

    else if (json.def.id === 'P_ALTER_TABLE') {
      // P_ALTER_TABLE(json.def.def, tables);
    }

    // else if (json.def.id === 'P_RENAME_TABLE') {
    // }

    // else if (json.def.id === 'P_DROP_TABLE') {
    // }

    // else if (json.def.id === 'P_DROP_INDEX') {
    // }
  });

  return tables;
};

/**
 * Formatter for P_ALTER_TABLE rule's parsed JSON.
 *
 */
// const P_ALTER_TABLE = (def, existingTables) => {
//   const tableName = def.table;


// };

/**
 * Formatter for P_CREATE_INDEX rule's parsed JSON.
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
 * Formatter for P_CREATE_TABLE_COMMON rule's parsed JSON.
 *
 * @param {any} def Rule's JSON definition.
 * @returns {any} Table definition.
 */
const P_CREATE_TABLE_COMMON = def => {
  const table = {};

  const columns         = def.columnsDef.def.filter(json => utils.isDefined(json.def.column));
  const fulltextIndexes = def.columnsDef.def.filter(json => utils.isDefined(json.def.fulltextIndex));
  const spatialIndexes  = def.columnsDef.def.filter(json => utils.isDefined(json.def.spatialIndex));
  const foreignKeys     = def.columnsDef.def.filter(json => utils.isDefined(json.def.foreignKey));
  const primaryKeys     = def.columnsDef.def.filter(json => utils.isDefined(json.def.primaryKey));
  const uniqueKeys      = def.columnsDef.def.filter(json => utils.isDefined(json.def.uniqueKey));
  const indexes         = def.columnsDef.def.filter(json => utils.isDefined(json.def.index));

  table.columns = columns.map(json => {
    const column = json.def.column;
    return {
      name: column.name,
      type: O_DATATYPE(column.def.datatype),
      options: O_COLUMN_DEFINITION(column.def.columnDefinition)
    };
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

  table.primaryKeys = primaryKeys.map(json => {
    const primaryKey = json.def.primaryKey;
    return {
      symbol: primaryKey.symbol,
      indexType: P_INDEX_TYPE(primaryKey.index),
      columns: P_INDEX_COLUMN(primaryKey.columns),
      options: O_INDEX_OPTION(primaryKey.options)
    };
  });

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
 * Formatter for P_CREATE_TABLE_OPTIONS rule's parsed JSON.
 * Joins several CREATE TABLE options into one object.
 *
 * @param {any} def Rule's JSON definition.
 * @returns {any} Single object with all options.
 */
const P_CREATE_TABLE_OPTIONS = def => {
  return utils.mergeLatestToObject(
    def.map(json => json.def)
  );
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
 * Formatter for O_DATATYPE rule's parsed JSON.
 * Simplifies datatype rule definitions.
 *
 * @param {any} datatype Rule's JSON definition.
 * @returns {any} Datatype definition.
 */
const O_DATATYPE = datatype => {
  const typeinfo = datatype.def.def;
  typeinfo.datatype = typeinfo.datatype.toLowerCase();

  return typeinfo;
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

const result = MAIN(mysqlJson.def);

console.log(JSON.stringify(result, null, 2));

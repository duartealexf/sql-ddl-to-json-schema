const P_CREATE_TABLE_COMMON = require('./create-table').P_CREATE_TABLE_COMMON;
const P_CREATE_TABLE_LIKE = require('./create-table').P_CREATE_TABLE_LIKE;
const P_RENAME_TABLE = require('./rename-table').P_RENAME_TABLE;
const P_ALTER_TABLE = require('./alter-table').P_ALTER_TABLE;
const P_DROP_TABLE = require('./drop-table').P_DROP_TABLE;

const P_CREATE_INDEX = require('./create-index').P_CREATE_INDEX;
const P_DROP_INDEX = require('./drop-index').P_DROP_INDEX;

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
      P_ALTER_TABLE(json.def.def, tables);
    }

    else if (json.def.id === 'P_RENAME_TABLE') {
      P_RENAME_TABLE(json.def.def, tables);
    }

    else if (json.def.id === 'P_DROP_TABLE') {
      P_DROP_TABLE(json.def.def, tables);
    }

    else if (json.def.id === 'P_DROP_INDEX') {
      P_DROP_INDEX(json.def.def, tables);
    }
  });

  return tables;
};

module.exports = {
  MAIN
};

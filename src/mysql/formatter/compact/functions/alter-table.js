const winston = require('winston');

const utils = require('../../shared/utils');
const P_CREATE_TABLE_OPTIONS = require('./create-table').P_CREATE_TABLE_OPTIONS;
const O_COLUMN_DEFINITION = require('./create-table').O_COLUMN_DEFINITION;
const P_COLUMN_REFERENCE = require('./create-table').P_COLUMN_REFERENCE;
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
 * Formatter for P_ALTER_TABLE rule's parsed JSON.
 * Alters one of given existingTables.
 *
 * @param {any} def Rule's JSON definition.
 * @param {any[]} existingTables Already existing tables array.
 * @returns {void}
 */
const P_ALTER_TABLE = (def, existingTables) => {
  const tableName = def.table;
  const table = existingTables.find(t => t.name === def.table);

  if (!table) {
    logger.warn(`Found "ALTER TABLE" statement for an unexisting table ${tableName}`);
    return;
  }

  table.options = utils.mergeDeep({},
    table.options,
    P_CREATE_TABLE_OPTIONS(def.tableOptions)
  );

  const actionHandlers = {
    addColumn: json => {
      const column = {
        name: json.name,
        type: O_DATATYPE(json.datatype),
        options: O_COLUMN_DEFINITION(json.columnDefinition)
      };
      if (json.position === null) {
        table.columns.push(column);
      }
      else if (json.position.after === null) {
        table.columns.unshift(column);
      }
      else {
        const refColumn = table.columns.find(c => c.name === json.position.after);

        if (!refColumn) {
          logger.warn(`Found "ALTER TABLE [ADD AFTER COLUMN]" statement for an unexisting table column ${json.columns}`);
          return;
        }

        const position = table.columns.indexOf(refColumn);
        const end = table.columns.splice(position + 1);
        table.columns.push(refColumn);
        table.columns.concat(end);
      }
    },
    addColumns: json => {
      table.columns.concat(
        json.columns.map(column => {
          return {
            name: column.name,
            type: O_DATATYPE(column.def.datatype),
            options: O_COLUMN_DEFINITION(column.def.columnDefinition)
          };
        })
      );
    },
    addIndex: json => {
      table.indexes.push(
        {
          name: json.name,
          indexType: P_INDEX_TYPE(json.index),
          columns: P_INDEX_COLUMN(json.columns),
          options: O_INDEX_OPTION(json.options)
        }
      );
    },
    addPrimaryKey: json => {
      if (table.primaryKey) {
        logger.warn(`Found "ALTER TABLE [ADD PRIMARY KEY]" statement when another primary key already existed.`);
        return;
      }

      table.primaryKey = {
        symbol: json.symbol,
        indexType: P_INDEX_TYPE(json.index),
        columns: P_INDEX_COLUMN(json.columns),
        options: O_INDEX_OPTION(json.options)
      };
    },
    addUniqueKey: json => {
      table.uniqueKeys.push(
        {
          symbol: json.symbol,
          name: json.name,
          indexType: P_INDEX_TYPE(json.index),
          columns: P_INDEX_COLUMN(json.columns),
          options: O_INDEX_OPTION(json.options)
        }
      );
    },
    addFulltextIndex: json => {
      table.fulltextIndexes.push(
        {
          name: json.name,
          columns: P_INDEX_COLUMN(json.columns),
          options: O_INDEX_OPTION(json.options)
        }
      );
    },
    addSpatialIndex: json => {
      table.spatialIndexes.push(
        {
          name: json.name,
          columns: P_INDEX_COLUMN(json.columns),
          options: O_INDEX_OPTION(json.options)
        }
      );
    },
    addForeignKey: json => {
      table.foreignKeys.push(
        {
          symbol: json.symbol,
          name: json.name,
          columns: P_INDEX_COLUMN(json.columns),
          reference: P_COLUMN_REFERENCE(json.reference.def)
        }
      );
    },
    // changeAlgorithm: json => {
    // },
    setDefaultColumnValue: json => {
      const column = table.find(c => c.name === json.column);

      if (!column) {
        logger.warn(`Found "ALTER TABLE [SET DEFAULT COLUMN VALUE]" statement for an unexisting table column ${json.column}`);
        return;
      }

      column.options.default = json.value;
    },
    dropDefaultColumnValue: json => {
      const column = table.find(c => c.name === json.column);

      if (!column) {
        logger.warn(`Found "ALTER TABLE [DROP DEFAULT COLUMN VALUE]" statement for an unexisting table column ${json.column}`);
        return;
      }

      delete column.options.default;
    },
    changeColumn: json => {
      const column = table.find(c => c.name === json.column);

      if (!column) {
        logger.warn(`Found "ALTER TABLE [CHANGE/MODIFY COLUMN]" statement for an unexisting table column ${json.column}`);
        return;
      }

      if (json.newName) {
        column.name = json.newName;
      }

      column.type = O_DATATYPE(json.datatype);

      if (json.columnDefinition.length) {
        column.options = utils.mergeDeep({},
          column.options,
          O_COLUMN_DEFINITION(json.columnDefinition)
        );
      }

      if (json.position) {
        if (json.position.after === null) {
          table.columns.unshift(column);
        }
        else {
          const refColumn = table.columns.find(c => c.name === json.position.after);

          if (!refColumn) {
            logger.warn(`Found "ALTER TABLE [CHANGE/MODIFY COLUMN POSITION]" statement for an unexisting table column ${json.column}`);
            return;
          }

          const position = table.columns.indexOf(refColumn);
          const end = table.columns.splice(position + 1);
          table.columns.push(refColumn);
          table.columns.concat(end);
        }
      }
    },
    changeCharacterSet: json => {
      table.options.charset = json.charset;

      if (json.collate) {
        table.options.collate = json.collate;
      }
    },
    // convertToCharacterSet: json => {
    // },
    // enableKeys: json => {
    // },
    // disableKeys: json => {
    // },
    // discardTablespace: json => {
    // },
    // importTablespace: json => {
    // },
    dropColumn: json => {
      const column = table.columns.find(c => c.name === json.column);

      if (!column) {
        logger.warn(`Found "ALTER TABLE [DROP COLUMN]" statement for an unexisting table column ${json.column}`);
        return;
      }

      const end = table.columns.splice(
        table.columns.indexOf(column)
      );
      end.shift();
      table.columns.concat(end);
    },
    dropIndex: json => {
      const index = table.indexes.find(i => i.name === json.index);

      if (!index) {
        logger.warn(`Found "ALTER TABLE [DROP INDEX]" statement for an unexisting table index ${json.index}`);
        return;
      }

      const end = table.indexes.splice(
        table.indexes.indexOf(index)
      );
      end.shift();
      table.indexes.concat(end);
    },
    dropPrimaryKey: () => {
      delete table.primaryKey;
    },
    dropForeignKey: json => {
      const key = table.foreignKeys.find(k => k.symbol === json.key);

      if (!key) {
        logger.warn(`Found "ALTER TABLE [DROP FOREIGN KEY]" statement referencing unexisting key ${json.key}`);
        return;
      }

      const end = table.foreignKeys.splice(
        table.foreignKeys.indexOf(key)
      );
      end.shift();
      table.foreignKeys.concat(end);
    },
    // force: json => {
    // },
    // changeLock: json => {
    // },
    // orderBy: json => {
    // },
    renameIndex: json => {
      const index = table.indexes.find(i => i.name === json.index);

      if (!index) {
        logger.warn(`Found "ALTER TABLE [RENAME INDEX]" statement for an unexisting table index ${json.index}`);
        return;
      }

      index.name = json.newName;
    },
    rename: json => {
      table.name = json.newName;
    },
    // withValidation: json => {
    // },
    // withoutValidation: json => {
    // },
    // addPeriodForSystemTime: json => {
    // }
  };

  def.specs.forEach(spec => {
    actionHandlers[spec.def.spec.def.action](spec.def.spec.def);
    table.options = utils.mergeDeep({},
      table.options,
      P_CREATE_TABLE_OPTIONS(spec.def.tableOptions)
    );
  });
};

module.exports = {
  P_ALTER_TABLE
};

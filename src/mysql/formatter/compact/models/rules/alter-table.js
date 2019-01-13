/* eslint no-unused-vars: 0 */
const Table = require('../table');
const Database = require('../database');
const TableOptions = require('../table-options');
const Column = require('../column');
const Datatype = require('../datatype');
const ColumnOptions = require('../column-options');
const PrimaryKey = require('../primary-key');
const ForeignKey = require('../foreign-key');
const UniqueKey = require('../unique-key');
const FulltextIndex = require('../fulltext-index');
const SpatialIndex = require('../spatial-index');
const Index = require('../index');

/**
 * Formatter for P_ALTER_TABLE rule's parsed JSON.
 */
class AlterTable {

  /**
   * AlterTable constructor.
   */
  constructor() {

    /**
     * @type {Database}
     */
    this.database = undefined;
  }

  /**
   * Get table with given name.
   *
   * @param {string} name Table name.
   * @returns {Table} Table result.
   */
  getTable(name) {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param {Database} database Database instance.
   * @returns {void}
   */
  setDatabase(database) {
    this.database = database;
  }

  /**
   * Alters one of the tables.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_ALTER_TABLE') {
      throw new TypeError(`Expected P_ALTER_TABLE rule to be handled but received ${json.id}`);
    }

    const table = this.getTable(json.def.table);

    if (!table) {
      return;
    }

    /**
     * Runs methods in this class according to the
     * 'action' property of the ALTER TABLE spec.
     */
    json.def.specs.forEach(spec => {
      const changeSpec = spec.def.spec;
      const tableOptions = spec.def.tableOptions;
      if (changeSpec) {
        const def = changeSpec.def;
        const action = def.action;

        if (typeof this[action] === 'function') {
          this[action](def, table);
        }
      }
      else if (tableOptions) {

        if (!table.options) {
          table.options = new TableOptions();
        }

        table.options.mergeWith(
          TableOptions.fromDef(tableOptions)
        );
      }
    });
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addColumn(json, table) {
    const column = Column.fromObject(json);

    /**
     * Adding columns with REFERENCES should not create FK constraint.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/16
     */
    if (column.reference) {
      delete column.reference;
    }

    table.addColumn(column, json.position);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addColumns(json, table) {
    json.columns.forEach(column => {
      column = Column.fromObject(column);

      /**
       * Adding columns with REFERENCES should not create FK constraint.
       * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/16
       */
      if (column.reference) {
        delete column.reference;
      }

      table.addColumn(column);
    });
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addIndex(json, table) {
    const index = Index.fromObject(json);
    table.pushIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addPrimaryKey(json, table) {
    const key = PrimaryKey.fromObject(json);
    table.setPrimaryKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addUniqueKey(json, table) {
    const key = UniqueKey.fromObject(json);
    table.pushUniqueKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addFulltextIndex(json, table) {
    const index = FulltextIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addSpatialIndex(json, table) {
    const index = SpatialIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addForeignKey(json, table) {
    const key = ForeignKey.fromObject(json);
    table.pushForeignKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  setDefaultColumnValue(json, table) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    column.options.default = json.value;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  dropDefaultColumnValue(json, table) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    delete column.options.default;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  changeColumn(json, table) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    /** @type {{after: string}} */
    let position;

    if (json.position) {
      if (json.position.after) {
        if (!table.getColumn(json.position.after)) {
          /**
           * Referential 'after' column does not exist.
           */
          return;
        }
      }
      position = json.position;
    }
    else {
      position = table.getColumnPosition(column);
    }

    const type = Datatype.fromDef(json.datatype);
    let options;

    /**
     * Alter table change column should not bring old
     * column options, so we completely overwrite it.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/10
     */
    if (json.columnDefinition) {
      options = ColumnOptions.fromArray(json.columnDefinition);
    }

    /**
     * Alter table does not overwrite primary key.
     * Statements like these in the DBMS are canceled.
     */
    if (options.primary && table.primaryKey) {
      return;
    }

    /**
     * Table should have only one column with autoincrement,
     * except when column being modified is already autoincrement.
     * Statements like these in the DBMS are canceled.
     */
    if (
      options.autoincrement
      && table.columns.some(c => {
        return c !== column && c.options.autoincrement;
      })
    ) {
      return;
    }

    /**
     * If there is an unique option that would
     * create duplicate unique key, remove it.
     */
    if (options.unique
      && table.uniqueKeys.some(u => {
        return u.columns.length === 1 && u.columns[0].column === column.name;
      })) {
      delete options.unique;
    }

    /**
     * Finally change the column.
     */
    if (table.moveColumn(column, position)) {

      /**
       * If there is a new column name in statement, that is different
       * from current name, rename column and references to it.
       */
      if (json.newName && json.newName !== column.name) {
        table.renameColumn(column, json.newName);
      }

      column.type = type;
      column.options = options;
      table.extractColumnKeys(column);
    }
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  dropColumn(json, table) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    table.dropColumn(column);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  dropIndex(json, table) {
    if (json.index.toLowerCase() === 'primary') {
      this.dropPrimaryKey(json, table);
      return;
    }

    const index = table.getIndex(json.index);

    if (!index) {
      return;
    }

    table.dropIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  dropPrimaryKey(json, table) {
    table.dropPrimaryKey();
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  dropForeignKey(json, table) {
    const foreignKey = table.getForeignKey(json.key);

    if (!foreignKey) {
      return;
    }

    table.dropForeignKey(foreignKey);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  renameIndex(json, table) {
    const index = table.getIndex(json.index);

    if (!index) {
      return;
    }

    index.name = json.newName;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  rename(json, table) {
    table.renameTo(json.newName);
  }

}

module.exports = AlterTable;

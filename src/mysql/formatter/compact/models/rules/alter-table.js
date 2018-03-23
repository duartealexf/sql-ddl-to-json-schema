/* eslint no-unused-vars: 0 */
const Table = require('../table');
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
     * @type {Table[]}
     */
    this.tables = [];
  }

  /**
   * Get table with given name.
   *
   * @param {string} name Table name.
   * @returns {Table} Table result.
   */
  getTable(name) {
    return this.tables.find(t => t.name === name);
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
      throw new TypeError(`Found "ALTER TABLE" statement for an unexisting table ${json.def.table}`);
    }

    /**
     * Runs methods in this class according to the 'action' property of the ALTER TABLE spec.
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
    table.pushIndex(
      Index.fromObject(json)
    );
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addPrimaryKey(json, table) {
    table.primaryKey = PrimaryKey.fromObject(json);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addUniqueKey(json, table) {
    table.pushUniqueKey(
      UniqueKey.fromObject(json)
    );
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addFulltextIndex(json, table) {
    table.pushFulltextIndex(
      FulltextIndex.fromObject(json)
    );
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addSpatialIndex(json, table) {
    table.pushFulltextIndex(
      SpatialIndex.fromObject(json)
    );
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param {any} json O_ALTER_TABLE_SPEC def object in JSON.
   * @param {Table} table Table to be altered.
   * @returns {void}
   */
  addForeignKey(json, table) {
    table.pushForeignKey(
      ForeignKey.fromObject(json)
    );
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
      // throw new Error(`Found "ALTER TABLE [SET DEFAULT COLUMN VALUE]" statement for an unexisting table column ${json.column}`);
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
      // throw new Error(`Found "ALTER TABLE [DROP DEFAULT COLUMN VALUE]" statement for an unexisting table column ${json.column}`);
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
      // throw new Error(`Found "ALTER TABLE [CHANGE/MODIFY COLUMN]" statement for an unexisting table column ${json.column}`);
      return;
    }

    if (json.newName) {
      column.name = json.newName;
    }

    column.type = Datatype.fromDef(json.datatype);

    /**
     * Alter table change column should not bring old column options.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/10
     */
    if (json.columnDefinition) {
      column.options = ColumnOptions.fromArray(json.columnDefinition);
    }

    /**
     * Alter table change column with reference does not add foreign key constraint.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/11
     */
    if (column.options.reference) {
      delete column.options.reference;
    }

    if (!json.position) {
      json.position = table.getColumnPosition(column);
    }

    table.moveColumn(column, json.position);
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
      // throw new Error(`Found "ALTER TABLE [DROP COLUMN]" statement referencing unexisting column ${json.column}`);
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
      // throw new Error(`Found "ALTER TABLE [DROP INDEX]" statement referencing unexisting index ${json.index}`);
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
    delete table.primaryKey;
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
      // throw new Error(`Found "ALTER TABLE [DROP FOREIGN KEY]" statement referencing unexisting key ${json.key}`);
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
      // throw new Error(`Found "ALTER TABLE [RENAME INDEX]" statement for an unexisting table index ${json.index}`);
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
    table.name = json.newName;
  }

}

module.exports = AlterTable;

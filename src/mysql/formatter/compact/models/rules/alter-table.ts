import TableOptions from '../table-options';
import Column from '../column';
import Datatype from '../datatype';
import ColumnOptions from '../column-options';
import PrimaryKey from '../primary-key';
import ForeignKey from '../foreign-key';
import UniqueKey from '../unique-key';
import FulltextIndex from '../fulltext-index';
import SpatialIndex from '../spatial-index';
import Index from '../index';

/**
 * Formatter for P_ALTER_TABLE rule's parsed JSON.
 */
class AlterTable {
  database: Database;

  /**
   * Get table with given name.
   *
   * @param name Table name.
   * @returns {Table} Table result.
   */
  getTable(name: Table) {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   * @returns {void}
   */
  setDatabase(database: Database) {
    this.database = database;
  }

  /**
   * Alters one of the tables.
   *
   * @param json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json: { id: string; def: { table: any; specs: any[]; }; }) {
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
    json.def.specs.forEach((spec: { def: { spec: any; tableOptions: any; }; }) => {
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
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addColumn(json: { position: any; }, table: { addColumn: (arg0: any, arg1: any) => void; }) {
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
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addColumns(json: { columns: any[]; }, table: { addColumn: (arg0: any) => void; }) {
    json.columns.forEach((column: { reference: any; }) => {
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
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addIndex(json: any, table: { pushIndex: (arg0: any) => void; }) {
    const index = Index.fromObject(json);
    table.pushIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addPrimaryKey(json: any, table: { setPrimaryKey: (arg0: any) => void; }) {
    const key = PrimaryKey.fromObject(json);
    table.setPrimaryKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addUniqueKey(json: any, table: { pushUniqueKey: (arg0: any) => void; }) {
    const key = UniqueKey.fromObject(json);
    table.pushUniqueKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addFulltextIndex(json: any, table: { pushFulltextIndex: (arg0: any) => void; }) {
    const index = FulltextIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addSpatialIndex(json: any, table: { pushFulltextIndex: (arg0: any) => void; }) {
    const index = SpatialIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  addForeignKey(json: any, table: { pushForeignKey: (arg0: any) => void; }) {
    const key = ForeignKey.fromObject(json);
    table.pushForeignKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  setDefaultColumnValue(json: { column: any; value: any; }, table: { getColumn: (arg0: any) => any; }) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    column.options.default = json.value;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  dropDefaultColumnValue(json: { column: any; }, table: { getColumn: (arg0: any) => any; }) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    delete column.options.default;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  changeColumn(json: { column: any; position: { after: any; }; datatype: any; columnDefinition: any; newName: any; }, table: { getColumn: (arg0: any) => any; getColumnPosition: (arg0: any) => any; primaryKey: any; columns: any[]; uniqueKeys: any[]; moveColumn: (arg0: any, arg1: any) => any; renameColumn: (arg0: any, arg1: any) => void; extractColumnKeys: (arg0: any) => void; }) {
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
      && table.columns.some((c: { options: { autoincrement: any; }; }) => {
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
      && table.uniqueKeys.some((u: { columns: string | any[]; }) => {
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
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  dropColumn(json: { column: any; }, table: { getColumn: (arg0: any) => any; dropColumn: (arg0: any) => void; }) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    table.dropColumn(column);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  dropIndex(json: { index: string; }, table: { getIndex: (arg0: any) => any; dropIndex: (arg0: any) => void; }) {
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
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  dropPrimaryKey(json: any, table: { dropPrimaryKey: () => void; }) {
    table.dropPrimaryKey();
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  dropForeignKey(json: { key: any; }, table: { getForeignKey: (arg0: any) => any; dropForeignKey: (arg0: any) => void; }) {
    const foreignKey = table.getForeignKey(json.key);

    if (!foreignKey) {
      return;
    }

    table.dropForeignKey(foreignKey);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  renameIndex(json: { index: any; newName: any; }, table: { getIndex: (arg0: any) => any; }) {
    const index = table.getIndex(json.index);

    if (!index) {
      return;
    }

    index.name = json.newName;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   * @returns {void}
   */
  rename(json: { newName: any; }, table: { renameTo: (arg0: any) => void; }) {
    table.renameTo(json.newName);
  }

}

module.exports = AlterTable;

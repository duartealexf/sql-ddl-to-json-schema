import { isFunction, isDefined } from '../../../../../shared/utils';
import {
  O_ALTER_TABLE_SPEC_ADD_COLUMN,
  O_ALTER_TABLE_SPEC_ADD_COLUMNS,
  O_ALTER_TABLE_SPEC_ADD_INDEX,
  O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY,
  O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY,
  O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX,
  O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX,
  O_ALTER_TABLE_SPEC_ADD_FOREIGN_KEY,
  O_ALTER_TABLE_SPEC_DROP_PRIMARY_KEY,
  O_ALTER_TABLE_SPEC_SET_DEFAULT_COLUMN_VALUE,
  O_ALTER_TABLE_SPEC_DROP_DEFAULT_COLUMN_VALUE,
  O_ALTER_TABLE_SPEC_CHANGE_COLUMN,
  O_ALTER_TABLE_SPEC_DROP_COLUMN,
  O_ALTER_TABLE_SPEC_DROP_INDEX,
  O_ALTER_TABLE_SPEC_DROP_FOREIGN_KEY,
  O_ALTER_TABLE_SPEC_RENAME_INDEX,
  O_ALTER_TABLE_SPEC_RENAME,
  P_ALTER_TABLE,
  P_ALTER_TABLE_ACTION,
  O_POSITION,
} from '../../../../../typings';

import { TableOptions } from '../table-options';
import { Column } from '../column';
import { Index } from '../index';
import { PrimaryKey } from '../primary-key';
import { UniqueKey } from '../unique-key';
import { FulltextIndex } from '../fulltext-index';
import { SpatialIndex } from '../spatial-index';
import { ForeignKey } from '../foreign-key';
import { ColumnOptions } from '../column-options';
import { Datatype } from '../datatype';
import { TableModelInterface, DatabaseModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_ALTER_TABLE rule's parsed JSON.
 */
export class AlterTable implements RuleHandler {
  database!: DatabaseModelInterface;

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): TableModelInterface | null {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: DatabaseModelInterface): void {
    this.database = database;
  }

  /**
   * Alters one of the tables.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: P_ALTER_TABLE): void {
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
    json.def.specs.forEach((spec) => {
      const changeSpec = spec.def.spec;
      const tableOptions = spec.def.tableOptions;
      if (changeSpec) {
        const def = changeSpec.def;
        const action = def.action;

        const fn = AlterTable[action as P_ALTER_TABLE_ACTION];

        if (isFunction(fn)) {
          fn(def as never, table);
        }
      } else if (tableOptions) {
        if (!table.options) {
          table.options = new TableOptions();
        }

        table.options.mergeWith(TableOptions.fromDef(tableOptions));
      }
    });
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static addColumn(json: O_ALTER_TABLE_SPEC_ADD_COLUMN, table: TableModelInterface): void {
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
   */
  private static addColumns(
    json: O_ALTER_TABLE_SPEC_ADD_COLUMNS,
    table: TableModelInterface,
  ): void {
    json.columns.forEach((c) => {
      const column = Column.fromObject(c);

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
   */
  private static addIndex(json: O_ALTER_TABLE_SPEC_ADD_INDEX, table: TableModelInterface): void {
    const index = Index.fromObject(json);
    table.pushIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static addPrimaryKey(
    json: O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY,
    table: TableModelInterface,
  ): void {
    const key = PrimaryKey.fromObject(json);
    table.setPrimaryKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static addUniqueKey(
    json: O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY,
    table: TableModelInterface,
  ): void {
    const key = UniqueKey.fromObject(json);
    table.pushUniqueKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static addFulltextIndex(
    json: O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX,
    table: TableModelInterface,
  ): void {
    const index = FulltextIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static addSpatialIndex(
    json: O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX,
    table: TableModelInterface,
  ): void {
    const index = SpatialIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static addForeignKey(
    json: O_ALTER_TABLE_SPEC_ADD_FOREIGN_KEY,
    table: TableModelInterface,
  ): void {
    const key = ForeignKey.fromObject(json);
    table.pushForeignKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static setDefaultColumnValue(
    json: O_ALTER_TABLE_SPEC_SET_DEFAULT_COLUMN_VALUE,
    table: TableModelInterface,
  ): void {
    const column = table.getColumn(json.column);

    if (!isDefined(column) || !isDefined(column.options)) {
      return;
    }

    column.options.default = json.value;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static dropDefaultColumnValue(
    json: O_ALTER_TABLE_SPEC_DROP_DEFAULT_COLUMN_VALUE,
    table: TableModelInterface,
  ): void {
    const column = table.getColumn(json.column);

    if (!isDefined(column) || !isDefined(column.options)) {
      return;
    }

    delete column.options.default;
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static changeColumn(
    json: O_ALTER_TABLE_SPEC_CHANGE_COLUMN,
    table: TableModelInterface,
  ): void {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    let position: O_POSITION | null;

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
    } else {
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

    if (!isDefined(options)) {
      return;
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
      options.autoincrement &&
      (table.columns || []).some((c) => c !== column && c.options?.autoincrement)
    ) {
      return;
    }

    /**
     * If there is an unique option that would
     * create duplicate unique key, remove it.
     */
    if (
      options.unique &&
      table.uniqueKeys?.some(
        (uniqueKey) =>
          uniqueKey.columns.length === 1 && uniqueKey.columns[0].column === column.name,
      )
    ) {
      delete options.unique;
    }

    /**
     * Finally change the column.
     */
    if (position && table.moveColumn(column, position)) {
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
   */
  private static dropColumn(
    json: O_ALTER_TABLE_SPEC_DROP_COLUMN,
    table: TableModelInterface,
  ): void {
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
   */
  private static dropIndex(json: O_ALTER_TABLE_SPEC_DROP_INDEX, table: TableModelInterface): void {
    if (json.index.toLowerCase() === 'primary') {
      AlterTable.dropPrimaryKey(json, table);
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
   */
  private static dropPrimaryKey(
    json: O_ALTER_TABLE_SPEC_DROP_PRIMARY_KEY | O_ALTER_TABLE_SPEC_DROP_INDEX,
    table: TableModelInterface,
  ): void {
    table.dropPrimaryKey();
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  private static dropForeignKey(
    json: O_ALTER_TABLE_SPEC_DROP_FOREIGN_KEY,
    table: TableModelInterface,
  ): void {
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
   */
  private static renameIndex(
    json: O_ALTER_TABLE_SPEC_RENAME_INDEX,
    table: TableModelInterface,
  ): void {
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
   */
  private static rename(json: O_ALTER_TABLE_SPEC_RENAME, table: TableModelInterface): void {
    table.renameTo(json.newName);
  }
}

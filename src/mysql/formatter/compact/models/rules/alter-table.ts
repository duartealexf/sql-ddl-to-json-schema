import { Database } from '../database';
import { TableOptions } from '../table-options';
import { Column } from '../column';
import { Datatype } from '../datatype';
import { ColumnOptions } from '../column-options';
import { PrimaryKey } from '../primary-key';
import { ForeignKey } from '../foreign-key';
import { UniqueKey } from '../unique-key';
import { FulltextIndex } from '../fulltext-index';
import { SpatialIndex } from '../spatial-index';
import { Index } from '../index';
import { Table } from '../table';
import { isFunction, isDefined } from '@shared/utils';
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
} from '@mysql/compiled/typings';

/**
 * Formatter for P_ALTER_TABLE rule's parsed JSON.
 */
export class AlterTable {
  database!: Database;

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): Table | undefined {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: Database) {
    this.database = database;
  }

  /**
   * Alters one of the tables.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: { id: string; def: { table: any; specs: any[] } }) {
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
    json.def.specs.forEach((spec: { def: { spec: any; tableOptions: any } }) => {
      const changeSpec = spec.def.spec;
      const tableOptions = spec.def.tableOptions;
      if (changeSpec) {
        const def = changeSpec.def;
        const action = def.action as keyof this;

        const fn = this[action];

        if (isFunction(fn)) {
          fn(def, table);
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
  addColumn(json: O_ALTER_TABLE_SPEC_ADD_COLUMN, table: Table) {
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
  addColumns(json: O_ALTER_TABLE_SPEC_ADD_COLUMNS, table: Table) {
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
  addIndex(json: O_ALTER_TABLE_SPEC_ADD_INDEX, table: Table) {
    const index = Index.fromObject(json);
    table.pushIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  addPrimaryKey(json: O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY, table: Table) {
    const key = PrimaryKey.fromObject(json);
    table.setPrimaryKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  addUniqueKey(json: O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY, table: Table) {
    const key = UniqueKey.fromObject(json);
    table.pushUniqueKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  addFulltextIndex(json: O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX, table: Table) {
    const index = FulltextIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  addSpatialIndex(json: O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX, table: Table) {
    const index = SpatialIndex.fromObject(json);
    table.pushFulltextIndex(index);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  addForeignKey(json: O_ALTER_TABLE_SPEC_ADD_FOREIGN_KEY, table: Table) {
    const key = ForeignKey.fromObject(json);
    table.pushForeignKey(key);
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  setDefaultColumnValue(json: O_ALTER_TABLE_SPEC_SET_DEFAULT_COLUMN_VALUE, table: Table) {
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
  dropDefaultColumnValue(json: O_ALTER_TABLE_SPEC_DROP_DEFAULT_COLUMN_VALUE, table: Table) {
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
  changeColumn(json: O_ALTER_TABLE_SPEC_CHANGE_COLUMN, table: Table) {
    const column = table.getColumn(json.column);

    if (!column) {
      return;
    }

    let position: O_ALTER_TABLE_SPEC_ADD_COLUMN['position'];

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
      (table.columns || []).some((c) => {
        return c !== column && c.options?.autoincrement;
      })
    ) {
      return;
    }

    /**
     * If there is an unique option that would
     * create duplicate unique key, remove it.
     */
    if (
      options.unique &&
      table.uniqueKeys?.some((u: { columns: string | any[] }) => {
        return u.columns.length === 1 && u.columns[0].column === column.name;
      })
    ) {
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
   */
  dropColumn(json: O_ALTER_TABLE_SPEC_DROP_COLUMN, table: Table) {
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
  dropIndex(json: O_ALTER_TABLE_SPEC_DROP_INDEX, table: Table) {
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
   */
  dropPrimaryKey(
    json: O_ALTER_TABLE_SPEC_DROP_PRIMARY_KEY | O_ALTER_TABLE_SPEC_DROP_INDEX,
    table: Table,
  ) {
    table.dropPrimaryKey();
  }

  /**
   * Performs action in ALTER TABLE statement.
   *
   * @param json O_ALTER_TABLE_SPEC def object in JSON.
   * @param table Table to be altered.
   */
  dropForeignKey(json: O_ALTER_TABLE_SPEC_DROP_FOREIGN_KEY, table: Table) {
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
  renameIndex(json: O_ALTER_TABLE_SPEC_RENAME_INDEX, table: Table) {
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
  rename(json: O_ALTER_TABLE_SPEC_RENAME, table: Table) {
    table.renameTo(json.newName);
  }
}

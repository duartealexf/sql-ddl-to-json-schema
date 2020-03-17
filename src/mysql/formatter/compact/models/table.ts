import { P_CREATE_TABLE_COMMON, P_CREATE_TABLE_LIKE, O_POSITION } from '@mysql/compiled/typings';
import { isDefined, isArray } from '@shared/utils';

import { TableOptions } from './table-options';
import { Column } from './column';
import { FulltextIndex } from './fulltext-index';
import { SpatialIndex } from './spatial-index';
import { ForeignKey } from './foreign-key';
import { UniqueKey } from './unique-key';
import { PrimaryKey } from './primary-key';
import { Index } from '.';
import {
  TableInterface,
  TableModelInterface,
  DatabaseModelInterface,
  ColumnModelInterface,
  TableOptionsModelInterface,
  FulltextIndexModelInterface,
  SpatialIndexModelInterface,
  ForeignKeyModelInterface,
  UniqueKeyModelInterface,
  IndexModelInterface,
  PrimaryKeyModelInterface,
} from './typings';

type IndexPropertyKey = 'uniqueKeys' | 'indexes' | 'fulltextIndexes' | 'spatialIndexes';
type IndexPropertyValue =
  | UniqueKeyModelInterface[]
  | IndexModelInterface[]
  | FulltextIndexModelInterface[]
  | SpatialIndexModelInterface[];

/**
 * Class to represent a table as parsed from SQL.
 */
export class Table implements TableModelInterface {
  database!: DatabaseModelInterface;
  name!: string;
  columns?: ColumnModelInterface[];
  options?: TableOptionsModelInterface;
  fulltextIndexes?: FulltextIndexModelInterface[];
  spatialIndexes?: SpatialIndexModelInterface[];
  foreignKeys?: ForeignKeyModelInterface[];
  uniqueKeys?: UniqueKeyModelInterface[];
  indexes?: IndexModelInterface[];
  primaryKey?: PrimaryKeyModelInterface;

  /**
   * Creates a table from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   * @param database Database to assign table to.
   */
  static fromCommonDef(json: P_CREATE_TABLE_COMMON, database: DatabaseModelInterface): Table {
    if (json.id !== 'P_CREATE_TABLE_COMMON') {
      throw new TypeError(`Unknown json id to build table from: ${json.id}`);
    }

    const def = json.def;
    const table = new Table();
    table.database = database;
    table.name = def.table;

    if (def.tableOptions) {
      table.options = TableOptions.fromDef(def.tableOptions);
    }

    const createDefinitions = def.columnsDef.def;

    createDefinitions.forEach((createDefinition) => {
      /**
       * If table create definition is about adding a column.
       */
      if (isDefined(createDefinition.def.column)) {
        const column = Column.fromDef(createDefinition);
        table.addColumn(column);
      } else if (isDefined(createDefinition.def.fulltextIndex)) {
        /**
         * If table create definition is about adding a fulltext index.
         */
        table.pushFulltextIndex(FulltextIndex.fromDef(createDefinition));
      } else if (isDefined(createDefinition.def.spatialIndex)) {
        /**
         * If table create definition is about adding a spatial index.
         */
        table.pushSpatialIndex(SpatialIndex.fromDef(createDefinition));
      } else if (isDefined(createDefinition.def.foreignKey)) {
        /**
         * If table create definition is about adding a foreign key.
         */
        table.pushForeignKey(ForeignKey.fromDef(createDefinition));
      } else if (isDefined(createDefinition.def.uniqueKey)) {
        /**
         * If table create definition is about adding an unique key.
         */
        table.pushUniqueKey(UniqueKey.fromDef(createDefinition));
      } else if (isDefined(createDefinition.def.primaryKey)) {
        /**
         * If table create definition is about adding a primary key.
         */
        table.setPrimaryKey(PrimaryKey.fromDef(createDefinition));
      } else if (isDefined(createDefinition.def.index)) {
        /**
         * If table create definition is about adding an index.
         */
        table.pushIndex(Index.fromDef(createDefinition));
      }
    });

    return table;
  }

  /**
   * Creates a table from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   * @param tables Already existing tables.
   */
  static fromAlikeDef(json: P_CREATE_TABLE_LIKE, tables: TableModelInterface[] = []): Table | undefined {
    if (json.id !== 'P_CREATE_TABLE_LIKE') {
      throw new TypeError(`Unknown json id to build table from: ${json.id}`);
    }

    const def = json.def;

    const alikeTable = tables.find((t) => t.name === def.like);

    if (!alikeTable) {
      // throw new Error(`Trying to "CREATE TABLE LIKE" unexisting table ${def.like}.`);
      return;
    }

    const table = alikeTable.clone();
    table.name = def.table;
    return table;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): TableInterface {
    const json: TableInterface = {
      name: this.name,
      columns: (this.columns || []).map((c) => c.toJSON()),
    };

    if (isDefined(this.primaryKey)) {
      json.primaryKey = this.primaryKey.toJSON();
    }
    if (isDefined(this.foreignKeys) && this.foreignKeys.length) {
      json.foreignKeys = this.foreignKeys.map((k) => k.toJSON());
    }
    if (isDefined(this.uniqueKeys) && this.uniqueKeys.length) {
      json.uniqueKeys = this.uniqueKeys.map((k) => k.toJSON());
    }
    if (isDefined(this.indexes) && this.indexes.length) {
      json.indexes = this.indexes.map((i) => i.toJSON());
    }
    if (isDefined(this.spatialIndexes) && this.spatialIndexes.length) {
      json.spatialIndexes = this.spatialIndexes.map((i) => i.toJSON());
    }
    if (isDefined(this.fulltextIndexes) && this.fulltextIndexes.length) {
      json.fulltextIndexes = this.fulltextIndexes.map((i) => i.toJSON());
    }
    if (isDefined(this.options)) {
      json.options = this.options.toJSON();
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): Table {
    const table = new Table();

    table.database = this.database;
    table.name = this.name;
    table.columns = (this.columns || []).map((c) => c.clone());

    if (isDefined(this.options)) {
      table.options = this.options.clone();
    }

    if (isDefined(this.primaryKey)) {
      table.primaryKey = this.primaryKey.clone();
    }

    if (isDefined(this.uniqueKeys) && this.uniqueKeys.length) {
      table.uniqueKeys = this.uniqueKeys.map((key) => key.clone());
    }

    if (isDefined(this.foreignKeys) && this.foreignKeys.length) {
      table.foreignKeys = this.foreignKeys.map((key) => key.clone());
    }

    if (isDefined(this.fulltextIndexes) && this.fulltextIndexes.length) {
      table.fulltextIndexes = this.fulltextIndexes.map((index) => index.clone());
    }

    if (isDefined(this.spatialIndexes) && this.spatialIndexes.length) {
      table.spatialIndexes = this.spatialIndexes.map((index) => index.clone());
    }

    if (isDefined(this.indexes) && this.indexes.length) {
      table.indexes = this.indexes.map((index) => index.clone());
    }

    return table;
  }

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): TableModelInterface | undefined {
    return this.database.getTable(name);
  }

  /**
   * Get tables from database.
   */
  getTables(): TableModelInterface[] {
    return this.database.getTables();
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: DatabaseModelInterface) {
    this.database = database;
  }

  /**
   * Rename table.
   *
   * @param newName New table name.
   */
  renameTo(newName: string) {
    this.database.tables.forEach((t) => {
      (t.foreignKeys || [])
        .filter((k) => k.referencesTable(this))
        .forEach((k) => k.updateReferencedTableName(newName));
    });

    this.name = newName;
  }

  /**
   * Add a column to columns array, in a given position.
   *
   * @param column Column to be added.
   * @param position Position object.
   */
  addColumn(column: ColumnModelInterface, position?: O_POSITION) {
    /**
     * Should not add column with same name.
     */
    if (this.getColumn(column.name)) {
      return;
    }

    /**
     * Validate if there are any other autoincrement
     * columns, as there should be only one.
     */
    if (
      column.options &&
      column.options.autoincrement &&
      (this.columns || []).some((c) => c.options && c.options.autoincrement)
    ) {
      return;
    }

    /**
     * Do not allow adding column with primary
     * key if table already has primary key.
     */
    if (this.primaryKey && column.options && column.options.primary) {
      return;
    }

    if (!isArray(this.columns)) {
      this.columns = [];
    }

    if (!isDefined(position)) {
      this.columns.push(column);
    } else if (!position.after) {
      this.columns.unshift(column);
    } else {
      const refColumn = this.columns.find((c) => c.name === position.after);

      if (!refColumn) {
        return;
      }

      const pos = this.columns.indexOf(refColumn);
      const end = this.columns.splice(pos + 1);
      this.columns.push(column);
      this.columns = this.columns.concat(end);
    }

    this.extractColumnKeys(column);
  }

  /**
   * Extract column keys like PrimaryKey, ForeignKey,
   * UniqueKey and add them to this table instance.
   *
   * @param column Column to be extracted.
   */
  extractColumnKeys(column: ColumnModelInterface) {
    const primaryKey = column.extractPrimaryKey();
    const foreignKey = column.extractForeignKey();
    const uniqueKey = column.extractUniqueKey();

    if (primaryKey) {
      this.setPrimaryKey(primaryKey);
    }

    if (foreignKey) {
      this.pushForeignKey(foreignKey);
    }

    if (uniqueKey) {
      this.pushUniqueKey(uniqueKey);
    }
  }

  /**
   * Move a column to a given position. Returns whether operation was successful.
   *
   * @param column One of this table columns.
   * @param position Position object.
   */
  moveColumn(column: ColumnModelInterface, position: O_POSITION): boolean {
    if (!isDefined(this.columns) || !isDefined(position)) {
      return false;
    }

    if (!this.columns.includes(column)) {
      return false;
    }

    let refColumn: ColumnModelInterface | undefined;

    /**
     * First of all, validate if 'after' column, if any, exists.
     */
    if (position.after) {
      refColumn = this.getColumn(position.after);
      if (!refColumn) {
        return false;
      }
    }

    let pos = this.columns.indexOf(column);
    let end = this.columns.splice(pos);
    end.shift();
    this.columns = this.columns.concat(end);

    if (position.after === null) {
      this.columns.unshift(column);
    } else {
      if (!refColumn) {
        return false;
      }

      pos = this.columns.indexOf(refColumn);
      end = this.columns.splice(pos + 1);
      this.columns.push(column);
      this.columns = this.columns.concat(end);
    }

    return true;
  }

  /**
   * Rename column and references to it. Returns whether operation was successful.
   *
   * @param column Column being renamed.
   * @param newName New name of column.
   */
  renameColumn(column: ColumnModelInterface, newName: string): boolean {
    if (!(this.columns || []).includes(column)) {
      return false;
    }

    /**
     * Rename references to column.
     */
    this.getTables().forEach((table) => {
      (table.foreignKeys || [])
        .filter((k) => k.referencesTable(this))
        .forEach((k) => k.renameColumn(column, newName));
    });

    (this.fulltextIndexes || []).forEach((i) => i.renameColumn(column, newName));
    (this.spatialIndexes || []).forEach((i) => i.renameColumn(column, newName));
    (this.indexes || []).forEach((i) => i.renameColumn(column, newName));
    (this.uniqueKeys || []).forEach((k) => k.renameColumn(column, newName));

    if (this.primaryKey) {
      this.primaryKey.renameColumn(column, newName);
    }

    column.name = newName;

    return true;
  }

  /**
   * Get column position object.
   *
   * @param column Column.
   */
  getColumnPosition(column: ColumnModelInterface): O_POSITION {
    const index = (this.columns || []).indexOf(column);

    /**
     * First column.
     */
    if (index === 0) {
      return { after: undefined };
    } else if (index + 1 === (this.columns || []).length) {
      /**
       * Last column.
       */
      return;
    } else {
      /**
       * Somewhere in the middle.
       */
      const refColumn = (this.columns || [])[index - 1];
      return { after: refColumn.name };
    }
  }

  /**
   * Drops table's primary key.
   */
  dropPrimaryKey() {
    if (!this.primaryKey) {
      return;
    }

    const tableColumns = this.primaryKey.getColumnsFromTable(this);

    /**
     * Should not drop primary key if pk column has autoincrement.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/14
     */
    if (tableColumns.some((c) => c.options && c.options.autoincrement)) {
      return;
    }

    delete this.primaryKey;
  }

  /**
   * Drops a column from table.
   *
   * @param column Column to be dropped.
   */
  dropColumn(column: ColumnModelInterface) {
    /**
     * Validate whether there is a reference to given column.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/12
     */

    const hasReference = this.getTables().some((t) =>
      (t.foreignKeys || []).some((k) => k.referencesTableAndColumn(this, column)),
    );

    if (hasReference) {
      return;
    }

    if (!isDefined(this.columns)) {
      return;
    }

    /**
     * Should not drop the last column of table.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/13
     */
    if (this.columns.length === 1) {
      return;
    }

    const pos = this.columns.indexOf(column);
    const end = this.columns.splice(pos);
    end.shift();
    this.columns = this.columns.concat(end);

    /**
     * Remove column from indexes. Also remove
     * the index if removed column was last.
     *
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/8
     */

    (this.fulltextIndexes || []).forEach((index) => {
      if (index.dropColumn(column.name) && !index.columns.length) {
        this.dropIndex(index);
      }
    });

    (this.spatialIndexes || []).forEach((index) => {
      if (index.dropColumn(column.name) && !index.columns.length) {
        this.dropIndex(index);
      }
    });

    (this.indexes || []).forEach((index) => {
      if (index.dropColumn(column.name) && !index.columns.length) {
        this.dropIndex(index);
      }
    });

    (this.uniqueKeys || []).forEach((key) => {
      if (key.dropColumn(column.name) && !key.columns.length) {
        this.dropIndex(key);
      }
    });

    (this.foreignKeys || []).forEach((key) => {
      if (key.dropColumn(column.name) && !key.columns.length) {
        this.dropForeignKey(key);
      }
    });

    if (isDefined(this.primaryKey)) {
      if (this.primaryKey.dropColumn(column.name) && !this.primaryKey.columns.length) {
        delete this.primaryKey;
      }
    }
  }

  /**
   * Drops an index from table.
   *
   * @param index Index to be dropped.
   */
  dropIndex(
    index:
      | UniqueKeyModelInterface
      | IndexModelInterface
      | FulltextIndexModelInterface
      | SpatialIndexModelInterface,
  ) {
    if (!isDefined(index.name)) {
      return;
    }

    const type = this.getIndexType(index.name);

    if (!isDefined(type) || !isDefined(this[type])) {
      return;
    }

    const indexes: IndexPropertyValue = this[type] as IndexPropertyValue;

    const pos = indexes.indexOf(index as any);
    const end = indexes.splice(pos);
    end.shift();
    (this[type] as IndexPropertyValue) = indexes.concat(end as any);
  }

  /**
   * Drops a foreign key from table.
   *
   * @param foreignKey Foreign key to be dropped.
   */
  dropForeignKey(foreignKey: ForeignKeyModelInterface) {
    if (!isDefined(this.foreignKeys)) {
      return;
    }

    const pos = this.foreignKeys.indexOf(foreignKey);
    const end = this.foreignKeys.splice(pos);
    end.shift();
    this.foreignKeys = this.foreignKeys.concat(end);
  }

  /**
   * Get index by name.
   *
   * @param name Index name.
   */
  getIndex(
    name: string,
  ):
    | UniqueKeyModelInterface
    | IndexModelInterface
    | FulltextIndexModelInterface
    | SpatialIndexModelInterface
    | undefined {
    const type = this.getIndexType(name);

    if (!type) {
      // throw new Error(`Trying to reference an unexsisting index ${name} on table ${this.name}`);
      return;
    }

    const indexes: IndexPropertyValue = this[type] as IndexPropertyValue;

    if (!isArray(indexes)) {
      return;
    }

    return (indexes as any[]).find((index: any) => index.name === name);
  }

  /**
   * Get which index array is storing a given index.
   *
   * @param name Index name.
   */
  getIndexType(name: string) {
    const props: IndexPropertyKey[] = [
      'uniqueKeys',
      'indexes',
      'fulltextIndexes',
      'spatialIndexes',
    ];
    const type = props.find((prop) => {
      return (this[prop] || []).some(
        (
          i:
            | UniqueKeyModelInterface
            | IndexModelInterface
            | FulltextIndexModelInterface
            | SpatialIndexModelInterface,
        ) => i.name === name,
      );
    });

    return type;
  }

  /**
   * Get column by name.
   *
   * @param name Column name.
   */
  getColumn(name: string): ColumnModelInterface | undefined {
    return (this.columns || []).find((c) => c.name === name);
  }

  /**
   * Get foreign key by name.
   *
   * @param name Foreign key name.
   */
  getForeignKey(name: string): ForeignKeyModelInterface | undefined {
    return (this.foreignKeys || []).find((k) => k.name === name);
  }

  /**
   * Whether there is a foreign key with given name in table.
   *
   * @param name Foreign key name.
   */
  hasForeignKey(name: string): boolean {
    return (this.foreignKeys || []).some((k) => k.name === name);
  }

  /**
   * Setter for table's primary key.
   *
   * @param primaryKey Primary key.
   */
  setPrimaryKey(primaryKey: PrimaryKeyModelInterface) {
    /**
     * Should not add primary key over another one.
     */
    if (this.primaryKey) {
      return;
    }

    /**
     * Validate columns referenced by primary key.
     */
    if (!primaryKey.hasAllColumnsFromTable(this)) {
      return;
    }

    /**
     * Make necessary changes in columns.
     */
    primaryKey.columns.forEach((indexCol) => {
      if (!indexCol.column) {
        return;
      }

      const column = this.getColumn(indexCol.column);

      if (!column || !column.options) {
        return;
      }

      column.options.nullable = false;
    });

    this.primaryKey = primaryKey;
  }

  /**
   * Push a fulltext index to fulltextIndexes array.
   *
   * @param fulltextIndex Index to be pushed.
   */
  pushFulltextIndex(fulltextIndex: FulltextIndexModelInterface) {
    /**
     * Should not add index or key with same name.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/15
     */
    if (fulltextIndex.name && this.getIndex(fulltextIndex.name)) {
      return;
    }

    /**
     * Validate columns referenced by fulltext index.
     */
    if (!fulltextIndex.hasAllColumnsFromTable(this)) {
      return;
    }

    if (!isDefined(this.fulltextIndexes)) {
      this.fulltextIndexes = [];
    }

    this.fulltextIndexes.push(fulltextIndex);
  }

  /**
   * Push a spatial index to spatialIndexes array.
   *
   * @param spatialIndex Index to be pushed.
   */
  pushSpatialIndex(spatialIndex: SpatialIndexModelInterface) {
    /**
     * Should not add index or key with same name.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/15
     */
    if (spatialIndex.name && this.getIndex(spatialIndex.name)) {
      return;
    }

    /**
     * Validate columns referenced by spatial index.
     */
    if (!spatialIndex.hasAllColumnsFromTable(this)) {
      return;
    }

    if (!isDefined(this.spatialIndexes)) {
      this.spatialIndexes = [];
    }

    this.spatialIndexes.push(spatialIndex);
  }

  /**
   * Push an unique key to uniqueKeys array.
   *
   * @param uniqueKey UniqueKey to be pushed.
   */
  pushUniqueKey(uniqueKey: UniqueKeyModelInterface) {
    /**
     * Should not add index or key with same name.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/15
     */
    if (uniqueKey.name && this.getIndex(uniqueKey.name)) {
      return;
    }

    /**
     * Validate columns referenced by unique key.
     */
    if (!uniqueKey.hasAllColumnsFromTable(this)) {
      return;
    }

    /**
     * If index column length is not set, set it to full column size.
     *
     * "If no length is specified, the whole column will be indexed."
     * https://mariadb.com/kb/en/library/create-table/#index-types
     */
    uniqueKey.setIndexSizeFromTable(this);

    if (!isDefined(this.uniqueKeys)) {
      this.uniqueKeys = [];
    }

    this.uniqueKeys.push(uniqueKey);
  }

  /**
   * Push a foreign key to foreignKeys array.
   *
   * @param foreignKey ForeignKey to be pushed.
   */
  pushForeignKey(foreignKey: ForeignKeyModelInterface) {
    /**
     * Should not add index or key with same name.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/15
     */
    if (foreignKey.name && this.getIndex(foreignKey.name)) {
      return;
    }

    /**
     * Validate if referenced table exists.
     *
     * UPDATE:
     * Since DDLs can run with FOREIGN_KEY_CHECKS disabled, this has been disabled.
     * @see https://github.com/duartealexf/sql-ddl-to-json-schema/issues/27
     * - duartealexf
     */
    // const referencedTable = foreignKey.getReferencedTable(this.getTables());
    // if (!referencedTable) { return; }

    /**
     * Validate columns.
     *
     * UPDATE:
     * Since DDLs can run with FOREIGN_KEY_CHECKS disabled, this has been disabled.
     * @see https://github.com/duartealexf/sql-ddl-to-json-schema/issues/27
     * - duartealexf
     */
    // const hasAllColumnsFromThisTable = foreignKey.hasAllColumnsFromTable(this);
    // const hasAllColumnsFromReference = foreignKey.hasAllColumnsFromRefTable(referencedTable);

    // if (!hasAllColumnsFromThisTable || !hasAllColumnsFromReference) { return; }

    /**
     * If index column length is not set, set it to full column size.
     *
     * "If no length is specified, the whole column will be indexed."
     * https://mariadb.com/kb/en/library/create-table/#index-types
     */
    foreignKey.setIndexSizeFromTable(this);

    if (!isDefined(this.foreignKeys)) {
      this.foreignKeys = [];
    }

    this.foreignKeys.push(foreignKey);
  }

  /**
   * Push an index to indexes array.
   *
   * @param index Index to be pushed.
   */
  pushIndex(index: IndexModelInterface) {
    /**
     * Should not add index or key with same name.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/15
     */
    if (index.name && this.getIndex(index.name)) {
      return;
    }

    /**
     * Validate columns referenced by index.
     */
    if (!index.hasAllColumnsFromTable(this)) {
      return;
    }

    /**
     * If index column length is not set, set it to full column size.
     *
     * "If no length is specified, the whole column will be indexed."
     * https://mariadb.com/kb/en/library/create-table/#index-types
     */
    index.setIndexSizeFromTable(this);

    if (!isDefined(this.indexes)) {
      this.indexes = [];
    }

    this.indexes.push(index);
  }
}
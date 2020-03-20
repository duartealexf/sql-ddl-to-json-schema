import {
  O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY,
  O_CREATE_TABLE_CREATE_DEFINITION,
  O_CREATE_TABLE_CREATE_DEFINITION_PRIMARY_KEY,
  PrimaryKeyInterface,
} from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import { IndexColumn } from './index-column';
import { IndexOptions } from './index-options';
import {
  PrimaryKeyModelInterface,
  IndexColumnModelInterface,
  IndexOptionsModelInterface,
  TableModelInterface,
  ColumnModelInterface,
} from './typings';

/**
 * Primary key of a table.
 */
export class PrimaryKey implements PrimaryKeyModelInterface {
  name?: string;

  indexType?: string;

  columns?: IndexColumnModelInterface[];

  options?: IndexOptionsModelInterface;

  /**
   * Creates a primary key from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION): PrimaryKey {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return PrimaryKey.fromObject(json.def.primaryKey as O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY);
    }

    throw new TypeError(`Unknown json id to build primary key from: ${json.id}`);
  }

  /**
   * Creates a primary key from an object containing needed properties.
   *
   * @param json Object containing properties.
   * @returns {PrimaryKey} Resulting primary key.
   */
  static fromObject(
    json: O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY | O_CREATE_TABLE_CREATE_DEFINITION_PRIMARY_KEY,
  ): PrimaryKey {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) {
      primaryKey.name = json.name;
    }

    if (json.index) {
      primaryKey.indexType = json.index.def.toLowerCase();
    }

    if (json.options && json.options.length) {
      primaryKey.options = IndexOptions.fromArray(json.options);
    }

    return primaryKey;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): PrimaryKeyInterface {
    const json: PrimaryKeyInterface = {
      columns: (this.columns ?? []).map((c) => c.toJSON()),
    };

    if (isDefined(this.name)) {
      json.name = this.name;
    }
    if (isDefined(this.options)) {
      json.options = this.options.toJSON();
    }
    if (isDefined(this.indexType)) {
      json.indexType = this.indexType;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): PrimaryKey {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = (this.columns ?? []).map((c) => c.clone());

    if (isDefined(this.indexType)) {
      primaryKey.indexType = this.indexType;
    }

    if (this.options) {
      primaryKey.options = this.options.clone();
    }

    return primaryKey;
  }

  /**
   * Pushes an index column to this primary key.
   *
   * @param {IndexColumn} indexColumn Index column to be pushed.
   */
  pushColumn(indexColumn: IndexColumnModelInterface): void {
    if (!this.columns) {
      this.columns = [];
    }

    this.columns.push(indexColumn);
  }

  /**
   * Drops a column from key. Returns whether column was removed.
   *
   * @param name Column name to be dropped.
   */
  dropColumn(name: string): boolean {
    if (!this.columns) {
      return false;
    }

    let pos = -1;

    const found = this.columns.some((c, i) => {
      pos = i;
      return c.column === name;
    });

    if (!found || pos < 0) {
      return false;
    }

    const end = this.columns.splice(pos);
    end.shift();
    this.columns = this.columns.concat(end);

    return true;
  }

  /**
   * Get the columns in given table which this
   * primary key's index columns refer to.
   *
   * @param table Table in question.
   */
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[] {
    return (table.columns ?? []).filter((tableColumn) =>
      (this.columns ?? []).some((indexColumn) => indexColumn.column === tableColumn.name),
    );
  }

  /**
   * Whether the given table has all of this primary key's columns.
   *
   * @param table Table in question.
   */
  hasAllColumnsFromTable(table: TableModelInterface): boolean {
    return (
      (table.columns ?? []).filter((tableColumn) =>
        (this.columns ?? []).some((indexColumn) => indexColumn.column === tableColumn.name),
      ).length === (this.columns ?? []).length
    );
  }

  /**
   * Rename index column name.
   *
   * @param column Column being renamed.
   * @param newName New column name.
   */
  renameColumn(column: ColumnModelInterface, newName: string): void {
    return this.columns?.filter((c) => c.column === column.name)
      .forEach((c) => {
        c.column = newName;
      });
  }
}

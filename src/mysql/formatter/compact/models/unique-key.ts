import {
  O_CREATE_TABLE_CREATE_DEFINITION,
  P_CREATE_INDEX,
  O_CREATE_TABLE_CREATE_DEFINITION_UNIQUE_KEY,
  STATEMENT,
  O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY,
  UniqueKeyInterface,
} from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import { IndexOptions } from './index-options';
import { IndexColumn } from './index-column';
import {
  UniqueKeyModelInterface,
  IndexColumnModelInterface,
  IndexOptionsModelInterface,
  TableModelInterface,
  ColumnModelInterface,
} from './typings';

/**
 * Unique key of a table.
 */
export class UniqueKey implements UniqueKeyModelInterface {
  name?: string;

  indexType?: string;

  columns: IndexColumnModelInterface[] = [];

  options?: IndexOptionsModelInterface;

  /**
   * Creates a unique key from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION | P_CREATE_INDEX): UniqueKey {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return UniqueKey.fromObject(
        json.def.uniqueKey as O_CREATE_TABLE_CREATE_DEFINITION_UNIQUE_KEY,
      );
    }

    if (json.id === 'P_CREATE_INDEX') {
      return UniqueKey.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build unique key from: ${(json as STATEMENT).id}`);
  }

  /**
   * Creates an unique key from an object containing needed properties.
   *
   * @param json Object containing properties.
   */
  static fromObject(
    json:
      | P_CREATE_INDEX['def']
      | O_CREATE_TABLE_CREATE_DEFINITION_UNIQUE_KEY
      | O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY,
  ): UniqueKey {
    const uniqueKey = new UniqueKey();

    uniqueKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) {
      uniqueKey.name = json.name;
    }
    if (json.index) {
      uniqueKey.indexType = json.index.def.toLowerCase();
    }

    if (isDefined(json.options) && json.options.length) {
      uniqueKey.options = IndexOptions.fromArray(json.options);
    }

    return uniqueKey;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): UniqueKeyInterface {
    const json: UniqueKeyInterface = {
      columns: this.columns.map((c) => c.toJSON()),
    };

    if (isDefined(this.name)) {
      json.name = this.name;
    }
    if (isDefined(this.indexType)) {
      json.indexType = this.indexType;
    }
    if (isDefined(this.options)) {
      json.options = this.options.toJSON();
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): UniqueKey {
    const key = new UniqueKey();

    key.columns = this.columns.map((c) => c.clone());

    if (isDefined(this.name)) {
      key.name = this.name;
    }
    if (isDefined(this.indexType)) {
      key.indexType = this.indexType;
    }
    if (isDefined(this.options)) {
      key.options = this.options.clone();
    }

    return key;
  }

  /**
   * Drops a column from key. Returns whether column was removed.
   *
   * @param name Column name to be dropped.
   */
  dropColumn(name: string): boolean {
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
   * unique key's index columns refer to.
   *
   * @param table Table in question.
   */
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[] {
    return (table.columns ?? []).filter((tableColumn) =>
      this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
    );
  }

  /**
   * Whether the given table has all of this unique key's columns.
   *
   * @param table Table in question.
   */
  hasAllColumnsFromTable(table: TableModelInterface): boolean {
    return (
      (table.columns ?? []).filter((tableColumn) =>
        this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
      ).length === this.columns.length
    );
  }

  /**
   * Set size of this index to the size of index's column in given
   * table, if the size of this index is not already set.
   *
   * @param table Table to search size for.
   */
  setIndexSizeFromTable(table: TableModelInterface): void {
    this.columns
      .filter((i) => !isDefined(i.length))
      .forEach((indexColumn) => {
        const column = (table.columns ?? []).find((c) => c.name === indexColumn.column);

        if (!column) {
          return;
        }

        const indexableSize = column.type.getMaxIndexableSize();

        if (indexableSize > 0) {
          indexColumn.length = indexableSize;
        }
      });
  }

  /**
   * Rename index column name.
   *
   * @param column Column being renamed.
   * @param newName New column name.
   */
  renameColumn(column: ColumnModelInterface, newName: string): void {
    this.columns
      .filter((c) => c.column === column.name)
      .forEach((c) => {
        c.column = newName;
      });
  }
}

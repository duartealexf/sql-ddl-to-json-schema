import {
  O_CREATE_TABLE_CREATE_DEFINITION,
  P_CREATE_INDEX,
  STATEMENT,
  O_CREATE_TABLE_CREATE_DEFINITION_INDEX,
  O_ALTER_TABLE_SPEC_ADD_INDEX,
} from '@typings/parsed';
import { IndexInterface } from '@typings/compact';
import { isDefined } from '@shared/utils';

import { IndexColumn } from './index-column';
import { IndexOptions } from './index-options';
import {
  IndexModelInterface,
  IndexColumnModelInterface,
  IndexOptionsModelInterface,
  TableModelInterface,
  ColumnModelInterface,
} from './typings';

/**
 * Table index.
 */
export class Index implements IndexModelInterface {
  name?: string;
  indexType?: string;
  columns: IndexColumnModelInterface[] = [];
  options?: IndexOptionsModelInterface;

  /**
   * Creates an index from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION | P_CREATE_INDEX): Index {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return Index.fromObject(json.def.index as O_CREATE_TABLE_CREATE_DEFINITION_INDEX);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return Index.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build index from: ${(json as STATEMENT).id}`);
  }

  /**
   * Creates an index from an object containing needed properties.
   *
   * @param json Object containing properties.
   */
  static fromObject(
    json:
      | O_CREATE_TABLE_CREATE_DEFINITION_INDEX
      | P_CREATE_INDEX['def']
      | O_ALTER_TABLE_SPEC_ADD_INDEX,
  ): Index {
    const index = new Index();
    index.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) {
      index.name = json.name;
    }
    if (json.index) {
      index.indexType = json.index.def.toLowerCase();
    }

    if (isDefined(json.options) && json.options.length) {
      index.options = IndexOptions.fromArray(json.options);
    }

    return index;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): IndexInterface {
    const json: IndexInterface = {
      columns: this.columns.map((c) => c.toJSON()),
    };

    if (isDefined(this.options)) {
      json.options = this.options.toJSON();
    }
    if (isDefined(this.indexType)) {
      json.indexType = this.indexType;
    }
    if (isDefined(this.name)) {
      json.name = this.name;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): Index {
    const index = new Index();

    index.columns = this.columns.map((c) => c.clone());

    if (isDefined(this.options)) {
      index.options = this.options.clone();
    }
    if (isDefined(this.indexType)) {
      index.indexType = this.indexType;
    }
    if (isDefined(this.name)) {
      index.name = this.name;
    }

    return index;
  }

  /**
   * Drops a column from index. Returns whether column was removed.
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
   * index's index columns refer to.
   *
   * @param table Table in question.
   */
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[] {
    return (table.columns || []).filter((tableColumn) =>
      this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
    );
  }

  /**
   * Whether the given table has all of this index's columns.
   *
   * @param table Table in question.
   */
  hasAllColumnsFromTable(table: TableModelInterface): boolean {
    return (
      (table.columns || []).filter((tableColumn) =>
        this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
      ).length === this.columns.length
    );
  }

  /**
   * Set size of this index to the size of index's column in given
   * table, if the size of this index is not already set.
   * @param table Table to search size for.
   */
  setIndexSizeFromTable(table: TableModelInterface): void {
    this.columns
      .filter((i) => !isDefined(i.length))
      .forEach((indexColumn) => {
        const column = (table.columns || []).find((c) => c.name === indexColumn.column);

        if (!column) {
          return;
        }

        indexColumn.length = column.type.getMaxIndexableSize();
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

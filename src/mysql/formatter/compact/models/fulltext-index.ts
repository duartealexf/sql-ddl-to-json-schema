import { IndexColumn } from './index-column';
import { IndexOptions } from './index-options';
import { Table } from './table';
import { Column } from './column';

import { isDefined } from '@shared/utils';
import { FulltextIndexInterface, ClonableInterface, SerializableInterface } from './typings';
import {
  O_CREATE_TABLE_CREATE_DEFINITION,
  P_CREATE_INDEX,
  STATEMENT,
  O_CREATE_TABLE_CREATE_DEFINITION_FULLTEXT_INDEX,
  O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX,
} from '@mysql/compiled/typings';

/**
 * Fulltext index of a table.
 */
export class FulltextIndex
  implements FulltextIndexInterface, ClonableInterface, SerializableInterface {
  name?: string;
  columns: IndexColumn[] = [];
  options?: IndexOptions;

  /**
   * Creates a fulltext index from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION | P_CREATE_INDEX): FulltextIndex {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return FulltextIndex.fromObject(
        json.def.fulltextIndex as O_CREATE_TABLE_CREATE_DEFINITION_FULLTEXT_INDEX,
      );
    }

    if (json.id === 'P_CREATE_INDEX') {
      return FulltextIndex.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build fulltext index from: ${(json as STATEMENT).id}`);
  }

  /**
   * Creates a fulltext index from an object containing needed properties.
   *
   * @param json Object containing properties.
   * @returns {FulltextIndex} Resulting fulltext index.
   */
  static fromObject(
    json: O_CREATE_TABLE_CREATE_DEFINITION_FULLTEXT_INDEX | P_CREATE_INDEX['def'] | O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX,
  ): FulltextIndex {
    const fulltextIndex = new FulltextIndex();
    fulltextIndex.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) {
      fulltextIndex.name = json.name;
    }

    if (isDefined(json.options) && json.options.length) {
      fulltextIndex.options = IndexOptions.fromArray(json.options);
    }

    return fulltextIndex;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): FulltextIndexInterface {
    const json: FulltextIndexInterface = {
      columns: this.columns.map((c) => c.toJSON()),
    };

    if (isDefined(this.name)) {
      json.name = this.name;
    }
    if (isDefined(this.options)) {
      json.options = this.options.toJSON();
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {FulltextIndex} Clone.
   */
  clone(): FulltextIndex {
    const index = new FulltextIndex();

    index.columns = this.columns.map((c) => c.clone());

    if (isDefined(this.name)) {
      index.name = this.name;
    }
    if (isDefined(this.options)) {
      index.options = this.options.toJSON();
    }

    return index;
  }

  /**
   * Drops a column from index, returning whether column was removed.
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
   * fulltext index's index columns refer to.
   *
   * @param table Table in question.
   */
  getColumnsFromTable(table: Table): Column[] {
    return (table.columns || []).filter((tableColumn: Column) =>
      this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
    );
  }

  /**
   * Get whether the given table has all of this fultext index's columns.
   *
   * @param table Table in question.
   */
  hasAllColumnsFromTable(table: Table): boolean {
    return (
      (table.columns || []).filter((tableColumn: Column) =>
        this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
      ).length === this.columns.length
    );
  }

  /**
   * Rename index column name.
   *
   * @param column Column being renamed.
   * @param newName New column name.
   */
  renameColumn(column: Column, newName: string) {
    this.columns
      .filter((c) => c.column === column.name)
      .forEach((c) => {
        c.column = newName;
      });
  }
}

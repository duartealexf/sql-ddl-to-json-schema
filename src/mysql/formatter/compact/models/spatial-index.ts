import {
  O_CREATE_TABLE_CREATE_DEFINITION,
  P_CREATE_INDEX,
  STATEMENT,
  O_CREATE_TABLE_CREATE_DEFINITION_SPATIAL_INDEX,
  O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX,
  SpatialIndexInterface,
} from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import { IndexColumn } from './index-column';
import { IndexOptions } from './index-options';
import {
  SpatialIndexModelInterface,
  IndexColumnModelInterface,
  IndexOptionsModelInterface,
  TableModelInterface,
  ColumnModelInterface,
} from './typings';

/**
 * Spatial index of a table.
 */
export class SpatialIndex implements SpatialIndexModelInterface {
  name?: string;

  columns: IndexColumnModelInterface[] = [];

  options?: IndexOptionsModelInterface;

  /**
   * Creates a spatial index from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION | P_CREATE_INDEX): SpatialIndex {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return SpatialIndex.fromObject(
        json.def.spatialIndex as O_CREATE_TABLE_CREATE_DEFINITION_SPATIAL_INDEX,
      );
    }

    if (json.id === 'P_CREATE_INDEX') {
      return SpatialIndex.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build spatial index from: ${(json as STATEMENT).id}`);
  }

  /**
   * Creates a spatial index from an object containing needed properties.
   */
  static fromObject(
    json:
      | O_CREATE_TABLE_CREATE_DEFINITION_SPATIAL_INDEX
      | P_CREATE_INDEX['def']
      | O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX,
  ): SpatialIndex {
    const spatialIndex = new SpatialIndex();
    spatialIndex.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) {
      spatialIndex.name = json.name;
    }

    if (isDefined(json.options) && json.options.length) {
      spatialIndex.options = IndexOptions.fromArray(json.options);
    }

    return spatialIndex;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): SpatialIndexInterface {
    const json: SpatialIndexInterface = {
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
   */
  clone(): SpatialIndex {
    const index = new SpatialIndex();

    index.columns = this.columns.map((c) => c.clone());

    if (isDefined(this.name)) {
      index.name = this.name;
    }
    if (isDefined(this.options)) {
      index.options = this.options.clone();
    }

    return index;
  }

  /**
   * Drops a column from index. Returns whether column was removed
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
   * spatial index's index columns refer to.
   *
   * @param table Table in question.
   */
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[] {
    return (table.columns ?? []).filter((tableColumn) =>
      this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
    );
  }

  /**
   * Whether the given table has all of this spatial index's columns.
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

import {
  O_CREATE_TABLE_CREATE_DEFINITION,
  O_CREATE_TABLE_CREATE_DEFINITION_FOREIGN_KEY,
  ForeignKeyInterface,
} from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import { ColumnReference } from './column-reference';
import { IndexColumn } from './index-column';
import {
  ForeignKeyModelInterface,
  IndexColumnModelInterface,
  ColumnReferenceModelInterface,
  ColumnModelInterface,
  TableModelInterface,
} from './typings';

/**
 * Foreign key of a table.
 */
export class ForeignKey implements ForeignKeyModelInterface {
  name?: string;

  columns: IndexColumnModelInterface[] = [];

  reference!: ColumnReferenceModelInterface;

  /**
   * Creates a foreign key from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION): ForeignKey {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      if (isDefined(json.def.foreignKey)) {
        return ForeignKey.fromObject(json.def.foreignKey);
      }

      throw new TypeError(
        `Statement ${json.id} has undefined foreignKey. Cannot format foreignKey.`,
      );
    }

    throw new TypeError(`Unknown json id to build foreign key from: ${json.id}`);
  }

  /**
   * Creates a foreign key from an object containing needed properties.
   *
   * @param json Object containing properties.
   */
  static fromObject(json: O_CREATE_TABLE_CREATE_DEFINITION_FOREIGN_KEY): ForeignKey {
    const foreignKey = new ForeignKey();

    foreignKey.columns = json.columns.map(IndexColumn.fromDef);
    foreignKey.reference = ColumnReference.fromDef(json.reference);

    if (json.name) {
      foreignKey.name = json.name;
    }

    return foreignKey;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): ForeignKeyInterface {
    const json: ForeignKeyInterface = {
      columns: this.columns.map((c) => c.toJSON()),
      reference: this.reference.toJSON(),
    };

    if (isDefined(this.name)) {
      json.name = this.name;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): ForeignKey {
    const key = new ForeignKey();

    key.columns = this.columns.map((c) => c.clone());
    key.reference = this.reference.clone();

    if (isDefined(this.name)) {
      key.name = this.name;
    }

    return key;
  }

  /**
   * Push an index column to columns array.
   *
   * @param indexColumn Index column to be pushed.
   */
  pushColumn(indexColumn: IndexColumnModelInterface): void {
    this.columns.push(indexColumn);
  }

  /**
   * Drops an index column, returning a boolean to whether column was removed.
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
   * Get the columns in given table which this foreign key's index columns refer to.
   *
   * @param table Table in question.
   */
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[] {
    return (table.columns ?? []).filter((tableColumn) =>
      this.columns.some((indexColumn) => indexColumn.column === tableColumn.name),
    );
  }

  /**
   * Get whether the given table has all of this foreign key's owner table columns.
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
   * Get whether the given table has all of this foreign key's referenced table columns.
   */
  hasAllColumnsFromRefTable(table: TableModelInterface): boolean {
    return (
      (table.columns ?? []).filter((tableColumn) =>
        this.reference.columns?.some((indexColumn) => indexColumn.column === tableColumn.name),
      ).length === this.reference.columns?.length
    );
  }

  /**
   * Get referenced table by this foreign key, from array
   * of given tables. Returns null if no table was found.
   *
   * @param tables Table array to search.
   */
  getReferencedTable(tables: TableModelInterface[]): TableModelInterface | undefined {
    return tables.find((t) => t.name === this.reference.table) ?? undefined;
  }

  /**
   * Checks and returns whether this foreign key references given table and column.
   *
   * @param table Table to be checked whether there is reference to.
   * @param column Column to be checked in given table.
   */
  referencesTableAndColumn(table: TableModelInterface, column: ColumnModelInterface): boolean {
    return (
      this.reference.table === table.name &&
      (this.reference.columns ?? []).some((indexColumn) => indexColumn.column === column.name)
    );
  }

  /**
   * Checks and returns whether this foreign key references given table.
   *
   * @param table Table to be checked whether there is reference to.
   */
  referencesTable(table: TableModelInterface): boolean {
    return this.reference.table === table.name;
  }

  /**
   * Rename index column name.
   *
   * @param column Column being renamed.
   * @param newName New column name.
   */
  renameColumn(column: ColumnModelInterface, newName: string): void {
    return this.reference.columns
      ?.filter((c) => c.column === column.name)
      .forEach((c) => {
        c.column = newName;
      });
  }

  /**
   * Update referenced table name.
   *
   * @param newName New table name.
   */
  updateReferencedTableName(newName: string): void {
    this.reference.table = newName;
  }
}

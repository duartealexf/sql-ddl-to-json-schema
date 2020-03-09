import { O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY, O_CREATE_TABLE_CREATE_DEFINITION, O_CREATE_TABLE_CREATE_DEFINITION_PRIMARY_KEY } from "@mysql/compiled/typings";
import { PrimaryKeyInterface, IndexColumnInterface, IndexOptionsInterface } from "./typings";

/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');
const Table = require('./table');
const Column = require('./column');

const utils = require('@shared/utils');

/**
 * Primary key of a table.
 */
class PrimaryKey implements PrimaryKeyInterface {
  name?: string;
  indexType?: string;
  columns!: IndexColumnInterface[];
  options?: IndexOptionsInterface;

  /**
   * Creates a primary key from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION): PrimaryKey {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return PrimaryKey.fromObject(json.def.primaryKey);
    }

    throw new TypeError(`Unknown json id to build primary key from: ${json.id}`);
  }

  /**
   * Creates a primary key from an object containing needed properties.
   *
   * @param json Object containing properties.
   * @returns {PrimaryKey} Resulting primary key.
   */
  static fromObject(json: O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY | O_CREATE_TABLE_CREATE_DEFINITION_PRIMARY_KEY): PrimaryKey {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) { primaryKey.name = json.name; }

    if (json.index) { primaryKey.indexType = json.index.def.toLowerCase(); }

    if (json.options && json.options.length) {
      primaryKey.options = IndexOptions.fromArray(json.options);
    }

    return primaryKey;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON(): any {
    const json = {
      columns: this.columns.map(c => c.toJSON())
    };

    if (utils.isDefined(this.name)) { json.name = this.name; }
    if (utils.isDefined(this.options)) { json.options = this.options.toJSON(); }
    if (utils.isDefined(this.indexType)) { json.indexType = this.indexType; }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {PrimaryKey} Clone.
   */
  clone(): PrimaryKey {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = this.columns.map(c => c.clone());

    if (utils.isDefined(this.indexType)) { primaryKey.indexType = this.indexType; }

    if (this.options) {
      primaryKey.options = this.options.clone();
    }

    return primaryKey;
  }

  /**
   * Pushes an index column to this primary key.
   *
   * @param {IndexColumn} indexColumn Index column to be pushed.
   * @returns {void}
   */
  pushColumn(indexColumn: IndexColumn): void {
    this.columns.push(indexColumn);
  }

  /**
   * Drops a column from key.
   *
   * @param name Column name to be dropped.
   * @returns {boolean} Whether column was removed.
   */
  dropColumn(name): boolean {
    let pos;
    const found = this.columns.some((c, i) => {
      pos = i;
      return c.column === name;
    });
    if (!found) { return false; }

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
   * @returns {Column[]} Found columns.
   */
  getColumnsFromTable(table): Column[] {
    return table.columns.filter(tableColumn =>
      this.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    );
  }

  /**
   * Whether the given table has all of this primary key's columns.
   *
   * @param table Table in question.
   * @returns {boolean} Test result.
   */
  hasAllColumnsFromTable(table): boolean {
    return table.columns.filter(tableColumn =>
      this.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    ).length === this.columns.length;
  }

  /**
   * Rename index column name.
   *
   * @param {Column} column Column being renamed.
   * @param newName New column name.
   * @returns {void}
   */
  renameColumn(column: Column, newName): void {
    this.columns.filter(c => c.column === column.name)
      .forEach(c => {
        c.column = newName;
      });
  }
}

module.exports = PrimaryKey;

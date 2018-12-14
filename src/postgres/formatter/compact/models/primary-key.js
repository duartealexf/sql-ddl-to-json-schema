/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');
const Table = require('./table');
const Column = require('./column');

const utils = require('../../../../shared/utils');

/**
 * Primary key of a table.
 */
class PrimaryKey {

  /**
   * Creates a primary key from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {PrimaryKey} Created primary key.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return PrimaryKey.fromObject(json.def.primaryKey);
    }

    throw new TypeError(`Unknown json id to build primary key from: ${json.id}`);
  }

  /**
   * Creates a primary key from an object containing needed properties.
   * Properties are 'columns', 'index' and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {PrimaryKey} Resulting primary key.
   */
  static fromObject(json) {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.index)  { primaryKey.indexType = json.index.def.toLowerCase(); }

    if (json.options.length) {
      primaryKey.options = IndexOptions.fromArray(json.options);
    }

    return primaryKey;
  }

  /**
   * PrimaryKey constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.indexType = undefined;

    /**
     * @type {IndexColumn[]}
     */
    this.columns = [];

    /**
     * @type {IndexOptions}
     */
    this.options = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {
      columns: this.columns.map(c => c.toJSON())
    };

    if (utils.isDefined(this.options))   { json.options   = this.options.toJSON(); }
    if (utils.isDefined(this.indexType)) { json.indexType = this.indexType; }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {PrimaryKey} Clone.
   */
  clone() {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = this.columns.map(c => c.clone());

    if (utils.isDefined(this.indexType))  { primaryKey.indexType = this.indexType; }

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
  pushColumn(indexColumn) {
    this.columns.push(indexColumn);
  }

  /**
   * Drops a column from key.
   *
   * @param {string} name Column name to be dropped.
   * @returns {boolean} Whether column was removed.
   */
  dropColumn(name) {
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
   * @param {Table} table Table in question.
   * @returns {Column[]} Found columns.
   */
  getColumnsFromTable(table) {
    return table.columns.filter(tableColumn =>
      this.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    );
  }

  /**
   * Whether the given table has all of this primary key's columns.
   *
   * @param {Table} table Table in question.
   * @returns {boolean} Test result.
   */
  hasAllColumnsFromTable(table) {
    return table.columns.filter(tableColumn =>
      this.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    ).length === this.columns.length;
  }

  /**
   * Rename index column name.
   *
   * @param {Column} column Column being renamed.
   * @param {string} newName New column name.
   * @returns {void}
   */
  renameColumn(column, newName) {
    this.columns.filter(c => c.column === column.name)
      .forEach(c => {
        c.column = newName;
      });
  }
}

module.exports = PrimaryKey;

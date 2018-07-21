/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');
const Table = require('./table');
const Column = require('./column');

const utils = require('../../../../shared/utils');

/**
 * Unique key of a table.
 */
class UniqueKey {

  /**
   * Creates a unique key from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {UniqueKey} Created unique key.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return UniqueKey.fromObject(json.def.uniqueKey);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return UniqueKey.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build unique key from: ${json.id}`);
  }

  /**
   * Creates an unique key from an object containing needed properties.
   * Properties are 'columns', 'name', 'index', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {UniqueKey} Resulting unique key.
   */
  static fromObject(json) {
    const uniqueKey = new UniqueKey();
    uniqueKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name)   { uniqueKey.name      = json.name; }
    if (json.index)  { uniqueKey.indexType = json.index.def.toLowerCase(); }

    if (json.options.length) {
      uniqueKey.options = IndexOptions.fromArray(json.options);
    }

    return uniqueKey;
  }

  /**
   * UniqueKey constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.name = undefined;

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
    const json = {};

    json.columns = this.columns.map(c => c.toJSON());

    if (utils.isDefined(this.name))       { json.name       = this.name; }
    if (utils.isDefined(this.indexType))  { json.indexType  = this.indexType; }
    if (utils.isDefined(this.options))    { json.options    = this.options.toJSON(); }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {UniqueKey} Clone.
   */
  clone() {
    const key = new UniqueKey();

    key.columns = this.columns.map(c => c.clone());

    if (utils.isDefined(this.name))       { key.name       = this.name; }
    if (utils.isDefined(this.indexType))  { key.indexType  = this.indexType; }
    if (utils.isDefined(this.options))    { key.options    = this.options.clone(); }

    return key;
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
   * unique key's index columns refer to.
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
   * Whether the given table has all of this unique key's columns.
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
   * Set size of this index to the size of index's column in given
   * table, if the size of this index is not already set.
   * @param {Table} table Table to search size for.
   * @returns {void}
   */
  setIndexSizeFromTable(table) {
    this.columns
      .filter(i => !utils.isDefined(i.length))
      .forEach(indexColumn => {
        const column = table.columns.find(c => c.name === indexColumn.column);

        if (!column) {
          return;
        }

        indexColumn.length = column.type.getMaxIndexableSize();
      });
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

module.exports = UniqueKey;

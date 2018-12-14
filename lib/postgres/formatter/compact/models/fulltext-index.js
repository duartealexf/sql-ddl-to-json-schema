/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');
const Table = require('./table');
const Column = require('./column');

const utils = require('../../../../shared/utils');

/**
 * Fulltext index of a table.
 */
class FulltextIndex {

  /**
   * Creates a fulltext index from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {FulltextIndex} Created fulltext index.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return FulltextIndex.fromObject(json.def.fulltextIndex);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return FulltextIndex.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build fulltext index from: ${json.id}`);
  }

  /**
   * Creates a fulltext index from an object containing needed properties.
   * Properties are 'columns', 'name', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {FulltextIndex} Resulting fulltext index.
   */
  static fromObject(json) {
    const fulltextIndex = new FulltextIndex();
    fulltextIndex.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) { fulltextIndex.name = json.name; }

    if (json.options.length) {
      fulltextIndex.options = IndexOptions.fromArray(json.options);
    }

    return fulltextIndex;
  }

  /**
   * FulltextIndex constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.name = undefined;

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

    if (utils.isDefined(this.name))    { json.name    = this.name; }
    if (utils.isDefined(this.options)) { json.options = this.options.toJSON(); }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {FulltextIndex} Clone.
   */
  clone() {
    const index = new FulltextIndex();

    index.columns = this.columns.map(c => c.clone());

    if (utils.isDefined(this.name))    { index.name    = this.name; }
    if (utils.isDefined(this.options)) { index.options = this.options.toJSON(); }

    return index;
  }

  /**
   * Drops a column from index.
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
   * fulltext index's index columns refer to.
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
   * Whether the given table has all of this fultext index's columns.
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

module.exports = FulltextIndex;

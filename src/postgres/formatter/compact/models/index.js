/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');
const Table = require('./table');
const Column = require('./column');

const utils = require('../../../../shared/utils');

/**
 * Table index.
 */
class Index {

  /**
   * Creates an index from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {Index} Created index.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return Index.fromObject(json.def.index);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return Index.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build index from: ${json.id}`);
  }

  /**
   * Creates an index from an object containing needed properties.
   * Properties are 'columns', 'name', 'index', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {Index} Resulting index.
   */
  static fromObject(json) {
    const index = new Index();
    index.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) { index.name = json.name; }
    if (json.index) { index.indexType = json.index.def.toLowerCase(); }

    if (json.options.length) {
      index.options = IndexOptions.fromArray(json.options);
    }

    return index;
  }

  /**
   * Index constructor.
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
    const json = {
      columns: this.columns.map(c => c.toJSON())
    };

    if (utils.isDefined(this.options)) { json.options = this.options.toJSON(); }
    if (utils.isDefined(this.indexType)) { json.indexType = this.indexType; }
    if (utils.isDefined(this.name)) { json.name = this.name; }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {Index} Clone.
   */
  clone() {
    const index = new Index();

    index.columns = this.columns.map(c => c.clone());

    if (utils.isDefined(this.options)) { index.options = this.options.clone(); }
    if (utils.isDefined(this.indexType)) { index.indexType = this.indexType; }
    if (utils.isDefined(this.name)) { index.name = this.name; }

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
   * index's index columns refer to.
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
   * Whether the given table has all of this index's columns.
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

module.exports = Index;

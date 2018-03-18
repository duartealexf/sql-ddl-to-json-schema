/* eslint no-unused-vars: 0 */
const Table = require('../table');

/**
 * Formatter for P_CREATE_TABLE rule's parsed JSON.
 */
class CreateTable {

  /**
   * CreateTable constructor.
   */
  constructor() {

    /**
     * @type {Table[]}
     */
    this.tables = [];
  }

  /**
   * Creates a table and add it to the array.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_CREATE_TABLE') {
      throw new TypeError(`Expected P_CREATE_TABLE rule to be handled but received ${json.id}`);
    }

    json = json.def;

    if (json.id === 'P_CREATE_TABLE_COMMON') {
      this.tables.push(
        Table.fromCommonDef(json)
      );
    }
    else if (json.id === 'P_CREATE_TABLE_LIKE') {
      this.tables.push(
        Table.fromAlikeDef(json, this.tables)
      );
    }
  }
}

module.exports = CreateTable;

/* eslint no-unused-vars: 0 */
const Table = require('../table');
const Database = require('../database');

/**
 * Formatter for P_DROP_INDEX rule's parsed JSON.
 */
class DropIndex {

  /**
   * DropIndex constructor.
   */
  constructor() {

    /**
     * @type {Database}
     */
    this.database = undefined;
  }

  /**
   * Get table with given name.
   *
   * @param {string} name Table name.
   * @returns {Table} Table result.
   */
  getTable(name) {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param {Database} database Database instance.
   * @returns {void}
   */
  setDatabase(database) {
    this.database = database;
  }

  /**
   * Drops one of the indexes in a table.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_DROP_INDEX') {
      throw new TypeError(`Expected P_DROP_INDEX rule to be handled but received ${json.id}`);
    }

    const table = this.getTable(json.def.table);

    if (!table) {
      // throw new Error(`Found "DROP INDEX" statement for an unexisting table ${json.def.table}`);
      return;
    }

    const index = table.getIndex(json.def.index);

    if (!index) {
      // throw new Error(`Found "DROP INDEX" statement for an unexisting index ${json.def.index} in table ${json.def.table}`);
      return;
    }

    table.dropIndex(index);
  }
}

module.exports = DropIndex;

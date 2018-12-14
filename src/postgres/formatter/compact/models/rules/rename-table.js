/* eslint no-unused-vars: 0 */
const Table = require('../table');
const Database = require('../database');

/**
 * Formatter for P_RENAME_TABLE rule's parsed JSON.
 */
class RenameTable {

  /**
   * RenameTable constructor.
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
   * Get tables from database.
   *
   * @returns {Table[]} Database tables.
   */
  getTables() {
    return this.database.getTables();
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
   * Renames one of the tables.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_RENAME_TABLE') {
      throw new TypeError(`Expected P_RENAME_TABLE rule to be handled but received ${json.id}`);
    }

    const table = this.getTables().find(t => t.name === json.def.table);

    if (!table) {
      return;
    }

    table.renameTo(json.def.newName);
  }
}

module.exports = RenameTable;

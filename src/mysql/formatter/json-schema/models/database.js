/* eslint no-unused-vars: 0 */
const Table = require('./table');

const utils = require('../../../../shared/utils');

/**
 * Database, which contains array of tables in compact format.
 */
class Database {

  /**
   * Database constructor.
   */
  constructor() {

    /**
     * Tables array in compact JSON format.
     * @type {any[]}
     */
    this.compactJsonTables = [];

    /**
     * Table models array after parsed.
     * @type {Table[]}
     */
    this.tables = [];
  }

  /**
   * Getter for tables.
   *
   * @returns {Table[]} Table models.
   */
  getTables() {
    return this.tables;
  }

  /**
   * Setter for tables.
   *
   * @param {Table[]} tables Table models.
   * @returns {void}
   */
  setTables(tables) {
    this.tables = tables;
  }

  /**
   * Get table with given name.
   *
   * @param {string} name Table name.
   * @returns {Table} Table result.
   */
  getTable(name) {
    return this.tables.find(t => t.name === name);
  }

  /**
   * Pushes a table to database.
   *
   * @param {Table} table Table to be added.
   * @returns {void}
   */
  pushTable(table) {

    /**
     * Do not add table with same name.
     */
    if (this.tables.some(t => t.name === table.name)) {
      return;
    }

    this.tables.push(table);
  }

  /**
   * Build JSON Schema from compact JSON format.
   *
   * @param {any[]} tables Tables array in compact JSON format.
   * @returns {void}
   */
  parseCompactJson(tables) {
    this.setTables(tables.map(table => {
      const instance = Table.fromCompactJson(table);
      return instance;
    }));
  }
}

module.exports = Database;

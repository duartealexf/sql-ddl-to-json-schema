/* eslint no-unused-vars: 0 */
const Table = require('../table');
const Database = require('../database');

/**
 * Formatter for P_CREATE_TABLE rule's parsed JSON.
 */
class CreateTable {

  /**
   * CreateTable constructor.
   */
  constructor() {

    /**
     * @type {Database}
     */
    this.database = undefined;
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
      const table = Table.fromCommonDef(json, this.database);

      if (table) {
        this.pushTable(table);
      }
    }
    else if (json.id === 'P_CREATE_TABLE_LIKE') {
      const table = Table.fromAlikeDef(json, this.getTables());

      /**
       * Through tests it is noticed that foreign keys are
       * not kept on duplicated table - duartealexf.
       */
      table.foreignKeys = [];

      if (table) {
        this.pushTable(table);
      }
    }
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
   * Pushes a table to database.
   *
   * @param {Table} table Table to be added.
   * @returns {void}
   */
  pushTable(table) {
    this.database.pushTable(table);
  }
}

module.exports = CreateTable;

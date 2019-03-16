/* eslint no-unused-vars: 0 */
const Table = require('./table');
const Column = require('./column');
const CreateTable = require('./rules/create-table');
const CreateIndex = require('./rules/create-index');
const AlterTable = require('./rules/alter-table');
const RenameTable = require('./rules/rename-table');
const DropTable = require('./rules/drop-table');
const DropIndex = require('./rules/drop-index');

const utils = require('../../../../shared/utils');

/**
 * Database, which contains DDS array as its json.def.
 * It is a formatter for MAIN parser rule.
 */
class Database {

  /**
   * Main constructor.
   */
  constructor() {
    /**
     * @type {any[]}
     */
    this.ddsCollection = [];

    /**
     * @type {Table[]}
     */
    this.tables = [];
  }

  /**
   * Get tables from parsed DDS array.
   *
   * @returns {Table[]} Compact formatted tables.
   */
  getTables() {
    return this.tables;
  }

  /**
   * Setter for tables.
   *
   * @param {Table[]} tables Updated tables.
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
   * Build tables array from parsed DDL statements by sending them to
   * appropriate handlers, updating tables array after each statement.
   *
   * @param {any[]} ddsCollection DDS statements array.
   * @returns {void}
   */
  parseDdsCollection(ddsCollection) {
    this.ddsCollection = ddsCollection;

    this.ddsCollection.forEach(dds => {

      /**
       * Statements such as SET are supported by parser
       * but are ignored, returning null DDS.
       */
      if (!dds) {
        return;
      }

      const json = dds.def;
      let handler;

      if (json.id === 'P_CREATE_TABLE') {
        handler = new CreateTable();
      }

      else if (json.id === 'P_CREATE_INDEX') {
        handler = new CreateIndex();
      }

      else if (json.id === 'P_ALTER_TABLE') {
        handler = new AlterTable();
      }

      else if (json.id === 'P_RENAME_TABLE') {
        handler = new RenameTable();
      }

      else if (json.id === 'P_DROP_TABLE') {
        handler = new DropTable();
      }

      else if (json.id === 'P_DROP_INDEX') {
        handler = new DropIndex();
      }

      /**
       * There may be other handlers, which will not have
       * any effect over tables, and should be ignored.
       * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/41
       */
      if (!handler) {
        return;
      }

      handler.setDatabase(this);
      handler.handleDef(json);
    });
  }
}

module.exports = Database;

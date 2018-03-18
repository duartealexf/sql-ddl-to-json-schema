/* eslint no-unused-vars: 0 */
const Table         = require('./table');
const CreateTable   = require('./rules/create-table');
const CreateIndex   = require('./rules/create-index');
const AlterTable    = require('./rules/alter-table');
const RenameTable   = require('./rules/rename-table');
const DropTable     = require('./rules/drop-table');
const DropIndex     = require('./rules/drop-index');

const utils = require('../../../../shared/utils');

/**
 * Main rule formatter. Contains DDS array as its json.def.
 */
class Main {

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
   * @returns {Table[]} Compact format.
   */
  getTables() {
    return this.tables;
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
   * Build tables array from parsed DDL statements by sending them to
   * appropriate handlers, updating tables array after each statement.
   *
   * @param {any[]} ddsCollection DDS statements array.
   * @returns {void}
   */
  parseDdsCollection(ddsCollection) {
    this.ddsCollection = ddsCollection;

    this.ddsCollection.forEach(dds => {

      const json = dds.def;

      if (json.id === 'P_CREATE_TABLE') {
        const handler = new CreateTable();
        handler.tables = this.tables;
        handler.handleDef(json);
        this.tables = handler.tables;
      }

      else if (json.id === 'P_CREATE_INDEX') {
        const handler = new CreateIndex();
        handler.tables = this.tables;
        handler.handleDef(json);
        this.tables = handler.tables;
      }

      else if (json.id === 'P_ALTER_TABLE') {
        const handler = new AlterTable();
        handler.tables = this.tables;
        handler.handleDef(json);
        this.tables = handler.tables;
      }

      else if (json.id === 'P_RENAME_TABLE') {
        const handler = new RenameTable();
        handler.tables = this.tables;
        handler.handleDef(json);
        this.tables = handler.tables;
      }

      else if (json.id === 'P_DROP_TABLE') {
        const handler = new DropTable();
        handler.tables = this.tables;
        handler.handleDef(json);
        this.tables = handler.tables;
      }

      else if (json.id === 'P_DROP_INDEX') {
        const handler = new DropIndex();
        handler.tables = this.tables;
        handler.handleDef(json);
        this.tables = handler.tables;
      }
    });
  }
}

module.exports = Main;

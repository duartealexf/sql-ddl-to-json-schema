/* eslint no-unused-vars: 0 */
const Table = require('../table');
const Database = require('../database');

/**
 * Formatter for P_DROP_TABLE rule's parsed JSON.
 */
class DropTable {

  /**
   * DropTable constructor.
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
   * Drops one of the tables.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_DROP_TABLE') {
      throw new TypeError(`Expected P_DROP_TABLE rule to be handled but received ${json.id}`);
    }

    json.def.forEach(table => {
      table = this.getTable(table);

      let tables = this.database.getTables();

      const hasReference = tables.some(t =>
        t.foreignKeys.some(k => k.referencesTable(table))
      );

      if (hasReference) {
        return;
      }

      if (!table) {
        // throw new Error(`Found "DROP TABLE" statement for an unexisting table ${table}`);
        return;
      }

      const end = tables.splice(tables.indexOf(table));
      end.shift();
      tables = tables.concat(end);
      this.database.setTables(tables);
    });
  }
}

module.exports = DropTable;

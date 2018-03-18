/* eslint no-unused-vars: 0 */
const Table = require('../table');

/**
 * Formatter for P_DROP_TABLE rule's parsed JSON.
 */
class DropTable {

  /**
   * DropTable constructor.
   */
  constructor() {

    /**
     * @type {Table[]}
     */
    this.tables = [];
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

      if (!table) {
        // throw new Error(`Found "DROP TABLE" statement for an unexisting table ${table}`);
        return;
      }

      const end = this.tables.splice(this.tables.indexOf(table));
      end.shift();
      this.tables = this.tables.concat(end);
    });
  }
}

module.exports = DropTable;

/* eslint no-unused-vars: 0 */
const Table = require('../table');
const UniqueKey = require('../unique-key');
const FulltextIndex = require('../fulltext-index');
const SpatialIndex = require('../spatial-index');
const Index = require('../index');

/**
 * Formatter for P_CREATE_INDEX rule's parsed JSON.
 */
class CreateIndex {

  /**
   * CreateIndex constructor.
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
   * Creates an index and adds it to one of the tables.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_CREATE_INDEX') {
      throw new TypeError(`Expected P_CREATE_INDEX rule to be handled but received ${json.id}`);
    }

    const table = this.getTable(json.def.table);

    if (!table) {
      // throw new Error(`Found "CREATE INDEX" statement to an unexisting table ${json.def.table}`);
      return;
    }

    const type = json.def.type.toLowerCase();

    if (type.includes('unique')) {
      table.pushUniqueKey(
        UniqueKey.fromDef(json)
      );
    }
    else if (type.includes('fulltext')) {
      table.pushFulltextIndex(
        FulltextIndex.fromDef(json)
      );
    }
    else if (type.includes('spatial')) {
      table.pushSpatialIndex(
        SpatialIndex.fromDef(json)
      );
    }
    else {
      table.pushIndex(
        Index.fromDef(json)
      );
    }
  }
}

module.exports = CreateIndex;

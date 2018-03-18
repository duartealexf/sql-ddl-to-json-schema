const Column = require('./column');
const FulltextIndex = require('./fulltext-index');
const SpatialIndex = require('./spatial-index');
const PrimaryKey = require('./primary-key');
const ForeignKey = require('./foreign-key');
const UniqueKey = require('./unique-key');
const Index = require('./index');
const TableOptions = require('./table-options');

const utils = require('../../../../shared/utils');

/**
 * Class to represent a table as parsed from SQL.
 * TODO: create method to duplicate table, for 'CREATE TABLE LIKE', remove json prop.
 */
class Table {

  /**
   * Creates a table from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {Table} Created table.
   */
  static fromCommonDef(json) {
    if (json.id === 'P_CREATE_TABLE_COMMON') {

      json = json.def;

      const table = new Table();
      table.json = json;
      table.name = json.table;

      if (json.tableOptions) {
        table.options = TableOptions.fromDef(json.tableOptions);
      }

      const P_CREATE_TABLE_CREATE_DEFINITIONS = json.columnsDef.def;

      P_CREATE_TABLE_CREATE_DEFINITIONS.forEach(O_CREATE_TABLE_CREATE_DEFINITION => {

        /**
         * If table create definition is about adding a column.
         */
        if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.column)) {
          const column = Column.fromDef(O_CREATE_TABLE_CREATE_DEFINITION);
          table.columns.push(column);

          /** @type {PrimaryKey} */
          const primaryKey = column.extractPrimaryKey();

          /** @type {ForeignKey} */
          const foreignKey = column.extractForeignKey();

          /** @type {UniqueKey} */
          const uniqueKey = column.extractUniqueKey();

          if (primaryKey) {
            table.primaryKey = primaryKey;
          }

          if (foreignKey) {
            table.pushForeignKey(foreignKey);
          }

          if (uniqueKey) {
            table.pushUniqueKey(uniqueKey);
          }
        }

        /**
         * If table create definition is about adding a fulltext index.
         */
        else if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.fulltextIndex)) {
          table.pushFulltextIndex(
            FulltextIndex.fromDef(O_CREATE_TABLE_CREATE_DEFINITION)
          );
        }

        /**
         * If table create definition is about adding a spatial index.
         */
        else if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.spatialIndex)) {
          table.pushSpatialIndex(
            SpatialIndex.fromDef(O_CREATE_TABLE_CREATE_DEFINITION)
          );
        }

        /**
         * If table create definition is about adding a foreign key.
         */
        else if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.foreignKey)) {
          table.pushForeignKey(
            ForeignKey.fromDef(O_CREATE_TABLE_CREATE_DEFINITION)
          );
        }

        /**
         * If table create definition is about adding an unique key.
         */
        else if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.uniqueKey)) {
          table.pushUniqueKey(
            UniqueKey.fromDef(O_CREATE_TABLE_CREATE_DEFINITION)
          );
        }

        /**
         * If table create definition is about adding a primary key.
         */
        else if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.primaryKey)) {
          table.primaryKey = PrimaryKey.fromDef(O_CREATE_TABLE_CREATE_DEFINITION);
        }

        /**
         * If table create definition is about adding an index.
         */
        else if (utils.isDefined(O_CREATE_TABLE_CREATE_DEFINITION.def.index)) {
          table.pushIndex(
            Index.fromDef(O_CREATE_TABLE_CREATE_DEFINITION)
          );
        }
      });

      return table;
    }
  }

  /**
   * Creates a table from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @param {Table[]} tables Already existing tables.
   * @returns {Table} Created table.
   */
  static fromAlikeDef(json, tables) {
    if (json.id === 'P_CREATE_TABLE_LIKE') {
      json = json.def;

      if (!tables) {
        tables = [];
      }

      const alikeTable = tables.find(t => t.name === json.like);

      if (alikeTable) {
        // throw new Error(`Trying to "CREATE TABLE LIKE" unexisting table ${json.like}.`);
        return;
      }

      const table = Table.fromCommonDef(alikeTable.json);
      return table;
    }

    throw new TypeError(`Unknown json id to build table from: ${json.id}`);
  }

  /**
   * Table constructor.
   */
  constructor() {

    /**
     * JSON from parsed SQL that originated this model.
     */
    this.json = undefined;

    /**
     * Table name.
     * @type {string}
     */
    this.name = undefined;

    /**
     * Table columns.
     * @type {Column[]}
     */
    this.columns = [];

    /**
     * Table options.
     * @type {TableOptions}
     */
    this.options = undefined;

    /**
     * Fulltext indexes.
     * @type {FulltextIndex[]}
     */
    this.fulltextIndexes = [];

    /**
     * Spatial indexes.
     * @type {SpatialIndex[]}
     */
    this.spatialIndexes = [];

    /**
     * Foreign keys.
     * @type {ForeignKey[]}
     */
    this.foreignKeys = [];

    /**
     * Unique keys.
     * @type {UniqueKey[]}
     */
    this.uniqueKeys = [];

    /**
     * Indexes.
     * @type {Index[]}
     */
    this.indexes = [];

    /**
     * Primary key.
     * @type {PrimaryKey}
     */
    this.primaryKey = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {
      name: this.name,
      columns: this.columns.map(c => c.toJSON())
    };

    if (utils.isDefined(this.primaryKey)) { json.primaryKey      = this.primaryKey.toJSON(); }
    if (this.foreignKeys.length)          { json.foreignKeys     = this.foreignKeys.map(k => k.toJSON()); }
    if (this.uniqueKeys.length)           { json.uniqueKeys      = this.uniqueKeys.map(k => k.toJSON()); }
    if (this.indexes.length)              { json.indexes         = this.indexes.map(i => i.toJSON()); }
    if (this.spatialIndexes.length)       { json.spatialIndexes  = this.spatialIndexes.map(i => i.toJSON()); }
    if (this.fulltextIndexes.length)      { json.fulltextIndexes = this.fulltextIndexes.map(i => i.toJSON()); }
    if (utils.isDefined(this.options))    { json.options         = this.options.toJSON(); }

    return json;
  }

  /**
   * Add a column to columns array, in a given position.
   *
   * @param {Column} column Column to be added.
   * @param {any} position Position object.
   * @returns {void}
   */
  addColumn(column, position) {
    if (position === null) {
      this.columns.push(column);
    }
    else if (position.after === null) {
      this.columns.unshift(column);
    }
    else {
      const refColumn = this.columns.find(c => c.name === position.after);

      if (!refColumn) {
        // throw new Error(`Trying to add a column ${column.name} to table ${this.name} after unexisting column ${position.after}`);
        return;
      }

      const pos = this.columns.indexOf(refColumn);
      const end = this.columns.splice(pos + 1);
      this.columns.push(column);
      this.columns = this.columns.concat(end);
    }
  }

  /**
   * Move a column to a given position.
   *
   * @param {Column} column One of this table colu
   * @param {*} position Position object.
   * @returns {void}
   */
  moveColumn(column, position) {
    if (position && position.after) {
      const refColumn = this.columns.find(c => c.name === position.after);
      if (!refColumn) {
        return;
      }
    }

    this.dropColumn(column);
    this.addColumn(column, position);
  }

  /**
   * Drops table's primary key.
   *
   * @returns {void}
   */
  dropPrimaryKey() {
    delete this.primaryKey;
  }

  /**
   * Drops a column from table.
   *
   * @param {Column} column Column to be dropped.
   * @returns {void}
   */
  dropColumn(column) {
    const pos = this.columns.indexOf(column);
    const end = this.columns.splice(pos);
    end.shift();
    this.columns = this.columns.concat(end);
  }

  /**
   * Drops an index from table.
   *
   * @param {UniqueKey|Index|FulltextIndex|SpatialIndex} index Index to be dropped.
   * @returns {void}
   */
  dropIndex(index) {
    const type = this.getIndexType(index.name);
    const pos = this[type].indexOf(index);
    const end = this[type].splice(pos);
    end.shift();
    this[type] = this[type].concat(end);
  }

  /**
   * Drops a foreign key from table.
   *
   * @param {ForeignKey} foreignKey Foreign key to be dropped.
   * @returns {void}
   */
  dropForeignKey(foreignKey) {
    const pos = this.foreignKeys.indexOf(foreignKey);
    const end = this.foreignKeys.splice(pos);
    end.shift();
    this.foreignKeys = this.foreignKeys.concat(end);
  }

  /**
   * Get index by name.
   *
   * @param {string} name Index name.
   * @returns {UniqueKey|Index|FulltextIndex|SpatialIndex} Found index.
   */
  getIndex(name) {
    const type = this.getIndexType(name);

    if (!type) {
      // throw new Error(`Trying to reference an unexsisting index ${name} on table ${this.name}`);
      return;
    }

    return this[type].find(i => i.name === name);
  }

  /**
   * Get which index array is storing a given index.
   *
   * @param {string} name Index name.
   * @returns {string} Index type.
   */
  getIndexType(name) {
    const type = [
      'uniqueKeys',
      'indexes',
      'fulltextIndexes',
      'spatialIndexes'
    ].find(array => {
      return this[array].some(i => i.name === name);
    });

    return type;
  }

  /**
   * Get column by name.
   *
   * @param {string} name Column name.
   * @returns {Column} Column found.
   */
  getColumn(name) {
    return this.columns.find(c => c.name === name);
  }

  /**
   * Get foreign key by name.
   *
   * @param {string} symbol Foreign key name.
   * @returns {ForeignKey} Foreign key found.
   */
  getForeignKey(symbol) {
    return this.foreignKeys.find(k => k.symbol === symbol);
  }

  /**
   * Push a fulltext index to fulltextIndexes array.
   *
   * @param {FulltextIndex} fulltextIndex Index to be pushed.
   * @returns {void}
   */
  pushFulltextIndex(fulltextIndex) {
    this.fulltextIndexes.push(fulltextIndex);
  }

  /**
   * Push a spatial index to spatialIndexes array.
   *
   * @param {SpatialIndex} spatialIndex Index to be pushed.
   * @returns {void}
   */
  pushSpatialIndex(spatialIndex) {
    this.spatialIndexes.push(spatialIndex);
  }

  /**
   * Push an unique key to uniqueKeys array.
   *
   * @param {UniqueKey} uniqueKey UniqueKey to be pushed.
   * @returns {void}
   */
  pushUniqueKey(uniqueKey) {
    this.uniqueKeys.push(uniqueKey);
  }

  /**
   * Push a foreign key to foreignKeys array.
   *
   * @param {ForeignKey} foreignKey ForeignKey to be pushed.
   * @returns {void}
   */
  pushForeignKey(foreignKey) {
    this.foreignKeys.push(foreignKey);
  }

  /**
   * Push an index to indexes array.
   *
   * @param {Index} index Index to be pushed.
   * @returns {void}
   */
  pushIndex(index) {
    this.indexes.push(index);
  }
}

module.exports = Table;

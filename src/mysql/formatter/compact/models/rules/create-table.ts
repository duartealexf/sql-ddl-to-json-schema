/**
 * Formatter for P_CREATE_TABLE rule's parsed JSON.
 */
class CreateTable {
  database: Database;

  /**
   * Creates a table and add it to the array.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: any): void {
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
   * @param name Table name.
   */
  getTable(name: any): Table {
    return this.database.getTable(name);
  }

  /**
   * Get tables from database.
   */
  getTables(): Table[] {
    return this.database.getTables();
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: Database) {
    this.database = database;
  }

  /**
   * Pushes a table to database.
   *
   * @param table Table to be added.
   */
  pushTable(table: Table) {
    this.database.pushTable(table);
  }
}

module.exports = CreateTable;

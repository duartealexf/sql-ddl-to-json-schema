import { TableInterface } from '../../../../typings';

import { Table } from './table';

/**
 * Database, which contains array of tables in compact format.
 */
export class Database {
  /**
   * Tables array in compact JSON format.
   */
  compactJsonTables: TableInterface[] = [];

  /**
   * Table models after parsed.
   */
  tables: Table[] = [];

  /**
   * Getter for tables.
   */
  getTables(): Table[] {
    return this.tables;
  }

  /**
   * Setter for tables.
   *
   * @param tables Table models.
   */
  setTables(tables: Table[]): void {
    this.tables = tables;
  }

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): Table | undefined {
    return this.tables.find((t) => t.name === name);
  }

  /**
   * Pushes a table to database.
   *
   * @param table Table to be added.
   */
  pushTable(table: Table): void {
    /**
     * Do not add table with same name.
     */
    if (this.tables.some((t) => t.name === table.name)) {
      return;
    }

    this.tables.push(table);
  }

  /**
   * Build JSON Schema from compact JSON format.
   *
   * @param tables Tables array in compact JSON format.
   */
  parseCompactJson(tables: TableInterface[]): void {
    this.setTables(tables.map((table) => Table.fromCompactJson(table)));
  }
}

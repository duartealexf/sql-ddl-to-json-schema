import { P_CREATE_TABLE } from '../../../../../typings';

import { Table } from '../table';
import { DatabaseModelInterface, TableModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_CREATE_TABLE rule's parsed JSON.
 */
export class CreateTable implements RuleHandler {
  database!: DatabaseModelInterface;

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): TableModelInterface | null {
    return this.database.getTable(name);
  }

  /**
   * Get tables from database.
   */
  getTables(): TableModelInterface[] {
    return this.database.getTables();
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: DatabaseModelInterface): void {
    this.database = database;
  }

  /**
   * Pushes a table to database.
   *
   * @param table Table to be added.
   */
  pushTable(table: TableModelInterface): void {
    this.database.pushTable(table);
  }

  /**
   * Creates a table and add it to the array.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: P_CREATE_TABLE): void {
    if (json.id === 'P_CREATE_TABLE') {
      const def = json.def;

      if (def.id === 'P_CREATE_TABLE_COMMON') {
        const table = Table.fromCommonDef(def, this.database);

        if (table) {
          this.pushTable(table);
        }
      } else if (def.id === 'P_CREATE_TABLE_LIKE') {
        const table = Table.fromAlikeDef(def, this.getTables());

        if (!table) {
          return;
        }

        /**
         * Through tests it is noticed that foreign keys are
         * not kept on duplicated table ~ duartealexf.
         */
        table.foreignKeys = [];

        if (table) {
          this.pushTable(table);
        }
      }

      return;
    }

    throw new TypeError(`Expected P_CREATE_TABLE rule to be handled but received ${json.id}`);
  }
}

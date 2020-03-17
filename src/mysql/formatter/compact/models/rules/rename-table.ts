import { P_RENAME_TABLE } from '@mysql/compiled/typings';

import { DatabaseModelInterface, TableModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_RENAME_TABLE rule's parsed JSON.
 */
export class RenameTable implements RuleHandler {
  database!: DatabaseModelInterface;

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): TableModelInterface | undefined {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: DatabaseModelInterface) {
    this.database = database;
  }

  /**
   * Get tables from database.
   */
  getTables(): ModelInterface[] {
    return this.database.getTables();
  }

  /**
   * Renames one of the tables.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: P_RENAME_TABLE) {
    if (json.id !== 'P_RENAME_TABLE') {
      throw new TypeError(`Expected P_RENAME_TABLE rule to be handled but received ${json.id}`);
    }

    json.def.forEach((def) => {
      const table = this.getTables().find((t) => t.name === def.table);

      if (!table) {
        return;
      }

      table.renameTo(def.newName);
    });
  }
}

import { P_DROP_INDEX } from '../../../../../typings';

import { DatabaseModelInterface, TableModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_DROP_INDEX rule's parsed JSON.
 */
export class DropIndex implements RuleHandler {
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
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: DatabaseModelInterface): void {
    this.database = database;
  }

  /**
   * Drops one of the indexes in a table.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: P_DROP_INDEX): void {
    if (json.id === 'P_DROP_INDEX') {
      const table = this.getTable(json.def.table);

      if (!table) {
        // throw new Error(`Found "DROP INDEX" statement for an unexisting table ${json.def.table}`);
        return;
      }

      const index = table.getIndexByName(json.def.index);

      if (!index) {
        // throw new Error(`Found "DROP INDEX" statement for an
        // unexisting index ${json.def.index} in table ${json.def.table}`);
        return;
      }

      table.dropIndexByInstance(index);

      return;
    }

    throw new TypeError(`Expected P_DROP_INDEX rule to be handled but received ${json.id}`);
  }
}

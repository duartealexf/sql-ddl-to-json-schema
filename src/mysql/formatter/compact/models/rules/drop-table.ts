import { P_DROP_TABLE } from '../../../../../typings';

import { DatabaseModelInterface, TableModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_DROP_TABLE rule's parsed JSON.
 */
export class DropTable implements RuleHandler {
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
   * Drops one of the tables.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: P_DROP_TABLE): void {
    if (json.id === 'P_DROP_TABLE') {
      json.def.forEach((tableName) => {
        const table = this.getTable(tableName);

        if (!table) {
          return;
        }

        let tables = this.database.getTables();

        const hasReference = tables.some((t) => t.foreignKeys?.some((k) => k.referencesTable(table)));

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

      return;
    }

    throw new TypeError(`Expected P_DROP_TABLE rule to be handled but received ${json.id}`);
  }
}

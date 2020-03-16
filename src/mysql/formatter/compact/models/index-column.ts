import { isDefined } from '@shared/utils';
import { IndexColumnInterface, ClonableInterface, SerializableInterface } from './typings';
import { P_INDEX_COLUMN } from '@mysql/compiled/typings';

/**
 * Index specification of a column.
 */
export class IndexColumn implements IndexColumnInterface, ClonableInterface, SerializableInterface {
  column?: string;
  length?: number;
  sort?: string;

  /**
   * Creates an index column from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: P_INDEX_COLUMN): IndexColumn {
    if (json.id !== 'P_INDEX_COLUMN') {
      throw new TypeError(`Unknown json id to build index column from: ${json.id}`);
    }

    return IndexColumn.fromObject(json.def);
  }

  /**
   * Creates an index column from an object containing needed properties.
   *
   * @param json Object containing properties.
   */
  static fromObject(json: P_INDEX_COLUMN['def']) {
    const indexColumn = new IndexColumn();

    indexColumn.column = json.column;

    if (json.length) {
      indexColumn.length = json.length;
    }
    if (json.sort) {
      indexColumn.sort = json.sort;
    }

    return indexColumn;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): IndexColumnInterface {
    const json: IndexColumnInterface = {
      column: this.column,
    };

    if (isDefined(this.length)) {
      json.length = this.length;
    }
    if (isDefined(this.sort)) {
      json.sort = this.sort;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): IndexColumn {
    const indexColumn = new IndexColumn();

    indexColumn.column = this.column;

    if (isDefined(this.length)) {
      indexColumn.length = this.length;
    }
    if (isDefined(this.sort)) {
      indexColumn.sort = this.sort;
    }

    return indexColumn;
  }
}

import { O_INDEX_OPTION, IndexOptionsInterface } from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import {
  IndexOptionsModelInterface,
} from './typings';

/**
 * Table index options.
 */
export class IndexOptions implements IndexOptionsModelInterface {
  keyBlockSize?: number;

  indexType?: string;

  parser?: string;

  comment?: string;

  algorithm?: string;

  lock?: string;

  /**
   * Creates index options instance from an array of options.
   *
   * @param options JSON format parsed from SQL.
   */
  static fromArray(options: O_INDEX_OPTION[]): IndexOptions {
    const indexOptions = new IndexOptions();

    options.forEach((option) => {
      if (isDefined(option.def.comment)) {
        indexOptions.comment = option.def.comment.toLowerCase();
      }
      if (isDefined(option.def.indexType)) {
        indexOptions.indexType = option.def.indexType.def.toLowerCase();
      }
      if (isDefined(option.def.keyBlockSize)) {
        indexOptions.keyBlockSize = option.def.keyBlockSize;
      }
      if (isDefined(option.def.parser)) {
        indexOptions.parser = option.def.parser.toLowerCase();
      }
    });

    return indexOptions;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): IndexOptionsInterface {
    const json: IndexOptionsInterface = {};

    if (isDefined(this.keyBlockSize)) {
      json.keyBlockSize = this.keyBlockSize;
    }
    if (isDefined(this.indexType)) {
      json.indexType = this.indexType;
    }
    if (isDefined(this.algorithm)) {
      json.algorithm = this.algorithm;
    }
    if (isDefined(this.comment)) {
      json.comment = this.comment;
    }
    if (isDefined(this.parser)) {
      json.parser = this.parser;
    }
    if (isDefined(this.lock)) {
      json.lock = this.lock;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): IndexOptions {
    const options = new IndexOptions();

    if (isDefined(this.keyBlockSize)) {
      options.keyBlockSize = this.keyBlockSize;
    }
    if (isDefined(this.indexType)) {
      options.indexType = this.indexType;
    }
    if (isDefined(this.algorithm)) {
      options.algorithm = this.algorithm;
    }
    if (isDefined(this.comment)) {
      options.comment = this.comment;
    }
    if (isDefined(this.parser)) {
      options.parser = this.parser;
    }
    if (isDefined(this.lock)) {
      options.lock = this.lock;
    }

    return options;
  }
}

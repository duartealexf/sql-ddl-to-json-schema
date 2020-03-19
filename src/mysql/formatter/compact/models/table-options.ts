import { TableOptionsInterface, P_CREATE_TABLE_OPTIONS, O_CREATE_TABLE_OPTION } from '../../../../typings';
import { isString, isDefined } from '../../../../shared/utils';

import {
  TableOptionsModelInterface,
} from './typings';

/**
 * Class to represent table options as parsed from SQL.
 */
export class TableOptions implements TableOptionsModelInterface {
  autoincrement?: number;

  avgRowLength?: number;

  charset?: string;

  checksum?: number;

  collation?: string;

  comment?: string;

  compression?: string;

  connection?: string;

  dataDirectory?: string;

  indexDirectory?: string;

  delayKeyWrite?: number;

  encryption?: string;

  encryptionKeyId?: number;

  ietfQuotes?: string;

  engine?: string;

  insertMethod?: string;

  keyBlockSize?: number;

  maxRows?: number;

  minRows?: number;

  packKeys?: string | number;

  pageChecksum?: number;

  password?: string;

  rowFormat?: string;

  statsAutoRecalc?: string | number;

  statsPersistent?: string | number;

  statsSamplePages?: string | number;

  transactional?: number;

  withSystemVersioning?: boolean;

  tablespaceName?: string;

  tablespaceStorage?: string;

  union?: string[];

  /**
   * Creates table options from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: P_CREATE_TABLE_OPTIONS): TableOptions {
    if (json.id === 'P_CREATE_TABLE_OPTIONS') {
      return TableOptions.fromArray(json.def);
    }

    throw new TypeError(`Unknown json id to build table options from: ${json.id}`);
  }

  /**
   * Creates table options instance from an array of options.
   *
   * @param options JSON format parsed from SQL.
   */
  static fromArray(options: O_CREATE_TABLE_OPTION[]): TableOptions {
    const tableOptions = new TableOptions();

    options.forEach((option) => {
      if (isDefined(option.def.autoincrement)) {
        tableOptions.autoincrement = option.def.autoincrement;
      }
      if (isDefined(option.def.avgRowLength)) {
        tableOptions.avgRowLength = option.def.avgRowLength;
      }
      if (isDefined(option.def.charset)) {
        tableOptions.charset = option.def.charset.toLowerCase();
      }
      if (isDefined(option.def.checksum)) {
        tableOptions.checksum = option.def.checksum;
      }
      if (isDefined(option.def.collation)) {
        tableOptions.collation = option.def.collation.toLowerCase();
      }
      if (isDefined(option.def.comment)) {
        tableOptions.comment = option.def.comment;
      }
      if (isDefined(option.def.compression)) {
        tableOptions.compression = option.def.compression.toLowerCase();
      }
      if (isDefined(option.def.connection)) {
        tableOptions.connection = option.def.connection;
      }
      if (isDefined(option.def.dataDirectory)) {
        tableOptions.dataDirectory = option.def.dataDirectory;
      }
      if (isDefined(option.def.indexDirectory)) {
        tableOptions.indexDirectory = option.def.indexDirectory;
      }
      if (isDefined(option.def.delayKeyWrite)) {
        tableOptions.delayKeyWrite = option.def.delayKeyWrite;
      }
      if (isDefined(option.def.encryption)) {
        tableOptions.encryption = option.def.encryption.toLowerCase();
      }
      if (isDefined(option.def.encryptionKeyId)) {
        tableOptions.encryptionKeyId = option.def.encryptionKeyId;
      }
      if (isDefined(option.def.ietfQuotes)) {
        tableOptions.ietfQuotes = option.def.ietfQuotes.toLowerCase();
      }
      if (isDefined(option.def.engine)) {
        tableOptions.engine = option.def.engine;
      }
      if (isDefined(option.def.insertMethod)) {
        tableOptions.insertMethod = option.def.insertMethod.toLowerCase();
      }
      if (isDefined(option.def.keyBlockSize)) {
        tableOptions.keyBlockSize = option.def.keyBlockSize;
      }
      if (isDefined(option.def.maxRows)) {
        tableOptions.maxRows = option.def.maxRows;
      }
      if (isDefined(option.def.minRows)) {
        tableOptions.minRows = option.def.minRows;
      }
      if (isDefined(option.def.packKeys)) {
        if (isString(option.def.packKeys)) {
          tableOptions.packKeys = option.def.packKeys.toLowerCase();
        } else {
          tableOptions.packKeys = option.def.packKeys;
        }
      }
      if (isDefined(option.def.pageChecksum)) {
        tableOptions.pageChecksum = option.def.pageChecksum;
      }
      if (isDefined(option.def.password)) {
        tableOptions.password = option.def.password;
      }
      if (isDefined(option.def.rowFormat)) {
        tableOptions.rowFormat = option.def.rowFormat.toLowerCase();
      }
      if (isDefined(option.def.statsAutoRecalc)) {
        if (isString(option.def.statsAutoRecalc)) {
          tableOptions.statsAutoRecalc = option.def.statsAutoRecalc.toLowerCase();
        } else {
          tableOptions.statsAutoRecalc = option.def.statsAutoRecalc;
        }
      }
      if (isDefined(option.def.statsPersistent)) {
        if (isString(option.def.statsPersistent)) {
          tableOptions.statsPersistent = option.def.statsPersistent.toLowerCase();
        } else {
          tableOptions.statsPersistent = option.def.statsPersistent;
        }
      }
      if (isDefined(option.def.statsSamplePages)) {
        tableOptions.statsSamplePages = option.def.statsSamplePages.toLowerCase();
      }
      if (isDefined(option.def.transactional)) {
        tableOptions.transactional = option.def.transactional;
      }
      if (isDefined(option.def.withSystemVersioning)) {
        tableOptions.withSystemVersioning = option.def.withSystemVersioning;
      }
      if (isDefined(option.def.tablespaceName)) {
        tableOptions.tablespaceName = option.def.tablespaceName;
      }
      if (isDefined(option.def.tablespaceStorage)) {
        tableOptions.tablespaceStorage = option.def.tablespaceStorage.toLowerCase();
      }
      if (isDefined(option.def.union)) {
        tableOptions.union = option.def.union;
      }
    });

    return tableOptions;
  }

  /**
   * JSON casting of this object calls this method.
   *
   */
  toJSON(): TableOptionsInterface {
    const json: TableOptionsInterface = {};

    if (isDefined(this.autoincrement)) {
      json.autoincrement = this.autoincrement;
    }
    if (isDefined(this.avgRowLength)) {
      json.avgRowLength = this.avgRowLength;
    }
    if (isDefined(this.charset)) {
      json.charset = this.charset;
    }
    if (isDefined(this.checksum)) {
      json.checksum = this.checksum;
    }
    if (isDefined(this.collation)) {
      json.collation = this.collation;
    }
    if (isDefined(this.comment)) {
      json.comment = this.comment;
    }
    if (isDefined(this.compression)) {
      json.compression = this.compression;
    }
    if (isDefined(this.connection)) {
      json.connection = this.connection;
    }
    if (isDefined(this.dataDirectory)) {
      json.dataDirectory = this.dataDirectory;
    }
    if (isDefined(this.indexDirectory)) {
      json.indexDirectory = this.indexDirectory;
    }
    if (isDefined(this.delayKeyWrite)) {
      json.delayKeyWrite = this.delayKeyWrite;
    }
    if (isDefined(this.encryption)) {
      json.encryption = this.encryption;
    }
    if (isDefined(this.encryptionKeyId)) {
      json.encryptionKeyId = this.encryptionKeyId;
    }
    if (isDefined(this.ietfQuotes)) {
      json.ietfQuotes = this.ietfQuotes;
    }
    if (isDefined(this.engine)) {
      json.engine = this.engine;
    }
    if (isDefined(this.insertMethod)) {
      json.insertMethod = this.insertMethod;
    }
    if (isDefined(this.keyBlockSize)) {
      json.keyBlockSize = this.keyBlockSize;
    }
    if (isDefined(this.maxRows)) {
      json.maxRows = this.maxRows;
    }
    if (isDefined(this.minRows)) {
      json.minRows = this.minRows;
    }
    if (isDefined(this.packKeys)) {
      json.packKeys = this.packKeys;
    }
    if (isDefined(this.pageChecksum)) {
      json.pageChecksum = this.pageChecksum;
    }
    if (isDefined(this.password)) {
      json.password = this.password;
    }
    if (isDefined(this.rowFormat)) {
      json.rowFormat = this.rowFormat;
    }
    if (isDefined(this.statsAutoRecalc)) {
      json.statsAutoRecalc = this.statsAutoRecalc;
    }
    if (isDefined(this.statsPersistent)) {
      json.statsPersistent = this.statsPersistent;
    }
    if (isDefined(this.statsSamplePages)) {
      json.statsSamplePages = this.statsSamplePages;
    }
    if (isDefined(this.transactional)) {
      json.transactional = this.transactional;
    }
    if (isDefined(this.withSystemVersioning)) {
      json.withSystemVersioning = this.withSystemVersioning;
    }
    if (isDefined(this.tablespaceName)) {
      json.tablespaceName = this.tablespaceName;
    }
    if (isDefined(this.tablespaceStorage)) {
      json.tablespaceStorage = this.tablespaceStorage;
    }
    if (isDefined(this.union)) {
      json.union = this.union;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): TableOptions {
    const options = new TableOptions();

    if (isDefined(this.autoincrement)) {
      options.autoincrement = this.autoincrement;
    }
    if (isDefined(this.avgRowLength)) {
      options.avgRowLength = this.avgRowLength;
    }
    if (isDefined(this.charset)) {
      options.charset = this.charset;
    }
    if (isDefined(this.checksum)) {
      options.checksum = this.checksum;
    }
    if (isDefined(this.collation)) {
      options.collation = this.collation;
    }
    if (isDefined(this.comment)) {
      options.comment = this.comment;
    }
    if (isDefined(this.compression)) {
      options.compression = this.compression;
    }
    if (isDefined(this.connection)) {
      options.connection = this.connection;
    }
    if (isDefined(this.dataDirectory)) {
      options.dataDirectory = this.dataDirectory;
    }
    if (isDefined(this.indexDirectory)) {
      options.indexDirectory = this.indexDirectory;
    }
    if (isDefined(this.delayKeyWrite)) {
      options.delayKeyWrite = this.delayKeyWrite;
    }
    if (isDefined(this.encryption)) {
      options.encryption = this.encryption;
    }
    if (isDefined(this.encryptionKeyId)) {
      options.encryptionKeyId = this.encryptionKeyId;
    }
    if (isDefined(this.ietfQuotes)) {
      options.ietfQuotes = this.ietfQuotes;
    }
    if (isDefined(this.engine)) {
      options.engine = this.engine;
    }
    if (isDefined(this.insertMethod)) {
      options.insertMethod = this.insertMethod;
    }
    if (isDefined(this.keyBlockSize)) {
      options.keyBlockSize = this.keyBlockSize;
    }
    if (isDefined(this.maxRows)) {
      options.maxRows = this.maxRows;
    }
    if (isDefined(this.minRows)) {
      options.minRows = this.minRows;
    }
    if (isDefined(this.packKeys)) {
      options.packKeys = this.packKeys;
    }
    if (isDefined(this.pageChecksum)) {
      options.pageChecksum = this.pageChecksum;
    }
    if (isDefined(this.password)) {
      options.password = this.password;
    }
    if (isDefined(this.rowFormat)) {
      options.rowFormat = this.rowFormat;
    }
    if (isDefined(this.statsAutoRecalc)) {
      options.statsAutoRecalc = this.statsAutoRecalc;
    }
    if (isDefined(this.statsPersistent)) {
      options.statsPersistent = this.statsPersistent;
    }
    if (isDefined(this.statsSamplePages)) {
      options.statsSamplePages = this.statsSamplePages;
    }
    if (isDefined(this.transactional)) {
      options.transactional = this.transactional;
    }
    if (isDefined(this.withSystemVersioning)) {
      options.withSystemVersioning = this.withSystemVersioning;
    }
    if (isDefined(this.tablespaceName)) {
      options.tablespaceName = this.tablespaceName;
    }
    if (isDefined(this.tablespaceStorage)) {
      options.tablespaceStorage = this.tablespaceStorage;
    }
    if (isDefined(this.union)) {
      options.union = this.union.slice();
    }

    return options;
  }

  /**
   * Merge this option instance with another one.
   * Common properties of this instance are overwritten.
   */
  mergeWith(options: TableOptionsInterface): void {
    if (isDefined(options.autoincrement)) {
      this.autoincrement = options.autoincrement;
    }
    if (isDefined(options.avgRowLength)) {
      this.avgRowLength = options.avgRowLength;
    }
    if (isDefined(options.charset)) {
      this.charset = options.charset;
    }
    if (isDefined(options.checksum)) {
      this.checksum = options.checksum;
    }
    if (isDefined(options.collation)) {
      this.collation = options.collation;
    }
    if (isDefined(options.comment)) {
      this.comment = options.comment;
    }
    if (isDefined(options.compression)) {
      this.compression = options.compression;
    }
    if (isDefined(options.connection)) {
      this.connection = options.connection;
    }
    if (isDefined(options.dataDirectory)) {
      this.dataDirectory = options.dataDirectory;
    }
    if (isDefined(options.indexDirectory)) {
      this.indexDirectory = options.indexDirectory;
    }
    if (isDefined(options.delayKeyWrite)) {
      this.delayKeyWrite = options.delayKeyWrite;
    }
    if (isDefined(options.encryption)) {
      this.encryption = options.encryption;
    }
    if (isDefined(options.encryptionKeyId)) {
      this.encryptionKeyId = options.encryptionKeyId;
    }
    if (isDefined(options.ietfQuotes)) {
      this.ietfQuotes = options.ietfQuotes;
    }
    if (isDefined(options.engine)) {
      this.engine = options.engine;
    }
    if (isDefined(options.insertMethod)) {
      this.insertMethod = options.insertMethod;
    }
    if (isDefined(options.keyBlockSize)) {
      this.keyBlockSize = options.keyBlockSize;
    }
    if (isDefined(options.maxRows)) {
      this.maxRows = options.maxRows;
    }
    if (isDefined(options.minRows)) {
      this.minRows = options.minRows;
    }
    if (isDefined(options.packKeys)) {
      this.packKeys = options.packKeys;
    }
    if (isDefined(options.pageChecksum)) {
      this.pageChecksum = options.pageChecksum;
    }
    if (isDefined(options.password)) {
      this.password = options.password;
    }
    if (isDefined(options.rowFormat)) {
      this.rowFormat = options.rowFormat;
    }
    if (isDefined(options.statsAutoRecalc)) {
      this.statsAutoRecalc = options.statsAutoRecalc;
    }
    if (isDefined(options.statsPersistent)) {
      this.statsPersistent = options.statsPersistent;
    }
    if (isDefined(options.statsSamplePages)) {
      this.statsSamplePages = options.statsSamplePages;
    }
    if (isDefined(options.transactional)) {
      this.transactional = options.transactional;
    }
    if (isDefined(options.withSystemVersioning)) {
      this.withSystemVersioning = options.withSystemVersioning;
    }
    if (isDefined(options.tablespaceName)) {
      this.tablespaceName = options.tablespaceName;
    }
    if (isDefined(options.tablespaceStorage)) {
      this.tablespaceStorage = options.tablespaceStorage;
    }
    if (isDefined(options.union)) {
      this.union = options.union.slice();
    }
  }
}

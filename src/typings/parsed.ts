/* eslint-disable @typescript-eslint/class-name-casing */

export type P_ALTER_TABLE_ACTION =
  | 'addColumn'
  | 'addColumns'
  | 'addIndex'
  | 'addPrimaryKey'
  | 'addUniqueKey'
  | 'addFulltextIndex'
  | 'addSpatialIndex'
  | 'addForeignKey'
  | 'setDefaultColumnValue'
  | 'dropDefaultColumnValue'
  | 'changeColumn'
  | 'dropColumn'
  | 'dropIndex'
  | 'dropPrimaryKey'
  | 'dropForeignKey'
  | 'renameIndex'
  | 'rename';

export interface STATEMENT {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  def: any;
}

export interface P_MAIN {
  id: 'MAIN';
  def: P_DDS[];
}

export interface P_DDS {
  id: 'P_DDS';
  def:
    | P_CREATE_DB
    | P_CREATE_TABLE
    | P_CREATE_INDEX
    | P_ALTER_DB
    | P_ALTER_TABLE
    | P_DROP_DB
    | P_DROP_TABLE
    | P_DROP_INDEX
    | P_RENAME_TABLE
    | P_SET
    | P_USE_DB;
}

export interface P_CREATE_DB {
  id: 'P_CREATE_DB';
  def: {
    database: string;
    meta?: O_CREATE_DB_SPEC[];
  };
}

export interface P_CREATE_TABLE {
  id: 'P_CREATE_TABLE';
  def: P_CREATE_TABLE_COMMON | P_CREATE_TABLE_LIKE;
}

export interface P_CREATE_INDEX {
  id: 'P_CREATE_INDEX';
  def: {
    name: string;
    type: string;
    index?: P_INDEX_TYPE;
    table: string;
    columns: P_INDEX_COLUMN[];
    options: O_INDEX_OPTION[];
  };
}

export interface P_ALTER_DB {
  id: 'P_ALTER_DB';
  def: {
    database: string;
    meta: O_ALTER_DB_SPEC[];
  };
}

export interface P_ALTER_TABLE {
  id: 'P_ALTER_TABLE';
  def: {
    table: string;
    specs: P_ALTER_TABLE_SPECS[];
  };
}

export interface P_DROP_DB {
  id: 'P_DROP_DB';
  def: string;
}

export interface P_DROP_TABLE {
  id: 'P_DROP_TABLE';
  def: string[];
}

export interface P_DROP_INDEX {
  id: 'P_DROP_INDEX';
  def: {
    index: string;
    table: string;
    options: Array<P_LOCK_OPTION | P_INDEX_ALGORITHM_OPTION>;
  };
}

export interface P_RENAME_TABLE {
  id: 'P_RENAME_TABLE';
  def: {
    table: string;
    newName: string;
  }[];
}

export interface P_SET {
  id: 'P_SET';
  def: null;
}

export interface P_USE_DB {
  id: 'P_USE_DB';
  def: {
    database: string;
  };
}

export interface P_ALTER_TABLE_SPECS {
  id: 'P_ALTER_TABLE_SPECS';
  def: {
    tableOptions?: P_CREATE_TABLE_OPTIONS;
    spec?: O_ALTER_TABLE_SPEC;
  };
}

export interface P_CREATE_TABLE_OPTIONS {
  id: 'P_CREATE_TABLE_OPTIONS';
  def: O_CREATE_TABLE_OPTION[];
}

export interface P_COLUMN_REFERENCE {
  id: 'P_COLUMN_REFERENCE';
  def: {
    table: string;
    columns: P_INDEX_COLUMN[];
    match?: string;
    on: P_COLUMN_REFERENCE_ON[];
  };
}

export interface P_COLUMN_REFERENCE_ON {
  trigger: string;
  action: string;
}

export interface P_INDEX_TYPE {
  id: 'P_INDEX_TYPE';
  def: string;
}

export interface P_INDEX_COLUMN {
  id: 'P_INDEX_COLUMN';
  def: {
    column: string;
    length?: number;
    sort?: 'asc' | 'desc';
  };
}

export interface P_CREATE_TABLE_COMMON {
  id: 'P_CREATE_TABLE_COMMON';
  def: {
    table: string;
    columnsDef: P_CREATE_TABLE_CREATE_DEFINITIONS;
    tableOptions?: P_CREATE_TABLE_OPTIONS;
  };
}

export interface P_CREATE_TABLE_CREATE_DEFINITIONS {
  id: 'P_CREATE_TABLE_CREATE_DEFINITIONS';
  def: O_CREATE_TABLE_CREATE_DEFINITION[];
}

export interface P_CREATE_TABLE_LIKE {
  id: 'P_CREATE_TABLE_LIKE';
  def: {
    table: string;
    like: string;
  };
}

export interface P_INDEX_ALGORITHM_OPTION {
  id: 'P_INDEX_ALGORITHM_OPTION';
  def: {
    algorithm: string;
  };
}

export interface O_ALTER_DB_SPEC {
  id: 'O_ALTER_DB_SPEC';
  def: {
    charset?: string;
    collation?: string;
  };
}

export interface O_ALTER_TABLE_SPEC {
  id: 'O_ALTER_TABLE_SPEC';
  def:
    | O_ALTER_TABLE_SPEC_ADD_COLUMN
    | O_ALTER_TABLE_SPEC_ADD_COLUMNS
    | O_ALTER_TABLE_SPEC_ADD_INDEX
    | O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY
    | O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY
    | O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX
    | O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX
    | O_ALTER_TABLE_SPEC_ADD_FOREIGN_KEY
    | O_ALTER_TABLE_SPEC_CHANGE_ALGORITHM
    | O_ALTER_TABLE_SPEC_SET_DEFAULT_COLUMN_VALUE
    | O_ALTER_TABLE_SPEC_DROP_DEFAULT_COLUMN_VALUE
    | O_ALTER_TABLE_SPEC_CHANGE_COLUMN
    | O_ALTER_TABLE_SPEC_CONVERT_TO_CHARACTER_SET
    | O_ALTER_TABLE_SPEC_ENABLE_KEYS
    | O_ALTER_TABLE_SPEC_DISABLE_KEYS
    | O_ALTER_TABLE_SPEC_DISCARD_TABLESPACE
    | O_ALTER_TABLE_SPEC_IMPORT_TABLESPACE
    | O_ALTER_TABLE_SPEC_DROP_COLUMN
    | O_ALTER_TABLE_SPEC_DROP_INDEX
    | O_ALTER_TABLE_SPEC_DROP_PRIMARY_KEY
    | O_ALTER_TABLE_SPEC_DROP_FOREIGN_KEY
    | O_ALTER_TABLE_SPEC_FORCE
    | O_ALTER_TABLE_SPEC_CHANGE_LOCK
    | O_ALTER_TABLE_SPEC_ORDER_BY
    | O_ALTER_TABLE_SPEC_RENAME_INDEX
    | O_ALTER_TABLE_SPEC_RENAME
    | O_ALTER_TABLE_SPEC_WITH_VALIDATION
    | O_ALTER_TABLE_SPEC_WITHOUT_VALIDATION
    | O_ALTER_TABLE_SPEC_ADD_PERIOD_FOR_SYSTEM_TIME;
}

export type O_POSITION = {
  after?: string | null;
};

export interface O_ALTER_TABLE_SPEC_ADD_COLUMN {
  action: 'addColumn';
  name: string;
  datatype: O_DATATYPE;
  columnDefinition: O_COLUMN_DEFINITION[];
  position?: O_POSITION;
  reference: P_COLUMN_REFERENCE;
}

export interface O_ALTER_TABLE_SPEC_ADD_COLUMNS {
  action: 'addColumns';
  columns: O_ALTER_TABLE_SPEC_ADD_COLUMNS_COLUMN[];
}

export interface O_ALTER_TABLE_SPEC_ADD_COLUMNS_COLUMN {
  name: string;
  datatype: O_DATATYPE;
  columnDefinition: O_COLUMN_DEFINITION[];
  reference?: P_COLUMN_REFERENCE;
}

export interface O_ALTER_TABLE_SPEC_ADD_INDEX {
  action: 'addIndex';
  name: string;
  index?: P_INDEX_TYPE;
  columns: P_INDEX_COLUMN[];
  options?: O_INDEX_OPTION[];
}

export interface O_ALTER_TABLE_SPEC_ADD_PRIMARY_KEY {
  action: 'addPrimaryKey';
  name: string;
  index?: P_INDEX_TYPE;
  columns: P_INDEX_COLUMN[];
  options?: O_INDEX_OPTION[];
}

export interface O_ALTER_TABLE_SPEC_ADD_UNIQUE_KEY {
  action: 'addUniqueKey';
  name: string;
  index?: P_INDEX_TYPE;
  columns: P_INDEX_COLUMN[];
  options?: O_INDEX_OPTION[];
}

export interface O_ALTER_TABLE_SPEC_ADD_FULLTEXT_INDEX {
  action: 'addFulltextIndex';
  name: string;
  columns: P_INDEX_COLUMN[];
  options?: O_INDEX_OPTION[];
}

export interface O_ALTER_TABLE_SPEC_ADD_SPATIAL_INDEX {
  action: 'addSpatialIndex';
  name: string;
  columns: P_INDEX_COLUMN[];
  options?: O_INDEX_OPTION[];
}

export interface O_ALTER_TABLE_SPEC_ADD_FOREIGN_KEY {
  action: 'addForeignKey';
  name: string;
  columns: P_INDEX_COLUMN[];
  reference: P_COLUMN_REFERENCE;
}

export interface O_ALTER_TABLE_SPEC_CHANGE_ALGORITHM {
  action: 'changeAlgorithm';
  algorithm: string;
}

export interface O_ALTER_TABLE_SPEC_SET_DEFAULT_COLUMN_VALUE {
  action: 'setDefaultColumnValue';
  column: string;
  value: string | number;
}

export interface O_ALTER_TABLE_SPEC_DROP_DEFAULT_COLUMN_VALUE {
  action: 'dropDefaultColumnValue';
  column: string;
}

export interface O_ALTER_TABLE_SPEC_CHANGE_COLUMN {
  action: 'changeColumn';
  column: string;
  newName: string;
  datatype: O_DATATYPE;
  columnDefinition: O_COLUMN_DEFINITION[];
  position?: O_POSITION;
  reference: P_COLUMN_REFERENCE;
}

export interface O_ALTER_TABLE_SPEC_CONVERT_TO_CHARACTER_SET {
  action: 'convertToCharacterSet';
  charset: string;
  collate: string;
}

export interface O_ALTER_TABLE_SPEC_ENABLE_KEYS {
  action: 'enableKeys';
}

export interface O_ALTER_TABLE_SPEC_DISABLE_KEYS {
  action: 'disableKeys';
}

export interface O_ALTER_TABLE_SPEC_DISCARD_TABLESPACE {
  action: 'discardTablespace';
}

export interface O_ALTER_TABLE_SPEC_IMPORT_TABLESPACE {
  action: 'importTablespace';
}

export interface O_ALTER_TABLE_SPEC_DROP_COLUMN {
  action: 'dropColumn';
  column: string;
}

export interface O_ALTER_TABLE_SPEC_DROP_INDEX {
  action: 'dropIndex';
  index: string;
}

export interface O_ALTER_TABLE_SPEC_DROP_PRIMARY_KEY {
  action: 'dropPrimaryKey';
}

export interface O_ALTER_TABLE_SPEC_DROP_FOREIGN_KEY {
  action: 'dropForeignKey';
  key: string;
}

export interface O_ALTER_TABLE_SPEC_FORCE {
  action: 'force';
}

export interface O_ALTER_TABLE_SPEC_CHANGE_LOCK {
  action: 'changeLock';
  lock: string;
}

export interface O_ALTER_TABLE_SPEC_ORDER_BY {
  action: 'orderBy';
  columns: string[];
}

export interface O_ALTER_TABLE_SPEC_RENAME_INDEX {
  action: 'renameIndex';
  index: string;
  newName: string;
}

export interface O_ALTER_TABLE_SPEC_RENAME {
  action: 'rename';
  newName: string;
}

export interface O_ALTER_TABLE_SPEC_WITH_VALIDATION {
  action: 'withValidation';
}

export interface O_ALTER_TABLE_SPEC_WITHOUT_VALIDATION {
  action: 'withoutValidation';
}

export interface O_ALTER_TABLE_SPEC_ADD_PERIOD_FOR_SYSTEM_TIME {
  action: 'addPeriodForSystemTime';
  startColumnName: string;
  endColumnName: string;
}

export interface O_CREATE_TABLE_OPTION {
  id: 'O_CREATE_TABLE_OPTION';
  def: {
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
    packKeys?: number | string;
    pageChecksum?: number;
    password?: string;
    rowFormat?: string;
    statsAutoRecalc?: number | string;
    statsPersistent?: number | string;
    statsSamplePages?: number | string;
    transactional?: number;
    withSystemVersioning?: boolean;
    tablespaceName?: string;
    tablespaceStorage?: string;
    union?: string[];
  };
}

export interface O_DATATYPE {
  id: 'O_DATATYPE';
  def:
    | O_INTEGER_DATATYPE
    | O_FIXED_POINT_DATATYPE
    | O_FLOATING_POINT_DATATYPE
    | O_BIT_DATATYPE
    | O_BOOLEAN_DATATYPE
    | O_DATETIME_DATATYPE
    | O_YEAR_DATATYPE
    | O_VARIABLE_STRING_DATATYPE
    | O_FIXED_STRING_DATATYPE
    | O_ENUM_DATATYPE
    | O_SET_DATATYPE
    | O_SPATIAL_DATATYPE
    | O_JSON_DATATYPE;
}

export interface O_COLUMN_DEFINITION {
  id: 'O_COLUMN_DEFINITION';
  def: {
    unsigned?: boolean;
    zerofill?: boolean;
    charset?: string;
    collation?: string;
    nullable?: boolean;
    default?: number | string | boolean | null;
    autoincrement?: boolean;
    unique?: boolean;
    primary?: boolean;
    comment?: string;
    invisibleWithSystemVersioning?: boolean;
    invisibleWithoutSystemVersioning?: boolean;
    invisible?: boolean;
    format?: string;
    storage?: string;
    onUpdate?: string;
  };
}

export interface O_INDEX_OPTION {
  id: 'O_INDEX_OPTION';
  def: {
    keyBlockSize?: number;
    indexType?: P_INDEX_TYPE;
    parser?: string;
    comment?: string;
    algorithm?: string;
    lock?: string;
  };
}

export interface O_CREATE_DB_SPEC {
  id: 'O_CREATE_DB_SPEC';
  def: {
    charset?: string;
    collation?: string;
  };
}

export interface O_CREATE_TABLE_CREATE_DEFINITION {
  id: 'O_CREATE_TABLE_CREATE_DEFINITION';
  def: {
    column?: O_CREATE_TABLE_CREATE_DEFINITION_COLUMN;
    primaryKey?: O_CREATE_TABLE_CREATE_DEFINITION_PRIMARY_KEY;
    index?: O_CREATE_TABLE_CREATE_DEFINITION_INDEX;
    uniqueKey?: O_CREATE_TABLE_CREATE_DEFINITION_UNIQUE_KEY;
    fulltextIndex?: O_CREATE_TABLE_CREATE_DEFINITION_FULLTEXT_INDEX;
    spatialIndex?: O_CREATE_TABLE_CREATE_DEFINITION_SPATIAL_INDEX;
    foreignKey?: O_CREATE_TABLE_CREATE_DEFINITION_FOREIGN_KEY;
  };
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_COLUMN {
  name: string;
  def: {
    datatype: O_DATATYPE;
    columnDefinition: O_COLUMN_DEFINITION[];
    reference?: P_COLUMN_REFERENCE;
  };
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_PRIMARY_KEY {
  name: string;
  index?: P_INDEX_TYPE;
  columns: P_INDEX_COLUMN[];
  options: O_INDEX_OPTION[];
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_INDEX {
  name: string;
  index?: P_INDEX_TYPE;
  columns: P_INDEX_COLUMN[];
  options: O_INDEX_OPTION[];
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_UNIQUE_KEY {
  name: string;
  index?: P_INDEX_TYPE;
  columns: P_INDEX_COLUMN[];
  options: O_INDEX_OPTION[];
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_FULLTEXT_INDEX {
  name: string;
  columns: P_INDEX_COLUMN[];
  options: O_INDEX_OPTION[];
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_SPATIAL_INDEX {
  name: string;
  columns: P_INDEX_COLUMN[];
  options: O_INDEX_OPTION[];
}

export interface O_CREATE_TABLE_CREATE_DEFINITION_FOREIGN_KEY {
  name: string;
  columns: P_INDEX_COLUMN[];
  reference: P_COLUMN_REFERENCE;
}

export interface O_INTEGER_DATATYPE {
  id: 'O_INTEGER_DATATYPE';
  def: {
    datatype: string;
    width: number;
  };
}

export interface O_FIXED_POINT_DATATYPE {
  id: 'O_FIXED_POINT_DATATYPE';
  def: {
    datatype: string;
    digits: number;
    decimals: number;
  };
}

export interface O_FLOATING_POINT_DATATYPE {
  id: 'O_FLOATING_POINT_DATATYPE';
  def: {
    datatype: string;
    digits: number;
    decimals: number;
  };
}

export interface O_BIT_DATATYPE {
  id: 'O_BIT_DATATYPE';
  def: {
    datatype: string;
    length: number;
  };
}

export interface O_BOOLEAN_DATATYPE {
  id: 'O_BOOLEAN_DATATYPE';
  def: {
    datatype: string;
  };
}

export interface O_DATETIME_DATATYPE {
  id: 'O_DATETIME_DATATYPE';
  def: {
    datatype: string;
    fractional: number;
  };
}

export interface O_YEAR_DATATYPE {
  id: 'O_YEAR_DATATYPE';
  def: {
    datatype: string;
    digits: number;
  };
}

export interface O_VARIABLE_STRING_DATATYPE {
  id: 'O_VARIABLE_STRING_DATATYPE';
  def: {
    datatype: string;
    length: number;
  };
}

export interface O_FIXED_STRING_DATATYPE {
  id: 'O_FIXED_STRING_DATATYPE';
  def: {
    datatype: string;
    length: number;
  };
}

export interface O_ENUM_DATATYPE {
  id: 'O_ENUM_DATATYPE';
  def: {
    datatype: string;
    values: string[] | number[] | boolean[];
  };
}

export interface O_SET_DATATYPE {
  id: 'O_SET_DATATYPE';
  def: {
    datatype: string;
    values: string[] | number[] | boolean[];
  };
}

export interface O_SPATIAL_DATATYPE {
  id: 'O_SPATIAL_DATATYPE';
  def: {
    datatype: string;
  };
}

export interface O_JSON_DATATYPE {
  id: 'O_JSON_DATATYPE';
  def: {
    datatype: string;
  };
}

export interface P_LOCK_OPTION {
  id: 'P_LOCK_OPTION';
  def: {
    lock: string;
  };
}

import { stringArrayToMapping } from '../../../shared/utils';

/** =============================================================
 * List of keywords.
 * Includes function names.
 *
 * https://mariadb.com/kb/en/library/sql-language-structure/
 * https://mariadb.com/kb/en/string-functions/
 * https://mariadb.com/kb/en/date-time-functions/
 * https://mariadb.com/kb/en/aggregate-functions/
 * https://mariadb.com/kb/en/numeric-functions/
 * https://mariadb.com/kb/en/control-flow-functions/
 * https://mariadb.com/kb/en/library/function-and-operator-reference/
 *
 * Keywords are case insensitive and prepended with 'K_'.
 */
const keywords = stringArrayToMapping<RegExp>(
  [
    'STATS_SAMPLE_PAGES',
    'GEOMETRYCOLLECTION',
    'STATS_AUTO_RECALC',
    'ENCRYPTION_KEY_ID',
    'CURRENT_TIMESTAMP',
    'STATS_PERSISTENT',
    'UNIQUEIDENTIFIER',
    'DELAY_KEY_WRITE',
    'MULTILINESTRING',
    'LOCALTIMESTAMP',
    'AUTO_INCREMENT',
    'AVG_ROW_LENGTH',
    'UNIX_TIMESTAMP',
    'LAST_INSERT_ID',
    'KEY_BLOCK_SIZE',
    'COLUMN_FORMAT',
    'CONNECTION_ID',
    'PAGE_CHECKSUM',
    'TRANSACTIONAL',
    'UTC_TIMESTAMP',
    'INSERT_METHOD',
    'SESSION_USER',
    'MULTIPOLYGON',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_USER',
    'COMPRESSION',
    'IETF_QUOTES',
    'SYSTEM_TIME',
    'SYSTEM_USER',
    'VERSIONING',
    'MULTIPOINT',
    'LINESTRING',
    'CONNECTION',
    'MEDIUMBLOB',
    'COMPRESSED',
    'ENCRYPTION',
    'VALIDATION',
    'CONSTRAINT',
    'ROW_FORMAT',
    'UUID_SHORT',
    'FOUND_ROWS',
    'TABLESPACE',
    'REFERENCES',
    'MEDIUMTEXT',
    'VARBINARY',
    'TEMPORARY',
    'REDUNDANT',
    'EXCLUSIVE',
    'ROW_COUNT',
    'LOCALTIME',
    'MEDIUMINT',
    'TIMESTAMP',
    'DIRECTORY',
    'INVISIBLE',
    'PACK_KEYS',
    'ALGORITHM',
    'CHARACTER',
    'TINYBLOB',
    'UTC_TIME',
    'NATIONAL',
    'FULLTEXT',
    'GEOMETRY',
    'MAX_ROWS',
    'DATABASE',
    'LONGBLOB',
    'UNSIGNED',
    'TINYTEXT',
    'DATETIME',
    'MIN_ROWS',
    'ZEROFILL',
    'UTC_DATE',
    'PASSWORD',
    'CHECKSUM',
    'RESTRICT',
    'LONGTEXT',
    'SMALLINT',
    'NVARCHAR',
    'CONVERT',
    'SPATIAL',
    'INPLACE',
    'STORAGE',
    'SYSDATE',
    'FOREIGN',
    'TINYINT',
    'DYNAMIC',
    'DISCARD',
    'DISABLE',
    'DEFAULT',
    'DECIMAL',
    'CURTIME',
    'CURDATE',
    'INTEGER',
    'COMPACT',
    'COMMENT',
    'COLLATE',
    'REPLACE',
    'CHARSET',
    'CASCADE',
    'BOOLEAN',
    'NUMERIC',
    'OFFLINE',
    'PRIMARY',
    'POLYGON',
    'VARCHAR',
    'VERSION',
    'WITHOUT',
    'PARTIAL',
    'ENABLE',
    'MEMORY',
    'CREATE',
    'MODIFY',
    'DELETE',
    'ENGINE',
    'UPDATE',
    'BIGINT',
    'SYSTEM',
    'SIMPLE',
    'EXISTS',
    'RENAME',
    'BINARY',
    'NOWAIT',
    'IGNORE',
    'SHARED',
    'IMPORT',
    'ACTION',
    'ONLINE',
    'SCHEMA',
    'PERIOD',
    'UNIQUE',
    'DOUBLE',
    'CHANGE',
    'PARSER',
    'COLUMN',
    'INDEX',
    'FLOAT',
    'POINT',
    'ALTER',
    'ROUND',
    'NCHAR',
    'MATCH',
    'RTREE',
    'BTREE',
    'AFTER',
    'USING',
    'FORCE',
    'TABLE',
    'ORDER',
    'FIXED',
    'FIRST',
    'FALSE',
    'UNION',
    'UUID',
    'LOCK',
    'LIKE',
    'LAST',
    'KEYS',
    'CHAR',
    'JSON',
    'COPY',
    'WAIT',
    'NONE',
    'HASH',
    'FULL',
    'BLOB',
    'YEAR',
    'USER',
    'PAGE',
    'TEXT',
    'TIME',
    'RAND',
    'NULL',
    'BOOL',
    'ENUM',
    'DATA',
    'DROP',
    'TRUE',
    'WITH',
    'DISK',
    'DESC',
    'DATE',
    'ZLIB',
    'BIT',
    'YES',
    'INT',
    'KEY',
    'NOW',
    'SET',
    'ADD',
    'LZ4',
    'NOT',
    'FOR',
    'ASC',
    'USE',
    'AS',
    'NO',
    'BY',
    'ON',
    'OR',
    'IF',
    'PI',
    'TO',
  ],

  /*
   * Prepend K_ to keywords.
   */
  (str: string) => `K_${str}`,

  /*
   * Make case insensitive regexp from a keyword.
   * Example: WORD -> /[Ww][Oo][Rr][Dd]/
   */
  (str: string) =>
    new RegExp(
      `\\b${str.split('').reduce((acc: string, char: string) => {
        acc += `[${char.toUpperCase()}${char.toLowerCase()}]`;
        return acc;
      }, '')}\\b`,
    ),
);

export default keywords;

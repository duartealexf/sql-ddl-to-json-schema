/** =============================================================
 * List of keywords
 *
 * Keywords are case insensitive and prepended with 'K_'.
 */

const utils = require('../utils');

const keywords = utils.arrayToObject(
  [
    'CREATE',
    'RENAME',
    'ALTER',
    'DROP',
    'TEMPORARY',
    'TABLE',
    'DATABASE',
    'SCHEMA',
    'VIEW',
    'DEFAULT',
    'CHARACTER',
    'COLLATE',
    'IF',
    'NOT',
    'EXISTS',
    'INTEGER',
    'INT',
    'SMALLINT',
    'TINYINT',
    'MEDIUMINT',
    'BIGINT',
    'DECIMAL',
    'NUMERIC',
    'FLOAT',
    'DOUBLE',
    'BIT',
    'DATE',
    'TIME',
    'DATETIME',
    'TIMESTAMP',
    'YEAR',
    'CHAR',
    'VARCHAR',
    'BINARY',
    'VARBINARY',
    'TINYBLOB',
    'BLOB',
    'MEDIUMBLOB',
    'LONGBLOB',
    'TINYTEXT',
    'TEXT',
    'MEDIUMTEXT',
    'LONGTEXT',
    'ENUM',
    'SET',
    'GEOMETRY',
    'POINT',
    'LINESTRING',
    'POLYGON',
    'MULTIPOINT',
    'MULTILINESTRING',
    'MULTIPOLYGON',
    'GEOMETRYCOLLECTION',
    'JSON',
  ],

  /*
   * Prepend K_ to keywords.
   */
  string => `K_${string}`,

  /*
   * Make case insensitive regexp from a keyword.
   * Example: WORD -> /[Ww][Oo][Rr][Dd]/
   */
  string => new RegExp(
    string.split('')
      .reduce((str, char) => {
        str += `[${char.toUpperCase()}${char.toLowerCase()}]`;
        return str;
      }, '')
  )
);

module.exports = keywords;

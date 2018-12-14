# =============================================================
# SQL Parser
# Parses SQL into a JS structure that can
# later be transformed into JSON Schema.
#
# Syntax rules
# K_ -> KEYWORDS
# P_ -> PHRASES
# O_ -> OPTIONS
# S_ -> SYMBOLS

# =============================================================
# Lexer and rules loader

@{%
const moo = require('moo');

const utils = require('../../shared/utils');
const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = Object.assign({}, keywords, symbols);

const lexer = moo.compile(rules);
%}

@lexer lexer

# =============================================================
# Main parser rule (entrypoint).
# Data definition statements

# P_BLAH -> %S_COMMENT_LINE %WS

P_DDS -> (
  # _ %K_SET _
  _ P_SET               {% id %}
  # | _ %K_CREATE %WS %K_TABLE
  | _ P_CREATE_TABLE      {% id %}
  # P_COMMENTS          {% id %}
  # | P_CREATE_DB _     {% id %}
  # | P_CREATE_TABLE _  {% id %}
  # | P_CREATE_INDEX _  {% id %}
  # | P_ALTER_DB _      {% id %}
  # | P_ALTER_TABLE _   {% id %}
  # | P_DROP_DB _       {% id %}
  # | P_DROP_TABLE _    {% id %}
  # | P_DROP_INDEX _    {% id %}
  # | P_RENAME_TABLE _  {% id %}
  # | P_SET _           {% id %}  // TODO: This has problems
)
  {% d => {
    return {
      id: 'P_DDS',
      def: d[1]
    }
  }%}

# =============================================================
# A few shortcuts for whitespaces.

_ -> %WS:*
__ -> %WS:+

# _COMM -> %S_COMMENT _ %newline

# =============================================================
# End of statement

S_EOS -> _ %S_SEMICOLON

# =============================================================
# Valid options for charset and collations and engines.
#
# https://mariadb.com/kb/en/library/character-sets/
#
# I've tested different combinations of quotes and backticks to
# specify CHARSET and COLLATE, and all of them worked. - duartealexf

O_CHARSET ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}

O_COLLATION ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}

# =============================================================
# Valid ways to write an engine in MariaDB
#
# https://mariadb.com/kb/en/library/show-engine/

O_ENGINE ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}

# =============================================================
# Valid ways to set a default value for a column.

O_DEFAULT_VALUE ->
    %S_NUMBER             {% d => d[0].value %}
  | %S_BIT_FORMAT         {% d => d[0].value %}
  | %S_HEXA_FORMAT        {% d => d[0].value %}
  | S_IDENTIFIER ( %S_LPARENS _ %S_RPARENS {% () => "()" %} ):?
                          {% d => d[0] + (d[1] || '') %}
  | O_QUOTED_STRING       {% id %}

# =============================================================
# String with any of single or double quote.

O_QUOTED_STRING ->
    %S_DQUOTE_STRING      {% d => d[0].value %}
  | %S_SQUOTE_STRING      {% d => d[0].value %}

# =============================================================
# Valid ways to set a value for a table option

O_TABLE_OPTION_VALUE ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}
  | %S_NUMBER             {% d => d[0].value %}

# =============================================================
# Identifiers
#
# https://mariadb.com/kb/en/library/sql-language-structure/
#
# More or-rules will be appended to this rule during assembly. The
# or-rules are keywords, because in statements identifiers can be
# the same as keywords, but if we want to match a S_IDENTIFIER in
# a rule, and end up matching a keyword, we can use this as a
# fallback to consider it as an identifier. - duartealexf

S_IDENTIFIER ->
    %S_IDENTIFIER_QUOTED {% d => d[0].value %} | %S_IDENTIFIER_UNQUOTED {% d => d[0].value %}
# | all %K_ will be appended here, don't add anything after this line.
  | %K_TO {% d => d[0].value %} | %K_PI {% d => d[0].value %} | %K_IF {% d => d[0].value %} | %K_OR {% d => d[0].value %} | %K_ON {% d => d[0].value %} | %K_BY {% d => d[0].value %} | %K_NO {% d => d[0].value %} | %K_AS {% d => d[0].value %} | %K_ASC {% d => d[0].value %} | %K_FOR {% d => d[0].value %} | %K_NOT {% d => d[0].value %} | %K_LZ4 {% d => d[0].value %} | %K_ADD {% d => d[0].value %} | %K_SET {% d => d[0].value %} | %K_NOW {% d => d[0].value %} | %K_KEY {% d => d[0].value %} | %K_INT {% d => d[0].value %} | %K_YES {% d => d[0].value %} | %K_BIT {% d => d[0].value %} | %K_ZLIB {% d => d[0].value %} | %K_DATE {% d => d[0].value %} | %K_DESC {% d => d[0].value %} | %K_DISK {% d => d[0].value %} | %K_WITH {% d => d[0].value %} | %K_TRUE {% d => d[0].value %} | %K_DROP {% d => d[0].value %} | %K_DATA {% d => d[0].value %} | %K_ENUM {% d => d[0].value %} | %K_BOOL {% d => d[0].value %} | %K_NULL {% d => d[0].value %} | %K_RAND {% d => d[0].value %} | %K_TIME {% d => d[0].value %} | %K_TEXT {% d => d[0].value %} | %K_PAGE {% d => d[0].value %} | %K_USER {% d => d[0].value %} | %K_YEAR {% d => d[0].value %} | %K_BLOB {% d => d[0].value %} | %K_FULL {% d => d[0].value %} | %K_HASH {% d => d[0].value %} | %K_NONE {% d => d[0].value %} | %K_WAIT {% d => d[0].value %} | %K_COPY {% d => d[0].value %} | %K_JSON {% d => d[0].value %} | %K_CHAR {% d => d[0].value %} | %K_KEYS {% d => d[0].value %} | %K_LAST {% d => d[0].value %} | %K_LIKE {% d => d[0].value %} | %K_LOCK {% d => d[0].value %} | %K_UUID {% d => d[0].value %} | %K_UNION {% d => d[0].value %} | %K_FALSE {% d => d[0].value %} | %K_FIRST {% d => d[0].value %} | %K_FIXED {% d => d[0].value %} | %K_ORDER {% d => d[0].value %} | %K_TABLE {% d => d[0].value %} | %K_FORCE {% d => d[0].value %} | %K_USING {% d => d[0].value %} | %K_AFTER {% d => d[0].value %} | %K_BTREE {% d => d[0].value %} | %K_RTREE {% d => d[0].value %} | %K_MATCH {% d => d[0].value %} | %K_NCHAR {% d => d[0].value %} | %K_ROUND {% d => d[0].value %} | %K_ALTER {% d => d[0].value %} | %K_POINT {% d => d[0].value %} | %K_FLOAT {% d => d[0].value %} | %K_INDEX {% d => d[0].value %} | %K_COLUMN {% d => d[0].value %} | %K_PARSER {% d => d[0].value %} | %K_CHANGE {% d => d[0].value %} | %K_DOUBLE {% d => d[0].value %} | %K_UNIQUE {% d => d[0].value %} | %K_PERIOD {% d => d[0].value %} | %K_SCHEMA {% d => d[0].value %} | %K_ONLINE {% d => d[0].value %} | %K_ACTION {% d => d[0].value %} | %K_IMPORT {% d => d[0].value %} | %K_SHARED {% d => d[0].value %} | %K_IGNORE {% d => d[0].value %} | %K_NOWAIT {% d => d[0].value %} | %K_BINARY {% d => d[0].value %} | %K_RENAME {% d => d[0].value %} | %K_EXISTS {% d => d[0].value %} | %K_SIMPLE {% d => d[0].value %} | %K_SYSTEM {% d => d[0].value %} | %K_BIGINT {% d => d[0].value %} | %K_UPDATE {% d => d[0].value %} | %K_ENGINE {% d => d[0].value %} | %K_DELETE {% d => d[0].value %} | %K_MODIFY {% d => d[0].value %} | %K_CREATE {% d => d[0].value %} | %K_MEMORY {% d => d[0].value %} | %K_ENABLE {% d => d[0].value %} | %K_PARTIAL {% d => d[0].value %} | %K_WITHOUT {% d => d[0].value %} | %K_VERSION {% d => d[0].value %} | %K_ZONE {% d => d[0].value %} | %K_VARYING {% d => d[0].value %} | %K_VARCHAR {% d => d[0].value %} | %K_POLYGON {% d => d[0].value %} | %K_PRIMARY {% d => d[0].value %} | %K_OFFLINE {% d => d[0].value %} | %K_NUMERIC {% d => d[0].value %} | %K_BOOLEAN {% d => d[0].value %} | %K_CASCADE {% d => d[0].value %} | %K_CHARSET {% d => d[0].value %} | %K_REPLACE {% d => d[0].value %} | %K_COLLATE {% d => d[0].value %} | %K_COMMENT {% d => d[0].value %} | %K_COMPACT {% d => d[0].value %} | %K_INTEGER {% d => d[0].value %} | %K_CURDATE {% d => d[0].value %} | %K_CURTIME {% d => d[0].value %} | %K_DECIMAL {% d => d[0].value %} | %K_DEFAULT {% d => d[0].value %} | %K_DISABLE {% d => d[0].value %} | %K_DISCARD {% d => d[0].value %} | %K_DYNAMIC {% d => d[0].value %} | %K_TINYINT {% d => d[0].value %} | %K_FOREIGN {% d => d[0].value %} | %K_SYSDATE {% d => d[0].value %} | %K_STORAGE {% d => d[0].value %} | %K_INPLACE {% d => d[0].value %} | %K_SPATIAL {% d => d[0].value %} | %K_CONVERT {% d => d[0].value %} | %K_SMALLINT {% d => d[0].value %} | %K_LONGTEXT {% d => d[0].value %} | %K_RESTRICT {% d => d[0].value %} | %K_CHECKSUM {% d => d[0].value %} | %K_PASSWORD {% d => d[0].value %} | %K_UTC_DATE {% d => d[0].value %} | %K_ZEROFILL {% d => d[0].value %} | %K_MIN_ROWS {% d => d[0].value %} | %K_DATETIME {% d => d[0].value %} | %K_TINYTEXT {% d => d[0].value %} | %K_UNSIGNED {% d => d[0].value %} | %K_LONGBLOB {% d => d[0].value %} | %K_DATABASE {% d => d[0].value %} | %K_MAX_ROWS {% d => d[0].value %} | %K_GEOMETRY {% d => d[0].value %} | %K_FULLTEXT {% d => d[0].value %} | %K_NATIONAL {% d => d[0].value %} | %K_UTC_TIME {% d => d[0].value %} | %K_TINYBLOB {% d => d[0].value %} | %K_CHARACTER {% d => d[0].value %} | %K_ALGORITHM {% d => d[0].value %} | %K_PACK_KEYS {% d => d[0].value %} | %K_INVISIBLE {% d => d[0].value %} | %K_DIRECTORY {% d => d[0].value %} | %K_TIMESTAMP {% d => d[0].value %} | %K_MEDIUMINT {% d => d[0].value %} | %K_LOCALTIME {% d => d[0].value %} | %K_ROW_COUNT {% d => d[0].value %} | %K_EXCLUSIVE {% d => d[0].value %} | %K_REDUNDANT {% d => d[0].value %} | %K_TEMPORARY {% d => d[0].value %} | %K_VARBINARY {% d => d[0].value %} | %K_MEDIUMTEXT {% d => d[0].value %} | %K_REFERENCES {% d => d[0].value %} | %K_TABLESPACE {% d => d[0].value %} | %K_FOUND_ROWS {% d => d[0].value %} | %K_UUID_SHORT {% d => d[0].value %} | %K_ROW_FORMAT {% d => d[0].value %} | %K_CONSTRAINT {% d => d[0].value %} | %K_VALIDATION {% d => d[0].value %} | %K_ENCRYPTION {% d => d[0].value %} | %K_COMPRESSED {% d => d[0].value %} | %K_MEDIUMBLOB {% d => d[0].value %} | %K_CONNECTION {% d => d[0].value %} | %K_LINESTRING {% d => d[0].value %} | %K_MULTIPOINT {% d => d[0].value %} | %K_VERSIONING {% d => d[0].value %} | %K_SYSTEM_USER {% d => d[0].value %} | %K_SYSTEM_TIME {% d => d[0].value %} | %K_IETF_QUOTES {% d => d[0].value %} | %K_COMPRESSION {% d => d[0].value %} | %K_CURRENT_USER {% d => d[0].value %} | %K_CURRENT_TIME {% d => d[0].value %} | %K_CURRENT_DATE {% d => d[0].value %} | %K_MULTIPOLYGON {% d => d[0].value %} | %K_SESSION_USER {% d => d[0].value %} | %K_INSERT_METHOD {% d => d[0].value %} | %K_UTC_TIMESTAMP {% d => d[0].value %} | %K_TRANSACTIONAL {% d => d[0].value %} | %K_PAGE_CHECKSUM {% d => d[0].value %} | %K_CONNECTION_ID {% d => d[0].value %} | %K_COLUMN_FORMAT {% d => d[0].value %} | %K_KEY_BLOCK_SIZE {% d => d[0].value %} | %K_LAST_INSERT_ID {% d => d[0].value %} | %K_UNIX_TIMESTAMP {% d => d[0].value %} | %K_AVG_ROW_LENGTH {% d => d[0].value %} | %K_AUTO_INCREMENT {% d => d[0].value %} | %K_LOCALTIMESTAMP {% d => d[0].value %} | %K_MULTILINESTRING {% d => d[0].value %} | %K_DELAY_KEY_WRITE {% d => d[0].value %} | %K_STATS_PERSISTENT {% d => d[0].value %} | %K_CURRENT_TIMESTAMP {% d => d[0].value %} | %K_ENCRYPTION_KEY_ID {% d => d[0].value %} | %K_STATS_AUTO_RECALC {% d => d[0].value %} | %K_GEOMETRYCOLLECTION {% d => d[0].value %} | %K_STATS_SAMPLE_PAGES {% d => d[0].value %}

# =============================================================
# Alter database
#
# https://mariadb.com/kb/en/library/alter-database/

P_ALTER_DB ->
  %K_ALTER __ ( %K_DATABASE | %K_SCHEMA )
  ( __ S_IDENTIFIER {% d => d[1] %} ):?
  ( __ O_ALTER_DB_SPEC {% d => d[1] %} ):+ S_EOS
    {% d => {
      return {
        id: 'P_ALTER_DB',
        def: {
          database: d[3],
          meta: d[4]
        }
      }
    }%}

# =============================================================
# Create database spec

O_ALTER_DB_SPEC -> (
    ( %K_DEFAULT __ ):? ( %K_CHARACTER __ %K_SET | %K_CHARSET ) ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return {
          charset: d[3]
        }
      }%}
  | ( %K_DEFAULT __ ):? %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION
      {% d => {
        return {
          collation: d[3]
        }
      }%}
)
  {% d => {
    return {
      id: 'O_ALTER_DB_SPEC',
      def: d[0]
    }
  }%}
# =============================================================
# Alter table
#
# https://mariadb.com/kb/en/library/alter-table/

P_ALTER_TABLE -> %K_ALTER __
  ( %K_ONLINE __ ):?
  ( %K_IGNORE __ ):?
  %K_TABLE __ S_IDENTIFIER __
  ( %K_WAIT __ %S_NUMBER __ | %K_NOWAIT __ ):?
  P_ALTER_TABLE_SPECS ( _ %S_COMMA _ P_ALTER_TABLE_SPECS {% d => d[3] %} ):*
  S_EOS
    {% d => {
      return {
        id: 'P_ALTER_TABLE',
        def: {
          table: d[6],
          specs: [d[9]].concat(d[10])
        }
      }
    }%}

# =============================================================
# Alter table specifications
#
# In docs these options are 'alter_specification'.

P_ALTER_TABLE_SPECS -> (
    P_CREATE_TABLE_OPTIONS
      {% d => {
        return { tableOptions: d[0] }
      }%}
  | O_ALTER_TABLE_SPEC
      {% d => {
        return { spec: d[0] }
      }%}
)
    {% d => {
      return {
        id: 'P_ALTER_TABLE_SPECS',
        def: d[0]
      }
    }%}

# =============================================================
# Options for alter table spec.
#
# In docs these options are in 'alter_specification'.

O_ALTER_TABLE_SPEC -> (
    %K_ADD ( __ %K_COLUMN ):? __ S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        return {
          action: 'addColumn',
          name: d[3],
          datatype: d[5],
          columnDefinition: d[6] || [],
          position: d[7]
        }
      }%}

  | %K_ADD ( __ %K_COLUMN ):?
    _ %S_LPARENS _
    (
      S_IDENTIFIER __ O_DATATYPE ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
      (
        _ %S_COMMA _ S_IDENTIFIER __ O_DATATYPE ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
          {% d => {
            return {
              name: d[3],
              datatype: d[5],
              columnDefinition: d[6] || []
            }
          }%}
      ):*
        {% d => {
          return [
            {
              name: d[0],
              datatype: d[2],
              columnDefinition: d[3] || []
            }
          ].concat(d[4])
        }%}
    )
    _ %S_RPARENS
      {% d => {
        return {
          action: 'addColumns',
          columns: d[5]
        }
      }%}

  | %K_ADD __ ( %K_INDEX | %K_KEY )
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addIndex',
          name: d[3],
          index: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_PRIMARY __ %K_KEY
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addPrimaryKey',
          name: d[2],
          index: d[6],
          columns: [d[10]].concat(d[11] || []),
          options: d[14]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_UNIQUE
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[5] && ['index', 'key'].includes(d[5].toLowerCase())) {
          d[5] = null;
        }

        return {
          action: 'addUniqueKey',
            name: d[2],
            index: d[6],
            columns: [d[10]].concat(d[11] || []),
            options: d[14]
        }
      }%}

  | %K_ADD __ %K_FULLTEXT
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
          d[4] = null;
        }

        return {
          action: 'addFulltextIndex',
          name: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ %K_SPATIAL
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
          d[4] = null;
        }

        return {
          action: 'addSpatialIndex',
          name: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_FOREIGN __ %K_KEY
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    _ P_COLUMN_REFERENCE
      {% d => {
        return {
          action: 'addForeignKey',
          name: d[2],
          columns: [d[10]].concat(d[11] || []),
          reference: d[15]
        }
      }%}

  | %K_ALGORITHM ( __ | _ %S_EQUAL _ )
    ( %K_DEFAULT {% id %} | %K_INPLACE {% id %} | %K_COPY {% id %} )
      {% d => {
        return {
          action: 'changeAlgorithm',
          algorithm: d[2].value
        }
      }%}

  | %K_ALTER __ ( %K_COLUMN __ ):? S_IDENTIFIER __ %K_SET __ %K_DEFAULT __ O_DEFAULT_VALUE
      {% d => {
        return {
          action: 'setDefaultColumnValue',
          column: d[3],
          value: d[9]
        }
      }%}

  | %K_ALTER __ ( %K_COLUMN __ ):? S_IDENTIFIER __ %K_DROP __ %K_DEFAULT
      {% d => {
        return {
          action: 'dropDefaultColumnValue',
          column: d[3]
        }
      }%}

  | %K_CHANGE __ ( %K_COLUMN __ ):? S_IDENTIFIER __ S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        return {
          action: 'changeColumn',
          column: d[3],
          newName: d[5],
          datatype: d[7],
          columnDefinition: d[8],
          position: d[9]
        }
      }%}

  | %K_MODIFY __ ( %K_COLUMN __ ):? S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        return {
          action: 'changeColumn',
          column: d[3],
          newName: null,
          datatype: d[5],
          columnDefinition: d[6],
          position: d[7]
        }
      }%}

  | %K_CONVERT __ %K_TO __ ( %K_CHARACTER __ %K_SET | %K_CHARSET ) __ O_CHARSET
    ( __ %K_COLLATE __ O_COLLATION {% d => d[3] %} ):?
      {% d => {
        return {
          action: 'convertToCharacterSet',
          charset: d[6],
          collate: d[7]
        }
      }%}

  | %K_ENABLE __ %K_KEYS
      {% d => {
        return {
          action: 'enableKeys'
        }
      }%}

  | %K_DISABLE __ %K_KEYS
      {% d => {
        return {
          action: 'disableKeys'
        }
      }%}

  | %K_DISCARD __ %K_TABLESPACE
      {% d => {
        return {
          action: 'discardTablespace'
        }
      }%}

  | %K_IMPORT __ %K_TABLESPACE
      {% d => {
        return {
          action: 'importTablespace'
        }
      }%}

  | %K_DROP __ ( %K_COLUMN __ ):? ( %K_IF __ %K_EXISTS __ ):? S_IDENTIFIER
      {% d => {
        return {
          action: 'dropColumn',
          column: d[4]
        }
      }%}

  | %K_DROP __ ( %K_INDEX | %K_KEY ) __ S_IDENTIFIER
      {% d => {
        return {
          action: 'dropIndex',
          index: d[4]
        }
      }%}

  | %K_DROP __ %K_PRIMARY __ %K_KEY
      {% d => {
        return {
          action: 'dropPrimaryKey'
        }
      }%}

  | %K_DROP __ %K_FOREIGN __ %K_KEY __ S_IDENTIFIER
      {% d => {
        return {
          action: 'dropForeignKey',
          key: d[6]
        }
      }%}

  | %K_FORCE
      {% d => {
        return {
          action: 'force'
        }
      }%}

  | %K_LOCK ( __ | _ %S_EQUAL _ )
    ( %K_DEFAULT {% id %} | %K_NONE {% id %} | %K_SHARED {% id %} | %K_EXCLUSIVE {% id %} )
      {% d => {
        return {
          action: 'changeLock',
          lock: d[2].value
        }
      }%}

  | %K_ORDER __ %K_BY __ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER {% d => d[3] %} ):*
      {% d => {
        return {
          action: 'orderBy',
          columns: [d[4]].concat(d[5] || [])
        }
      }%}

  | %K_RENAME __ ( %K_INDEX | %K_KEY ) __ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
      {% d => {
        return {
          action: 'renameIndex',
          index: d[4],
          newName: d[8]
        }
      }%}

  | %K_RENAME __ ( %K_TO __ | %K_AS __ ):? S_IDENTIFIER
      {% d => {
        return {
          action: 'rename',
          newName: d[3]
        }
      }%}

  | %K_WITH __ %K_VALIDATION
      {% d => {
        return {
          action: 'withValidation'
        }
      }%}

  | %K_WITHOUT __ %K_VALIDATION
      {% d => {
        return {
          action: 'withoutValidation'
        }
      }%}

  | %K_ADD __ %K_PERIOD __ %K_FOR __ %K_SYSTEM_TIME
    _ %S_LPARENS _ S_IDENTIFIER _ %S_COMMA _ S_IDENTIFIER _ %S_RPARENS
      {% d => {
        return {
          action: 'addPeriodForSystemTime',
          startColumnName: d[10],
          endColumnName: d[14]
        }
      }%}
)
  {% d => {
    return {
      id: 'O_ALTER_TABLE_SPEC',
      def: d[0]
    }
  }%}
# =============================================================
# Comment statements are ignored by parser.
#

# P_COMMENTS -> %S_COMMENT_LINE _
#   {% d => {
#     return {
#       id: 'P_COMMENTS',
#       def: null
#     }
#   }%}
# =============================================================
# Create database
#
# https://mariadb.com/kb/en/library/create-database/

P_CREATE_DB ->
  %K_CREATE __
  ( %K_OR __ %K_REPLACE __ ):?
  ( %K_DATABASE | %K_SCHEMA )
  ( __ %K_IF ( __ %K_NOT ):? __ %K_EXISTS ):?
  __ S_IDENTIFIER
  ( __ O_CREATE_DB_SPEC {% d => d[1] %} ):* S_EOS
    {% d => {
      return {
        id: 'P_CREATE_DB',
        def: {
          database: d[6],
          meta: d[7]
        }
      }
    }%}

# =============================================================
# Create database spec

O_CREATE_DB_SPEC -> (
    ( %K_DEFAULT __ ):? ( %K_CHARACTER __ %K_SET | %K_CHARSET ) ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return {
          charset: d[3]
        }
      }%}
  | ( %K_DEFAULT __ ):? %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION
      {% d => {
        return {
          collation: d[3]
        }
      }%}
)
  {% d => {
    return {
      id: 'O_CREATE_DB_SPEC',
      def: d[0]
    }
  }%}
# =============================================================
# Create index
#
# https://mariadb.com/kb/en/library/create-index/

P_CREATE_INDEX ->
  %K_CREATE
  ( __ %K_OR __ %K_REPLACE ):?
  ( __ %K_ONLINE | __ %K_OFFLINE ):?
  (
      __ %K_UNIQUE                {% d => d[1] %}
    | __ %K_FULLTEXT              {% d => d[1] %}
    | __ %K_SPATIAL               {% d => d[1] %}
  ):?
  __ %K_INDEX
  ( __ %K_IF __ %K_NOT __ %K_EXISTS ):?
  __ S_IDENTIFIER
  ( __ P_INDEX_TYPE               {% d => d[1] %} ):?
  __ %K_ON __ S_IDENTIFIER
  (
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
      {% d => [d[3]].concat(d[4] || []) %}
  ):?
  ( _ %K_WAIT __ %S_NUMBER | _ %K_NOWAIT ):?
  ( _ O_INDEX_OPTION {% d => d[1] %} ):*
  (
      _ P_INDEX_ALGORITHM_OPTION  {% d => d[1] %}
    | _ P_LOCK_OPTION             {% d => d[1] %}
  ):*
  S_EOS
    {% d => {
      let type = d[3] ? (d[3].value + ' ') : '';
      type = type + d[5].value;

      return {
        id: 'P_CREATE_INDEX',
        def: {
          name: d[8],
          type,
          index: d[9],
          table: d[13],
          columns: d[14],
          options: (d[16] || []).concat(d[17] || [])
        }
      }
    }%}

# =============================================================
# Index column name, used to reference to foreign keys
#
# In docs this is the 'index_col_name'.

P_INDEX_COLUMN -> S_IDENTIFIER
  (
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3] %} ):?
    ( _ %K_ASC {% d => d[1] %} | _ %K_DESC {% d => d[1] %} ):?
      {% d => {
        return {
          length: d[0] ? d[0].value : null,
          sort: d[1] ? d[1].value : null
        }
      }%}
  ):?
    {% d => {
      return {
        id: 'P_INDEX_COLUMN',
        def: {
          column: d[0],
          length: d[1] && d[1].length ? d[1].length : null,
          sort: d[1] && d[1].sort ? d[1].sort : null
        }
      }
    }%}

# =============================================================
# Index type
#
# In docs this is the 'index_type'.

P_INDEX_TYPE -> %K_USING __ ( %K_BTREE {% id %} | %K_HASH {% id %} | %K_RTREE {% id %} )
  {% d => {
    return {
      id: 'P_INDEX_TYPE',
      def: d[2].value
    }
  }%}

# =============================================================
# Index option
#
# In docs this is the 'index_option'.

O_INDEX_OPTION -> (
    %K_KEY_BLOCK_SIZE ( __ | _ %S_EQUAL _ ) %S_NUMBER
    {% d => {
      return {
        keyBlockSize: d[2].value
      }
    }%}
  | P_INDEX_TYPE
    {% d => {
      return {
        indexType: d[0]
      }
    }%}
  | %K_WITH __ %K_PARSER __ S_IDENTIFIER
    {% d => {
      return {
        parser: d[4]
      }
    }%}
  | %K_COMMENT __ O_QUOTED_STRING
    {% d => {
      return {
        comment: d[2]
      }
    }%}
)
  {% d => {
    return {
      id: 'O_INDEX_OPTION',
      def: d[0]
    }
  }%}

# =============================================================
# Index algorithm option
#
# In docs this is the 'algorithm_option'.

P_INDEX_ALGORITHM_OPTION ->
  %K_ALGORITHM ( __ | _ %S_EQUAL _ )
  ( %K_DEFAULT {% id %} | %K_INPLACE {% id %} | %K_COPY {% id %} )
    {% d => {
      return {
        id: 'P_INDEX_ALGORITHM_OPTION',
        def: {
          algorithm: d[2].value
        }
      }
    }%}

# =============================================================
# Index lock option
#
# In docs this is the 'lock_option'.

P_LOCK_OPTION ->
  %K_LOCK ( __ | _ %S_EQUAL _ )
  ( %K_DEFAULT {% id %} | %K_NONE {% id %} | %K_SHARED {% id %} | %K_EXCLUSIVE {% id %} )
    {% d => {
      return {
        id: 'P_LOCK_OPTION',
        def: {
          lock: d[2].value
        }
      }
    }%}
# =============================================================
# Create table
#
# https://mariadb.com/kb/en/library/create-table/

P_CREATE_TABLE -> (
    P_CREATE_TABLE_COMMON   {% id %}
  # | P_CREATE_TABLE_LIKE     {% id %}  # TODO: Add this back in later
)
  {% d => {
    return {
      id: 'P_CREATE_TABLE',
      def: d[0]
    }
  }%}

# =============================================================
# Create common table spec

P_CREATE_TABLE_COMMON ->
    %K_CREATE 
    __ %K_TABLE
    __ ( S_IDENTIFIER %S_DOT):? # Can potentially capture db name
    S_IDENTIFIER _    # TODO: Don't know why previous db name has to be an identifier - not sure what impact will be to outputted json
    P_CREATE_TABLE_CREATE_DEFINITIONS
    ( _ P_CREATE_TABLE_OPTIONS {% d => d[1] %} ):?
    S_EOS
      {% d => {
        return {
          id: 'P_CREATE_TABLE_COMMON',
          def: {
            table: d[7],
            columnsDef: d[9],
            tableOptions: d[10]
          }
        }
      }%}

# =============================================================
# Create table like another one

P_CREATE_TABLE_LIKE ->
  %K_CREATE
  ( __ %K_OR __ %K_REPLACE ):?
  ( __ %K_TEMPORARY):?
  __ %K_TABLE
  ( __ %K_IF __ %K_NOT __ %K_EXISTS):?
  __ S_IDENTIFIER
  (
      __ %K_LIKE __ S_IDENTIFIER
        {% d => d[3] %}
    | _ %S_LPARENS _ %K_LIKE __ S_IDENTIFIER _ %S_RPARENS
        {% d => d[5] %}
  ) S_EOS
    {% d => {
      return {
        id: 'P_CREATE_TABLE_LIKE',
        def: {
          table: d[7],
          like: d[8]
        }
      }
    }%}

# =============================================================
# Create table spec - (wrapper for statements in parenthesis)
#
# In docs this is the '(create_definition,...)' part.

P_CREATE_TABLE_CREATE_DEFINITIONS ->
  %S_LPARENS _ (
    O_CREATE_TABLE_CREATE_DEFINITION ( _ %S_COMMA _ O_CREATE_TABLE_CREATE_DEFINITION {% d => d[3] %} ):*
      {% d => [d[0]].concat(d[1] || []) %}
  ) _ %S_RPARENS
    {% d => {
      return {
        id: 'P_CREATE_TABLE_CREATE_DEFINITIONS',
        def: d[2]
      }
    }%}

# =============================================================
# Create table definition options
#
# In docs these options are 'create_definition'.
#
# A space between the identifier and column definition
# is not required, as long as the identifier is
# enclosed in backticks. - duartealexf

O_CREATE_TABLE_CREATE_DEFINITION -> (
    S_IDENTIFIER _ (
      O_DATATYPE
      ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
        {% d => {
          return {
            datatype: d[0],
            columnDefinition: d[1] || []
          }
        }%}
    )
      {% d => {
        return {
          column: {
            name: d[0],
            def: d[2]
          }
        }
      }%}
  | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_PRIMARY __ %K_KEY
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          primaryKey: {
            name: d[0],
            index: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }
      }%}
  | ( %K_INDEX | %K_KEY )
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          index: {
            name: d[1],
            index: d[2],
            columns: [d[6]].concat(d[7] || []),
            options: d[10]
          }
        }
      }%}
  | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_UNIQUE
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[3] && ['index', 'key'].includes(d[3].toLowerCase())) {
          d[3] = null;
        }

        return {
          uniqueKey: {
            name: d[3],
            index: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }
      }%}
  | %K_FULLTEXT
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[2] && ['index', 'key'].includes(d[2].toLowerCase())) {
          d[2] = null;
        }

        return {
          fulltextIndex: {
            name: d[2],
            columns: [d[6]].concat(d[7] || []),
            options: d[10]
          }
        }
      }%}
  | %K_SPATIAL
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[2] && ['index', 'key'].includes(d[2].toLowerCase())) {
          d[2] = null;
        }

        return {
          spatialIndex: {
            name: d[2],
            columns: [d[6]].concat(d[7] || []),
            options: d[10]
          }
        }
      }%}
  | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_FOREIGN __ %K_KEY
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    _ P_COLUMN_REFERENCE
      {% d => {
        return {
          foreignKey: {
            name: d[0],
            columns: [d[8]].concat(d[9] || []),
            reference: d[13]
          }
        }
      }%}
)
  {% d => {
    return {
      id: 'O_CREATE_TABLE_CREATE_DEFINITION',
      def: d[0]
    }
  }%}

# =============================================================
# Column definition
#
# In docs these are the 'column_definition'.

O_COLUMN_DEFINITION -> (
    %K_UNSIGNED                           {% d => { return { unsigned: true }} %}
  | %K_ZEROFILL                           {% d => { return { zerofill: true }} %}
  | %K_CHARSET __ O_CHARSET               {% d => { return { charset: d[2] }} %}
  | %K_CHARACTER __ %K_SET __ O_CHARSET   {% d => { return { charset: d[4] }} %}
  | %K_COLLATE __ O_COLLATION             {% d => { return { collation: d[2] }} %}
  | %K_NOT __ %K_NULL                     {% d => { return { nullable: false }} %}
  | %K_NULL                               {% d => { return { nullable: true }} %}
  | %K_DEFAULT __ O_DEFAULT_VALUE         {% d => { return { default: d[2] }} %}
  | %K_AUTO_INCREMENT                     {% d => { return { autoincrement: true }} %}
  | %K_UNIQUE ( __ %K_KEY ):?             {% d => { return { unique: true }} %}
  | ( %K_PRIMARY __ ):? %K_KEY            {% d => { return { primary: true }} %}
  | %K_COMMENT __ O_QUOTED_STRING         {% d => { return { comment: d[2] }} %}
  | %K_INVISIBLE __ %K_WITH __
    %K_SYSTEM __ %K_VERSIONING            {% d => { return { invisibleWithSystemVersioning: true }} %}
  | %K_INVISIBLE __ %K_WITHOUT __
    %K_SYSTEM __ %K_VERSIONING            {% d => { return { invisibleWithoutSystemVersioning: true }} %}
  | %K_INVISIBLE                          {% d => { return { invisible: true }} %}
  | %K_COLUMN_FORMAT __ (
        %K_FIXED   {% id %}
      | %K_DYNAMIC {% id %}
      | %K_DEFAULT {% id %}
    )                                     {% d => { return { format: d[2].value }} %}
  | %K_STORAGE __ (
        %K_DISK {% id %}
      | %K_MEMORY {% id %}
      | %K_DEFAULT {% id %}
    )                                     {% d => { return { storage: d[2].value }} %}
  | P_COLUMN_REFERENCE                    {% d => { return { reference: d[0] }} %}
)
  {% d => {
    return {
      id: 'O_COLUMN_DEFINITION',
      def: d[0]
    }
  } %}

# =============================================================
# Reference to foreign keys

P_COLUMN_REFERENCE ->
  %K_REFERENCES __ S_IDENTIFIER
  (
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
      {% d => [d[3]].concat(d[4] || []) %}
  )
  (
    _ %K_MATCH __ ( %K_FULL {% id %} | %K_PARTIAL {% id %} | %K_SIMPLE {% id %} )
      {% d => d[3].value %}
  ):?

  (
    _ %K_ON __ ( %K_DELETE {% id %} | %K_UPDATE {% id %} ) __
    (
        %K_RESTRICT           {% d => d[0].value %}
      | %K_CASCADE            {% d => d[0].value %}
      | %K_SET __ %K_NULL     {% d => d[0].value + ' ' + d[2].value %}
      | %K_NO __ %K_ACTION    {% d => d[0].value + ' ' + d[2].value %}
      | %K_SET __ %K_DEFAULT  {% d => d[0].value + ' ' + d[2].value %}
    )
      {% d => { return { trigger: d[3].value, action: d[5] }} %}
  ):*
    {% d => {
      return {
        id: 'P_COLUMN_REFERENCE',
        def: {
          table: d[2],
          columns: d[3] || [],
          match: d[4],
          on: d[5] || []
        }
      }
    }%}

# =============================================================
# Create table options

P_CREATE_TABLE_OPTIONS ->
  O_CREATE_TABLE_OPTION ( ( __ | _ %S_COMMA _ ) O_CREATE_TABLE_OPTION {% d => d[1] %} ):*
    {% d => {
      return {
        id: 'P_CREATE_TABLE_OPTIONS',
        def: [d[0]].concat(d[1] || [])
      }
    }%}

# =============================================================
# Create table option

O_CREATE_TABLE_OPTION -> (
    %K_AUTO_INCREMENT ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { autoincrement: d[2].value }
      }%}
  | %K_AVG_ROW_LENGTH ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { avgRowLength: d[2].value }
      }%}
  | ( %K_DEFAULT __ ):? ( %K_CHARACTER __ %K_SET | %K_CHARSET ) ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return { charset: d[3] }
      }%}
  | %K_CHECKSUM ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { checksum: d[2].value }
      }%}
  | ( %K_DEFAULT __ ):? %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION
      {% d => {
        return { collation: d[3] }
      }%}
  | %K_COMMENT ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { comment: d[2] }
      }%}
  | %K_COMPRESSION ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { compression: d[2] }
      }%}
  | %K_CONNECTION ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { connection: d[2] }
      }%}
  | ( %K_DATA __ {% id %} | %K_INDEX __ {% id %} ) %K_DIRECTORY ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        const key = d[0].value.toLowerCase() + 'Directory';
        return { [key]: d[3] }
      }%}
  | %K_DELAY_KEY_WRITE ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { delayKeyWrite: d[2].value }
      }%}
  | %K_ENCRYPTION ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { encryption: d[2] }
      }%}
  | %K_ENCRYPTION_KEY_ID ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { encryptionKeyId: d[2].value }
      }%}
  | %K_IETF_QUOTES ( __ | _ %S_EQUAL _ ) ( %K_YES {% id %} | %K_NO {% id %} )
      {% d => {
        return { ietfQuotes: d[2].value }
      }%}
  | %K_ENGINE ( __ | _ %S_EQUAL _ ) O_ENGINE
      {% d => {
        return { engine: d[2] }
      }%}
  | %K_INSERT_METHOD ( __ | _ %S_EQUAL _ ) ( %K_NO {% id %} | %K_FIRST {% id %} | %K_LAST {% id %} )
      {% d => {
        return { insertMethod: d[2].value }
      }%}
  | %K_KEY_BLOCK_SIZE ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { keyBlockSize: d[2].value }
      }%}
  | %K_MAX_ROWS ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { maxRows: d[2].value }
      }%}
  | %K_MIN_ROWS ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { minRows: d[2].value }
      }%}
  | %K_PACK_KEYS ( __ | _ %S_EQUAL _ ) ( %S_NUMBER {% id %} | %K_DEFAULT {% id %} )
      {% d => {
        return { packKeys: d[2].value }
      }%}
  | %K_PAGE_CHECKSUM ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { pageChecksum: d[2].value }
      }%}
  | %K_PASSWORD ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { password: d[2] }
      }%}
  | %K_ROW_FORMAT ( __ | _ %S_EQUAL _ )
    ( %K_DEFAULT {% id %} | %K_DYNAMIC {% id %} | %K_FIXED {% id %} | %K_COMPRESSED {% id %} | %K_REDUNDANT {% id %} | %K_COMPACT {% id %} | %K_PAGE {% id %} )
      {% d => {
        return { rowFormat: d[2].value }
      }%}
  | %K_STATS_AUTO_RECALC ( __ | _ %S_EQUAL _ ) ( %S_NUMBER {% id %} | %K_DEFAULT {% id %} )
      {% d => {
        return { statsAutoRecalc: d[2].value }
      }%}
  | %K_STATS_PERSISTENT ( __ | _ %S_EQUAL _ ) ( %S_NUMBER {% id %} | %K_DEFAULT {% id %} )
      {% d => {
        return { statsPersistent: d[2].value }
      }%}
  | %K_STATS_SAMPLE_PAGES ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { statsSamplePages: d[2] }
      }%}
  | %K_TRANSACTIONAL ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { transactional: d[2].value }
      }%}
  | %K_WITH __ %K_SYSTEM __ %K_VERSIONING
      {% d => {
        return { withSystemVersioning: true }
      }%}
  | %K_TABLESPACE __ S_IDENTIFIER (
    __ %K_STORAGE __ ( %K_DISK {% id %} | %K_MEMORY {% id %} | %K_DEFAULT {% id %} )
      {% d => d[3].value %}
    ):?
      {% d => {
        const obj = { tablespaceName: d[2] };

        if (d[3]) {
          obj.tablespaceStorage = d[3];
        }

        return obj;
      }%}
  | %K_UNION ( __ | _ %S_EQUAL _ ) %S_LPARENS _ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER {% d => d[3] %} ):* _ %S_RPARENS
      {% d => {
        return { union: [d[4]].concat(d[5] || []) }
      }%}
)
  {% d => {
    return {
      id: 'O_CREATE_TABLE_OPTION',
      def: d[0]
    }
  }%}
# =============================================================
# Data types
#
# https://mariadb.com/kb/en/library/data-types/

O_DATATYPE -> (
    O_INTEGER_DATATYPE          {% id %}
  | O_FIXED_POINT_DATATYPE      {% id %}
  | O_FLOATING_POINT_DATATYPE   {% id %}
  | O_BIT_DATATYPE              {% id %}
  | O_BOOLEAN_DATATYPE          {% id %}
  | O_DATETIME_DATATYPE         {% id %}
  | O_YEAR_DATATYPE             {% id %}
  | O_VARIABLE_STRING_DATATYPE  {% id %}
  | O_FIXED_STRING_DATATYPE     {% id %}
  | O_ENUM_DATATYPE             {% id %}
  | O_SET_DATATYPE              {% id %}
  | O_SPATIAL_DATATYPE          {% id %}
  | O_JSON_DATATYPE             {% id %}
)
  {% d => {
    return {
      id: 'O_DATATYPE',
      def: d[0]
    }
  }%}

# =============================================================
# Integer data types
#
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_INTEGER_DATATYPE ->
  (
      %K_INT        {% d => { return { datatype: d[0].value, width: 4 }} %}
    | %K_INTEGER    {% d => { return { datatype: d[0].value, width: 4 }} %}
    | %K_TINYINT    {% d => { return { datatype: d[0].value, width: 1 }} %}
    | %K_SMALLINT   {% d => { return { datatype: d[0].value, width: 2 }} %}
    | %K_MEDIUMINT  {% d => { return { datatype: d[0].value, width: 3 }} %}
    | %K_BIGINT     {% d => { return { datatype: d[0].value, width: 8 }} %}
  )
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?

    {% d => {
      return {
        id: 'O_INTEGER_DATATYPE',
        def: {
          datatype: d[0].datatype,
          width: d[1] ? d[1] : d[0].width
        }
      }
    }%}

# =============================================================
# Fixed-point data types
#
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_FIXED_POINT_DATATYPE ->
  ( %K_DECIMAL {% id %} | %K_NUMERIC {% id %} )
  (
      _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3].value,
            decimals: d[7].value
          }
        }%}

    | _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3].value,
            decimals: 0
          }
        }%}
  ):?
{% d => {
  const obj = {
    id: 'O_FIXED_POINT_DATATYPE',
    def: {
      datatype: d[0].value
    }
  }

  if (d[1]) {
    obj.def.digits = d[1].digits
    obj.def.decimals = d[1].decimals
  } else {
    obj.def.digits = 10
    obj.def.decimals = 0
  }

  return obj
}%}

# =============================================================
# Floating-point data types
#
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_FLOATING_POINT_DATATYPE ->
  ( %K_FLOAT {% id %} | %K_DOUBLE {% id %} )
  (
    _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
      {% d => {
        return {
          digits: d[3].value,
          decimals: d[7].value
        }
      }%}
  ):?
{% d => {
  const obj = {
    id: 'O_FLOATING_POINT_DATATYPE',
    def: {
      datatype: d[0].value
    }
  }

  if (d[1]) {
    obj.def.digits = d[1].digits
    obj.def.decimals = d[1].decimals
  }

  return obj
}%}

# =============================================================
# Bit data types
#
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_BIT_DATATYPE ->
  %K_BIT ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS _ {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_BIT_DATATYPE',
        def: {
          datatype: d[0].value,
          length: d[1] || 1
        }
      }
    }%}

# =============================================================
# Boolean data types
#
# https://mariadb.com/kb/en/boolean/

O_BOOLEAN_DATATYPE -> (
    %K_BOOLEAN {% id %}
  | %K_BOOL {% id %}
)
  {% d => {
    return {
      id: 'O_BOOLEAN_DATATYPE',
      def: {
        datatype: d[0].value
      }
    }
  }%}

# TODO: Should prob create separate timestamp with time zone data types ...

# =============================================================
# Datetime types
#
# https://mariadb.com/kb/en/date-and-time-data-types/

O_DATETIME_DATATYPE ->
  ( %K_DATE {% id %} | %K_TIME {% id %} | %K_DATETIME {% id %} | %K_TIMESTAMP _ %K_WITH _ %K_TIME _ %K_ZONE  {% id %} )
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_DATETIME_DATATYPE',
        def: {
          datatype: d[0].value,
          fractional: d[1] || 0
        }
      }
    }%}

# =============================================================
# Year type
#
# https://mariadb.com/kb/en/date-and-time-data-types/

O_YEAR_DATATYPE ->
  %K_YEAR
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_YEAR_DATATYPE',
        def: {
          datatype: d[0].value,
          digits: d[1] || 4
        }
      }
    }%}

# =============================================================
# Variable length string types
#
# https://mariadb.com/kb/en/string-data-types/

O_VARIABLE_STRING_DATATYPE -> (
    (
        %K_NCHAR {% d => d[0].value %}
      | %K_NATIONAL __ %K_CHAR {% d => d[0].value + ' ' + d[2].value %}
      | %K_CHARACTER __ %K_VARYING {% d => d[0].value %}
      | %K_CHARACTER {% d => d[0].value %}
      | %K_CHAR {% d => d[0].value %}
      | %K_BINARY {% d => d[0].value %}
    )
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
      {% d => {
        return {
          datatype: d[0],
          length: d[1] || 1
        }
      }%}
  | ( %K_VARCHAR {% id %} | %K_VARYING {% id %} |%K_VARBINARY {% id %} )
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} )
      {% d => {
        return {
          datatype: d[0].value,
          length: d[1]
        }
      }%}
)
  {% d => {
    return {
      id: 'O_VARIABLE_STRING_DATATYPE',
      def: d[0]
    }
  }%}

# =============================================================
# Fixed length string types
#
# https://mariadb.com/kb/en/string-data-types/

O_FIXED_STRING_DATATYPE -> (
    ( %K_BLOB {% id %} | %K_TEXT {% id %} )
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
      {% d => {
        return {
          datatype: d[0].value,
          length: d[1] || 65535
        }
      }%}
  | %K_TINYBLOB     {% d => { return { datatype: d[0].value, length: 255 }} %}
  | %K_MEDIUMBLOB   {% d => { return { datatype: d[0].value, length: 16777215 }} %}
  | %K_LONGBLOB     {% d => { return { datatype: d[0].value, length: 4294967295 }} %}
  | %K_TINYTEXT     {% d => { return { datatype: d[0].value, length: 255 }} %}
  | %K_MEDIUMTEXT   {% d => { return { datatype: d[0].value, length: 16777215 }} %}
  | %K_LONGTEXT     {% d => { return { datatype: d[0].value, length: 4294967295 }} %}
)
  {% d => {
    return {
      id: 'O_FIXED_STRING_DATATYPE',
      def: d[0]
    }
  }%}

# =============================================================
# Enum type
#
# Provided string variables cannot contain commas.
#
# https://mariadb.com/kb/en/string-data-types/

O_ENUM_DATATYPE ->
  %K_ENUM
  (
    _ %S_LPARENS _ %S_SQUOTE_STRING ( _ %S_COMMA _ %S_SQUOTE_STRING {% d => d[3].value %} ):* _ %S_RPARENS
    {% d => [d[3].value].concat(d[4]) %}
  )
  {% d => {
    return {
      id: 'O_ENUM_DATATYPE',
      def: {
        datatype: d[0].value,
        values: d[1],
      }
    }
  }%}

# =============================================================
# Set type
#
# Provided string variables cannot contain commas.
#
# https://mariadb.com/kb/en/string-data-types/

O_SET_DATATYPE ->
  %K_SET
  (
    _ %S_LPARENS _ %S_SQUOTE_STRING ( _ %S_COMMA _ %S_SQUOTE_STRING {% d => d[3].value %} ):* _ %S_RPARENS
    {% d => [d[3].value].concat(d[4]) %}
  )
  {% d => {
    return {
      id: 'O_SET_DATATYPE',
      def: {
        datatype: d[0].value,
        values: d[1],
      }
    }
  }%}

# =============================================================
# Spatial types
#
# https://mariadb.com/kb/en/library/geometry-types/

O_SPATIAL_DATATYPE -> (
    %K_GEOMETRY             {% id %}
  | %K_POINT                {% id %}
  | %K_LINESTRING           {% id %}
  | %K_POLYGON              {% id %}
  | %K_MULTIPOINT           {% id %}
  | %K_MULTILINESTRING      {% id %}
  | %K_MULTIPOLYGON         {% id %}
  | %K_GEOMETRYCOLLECTION   {% id %}
)
  {% d => {
    return {
      id: 'O_SPATIAL_DATATYPE',
      def: {
        datatype: d[0].value,
      }
    }
  }%}

# =============================================================
# JSON type
#
# https://mariadb.com/kb/en/library/json-data-type/

O_JSON_DATATYPE -> %K_JSON
  {% d => {
    return {
      id: 'O_JSON_DATATYPE',
      def: {
        datatype: d[0].value,
      }
    }
  }%}
# =============================================================
# Drop database
#
# https://mariadb.com/kb/en/library/drop-database/

P_DROP_DB -> %K_DROP __ ( %K_DATABASE | %K_SCHEMA )
  ( __ %K_IF __ %K_EXISTS ):? __ S_IDENTIFIER S_EOS
    {% d => {
      return {
        id: 'P_DROP_DB',
        def: d[5]
      }
    }%}
# =============================================================
# Drop index
#
# https://mariadb.com/kb/en/library/drop-index/

P_DROP_INDEX -> %K_DROP __
  ( %K_ONLINE __ | %K_OFFLINE __ ):?
  %K_INDEX
  ( __ %K_IF __ %K_EXISTS ):? __
  S_IDENTIFIER __ %K_ON __ S_IDENTIFIER
  ( __ %K_WAIT __ %S_NUMBER | __ %K_NOWAIT ):?
  ( __ P_INDEX_ALGORITHM_OPTION {% d => d[1] %} | __ P_LOCK_OPTION {% d => d[1] %} ):* S_EOS
    {% d => {
      return {
        id: 'P_DROP_INDEX',
        def: {
          index: d[6],
          table: d[10],
          options: d[12] ? d[12] : []
        }
      }
    }%}

# =============================================================
# Drop table
#
# https://mariadb.com/kb/en/library/drop-table/

P_DROP_TABLE -> %K_DROP __ ( %K_TEMPORARY __ ):? %K_TABLE
  ( __ %K_IF __ %K_EXISTS ):?
  __ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER {% d => d[3] %} ):*
  ( __ %K_WAIT __ %S_NUMBER | __ %K_NOWAIT ):?
  ( __ %K_RESTRICT | __ %K_CASCADE ):? S_EOS
    {% d => {
      return {
        id: 'P_DROP_TABLE',
        def: [d[6]].concat(d[7] || [])
      }
    }%}
# =============================================================
# Rename table
#
# https://mariadb.com/kb/en/library/rename-table/

P_RENAME_TABLE -> %K_RENAME __ %K_TABLE
  __ S_IDENTIFIER
  ( __ %K_WAIT __ %S_NUMBER | __ %K_NOWAIT ):?
  __ %K_TO __ S_IDENTIFIER
  ( _ %S_COMMA _ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
    {% d => {
      return {
        table: d[3],
        newName: d[7]
      }
    }%}
  ):* S_EOS
    {% d => {
      return {
        id: 'P_RENAME_TABLE',
        def: [{
          table: d[4],
          newName: d[9]
        }].concat(d[10] || [])
      }
    }%}
# =============================================================
# Set statements are ignored by parser.
#
# https://mariadb.com/kb/en/library/set-statement/

# NOTE: SET statement is different for postgres

P_SET -> %K_SET _ (
      %S_UNKNOWN
    | S_IDENTIFIER _
    | %S_EQUAL _
    | %S_LPARENS
    | %S_RPARENS
    | %S_COMMA
    | %S_SEMICOLON
    | %S_BIT_FORMAT
    | %S_HEXA_FORMAT
    | %S_NUMBER
  ):+ S_EOS
  {% d => {
    return {
      id: 'P_SET',
      def: null
    }
  }%}

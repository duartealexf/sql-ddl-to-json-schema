# =============================================================
# Create table
#
# https://mariadb.com/kb/en/library/create-table/

P_CREATE_TABLE -> (
    P_CREATE_TABLE_COMMON   {% id %}
  | P_CREATE_TABLE_LIKE     {% id %}
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
    ( __ %K_OR __ %K_REPLACE ):?
    ( __ %K_TEMPORARY):?
    __ %K_TABLE
    ( __ %K_IF __ %K_NOT __ %K_EXISTS):?
    __ S_IDENTIFIER _
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
  | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_PRIMARY __ %K_KEY
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          primaryKey: {
            symbol: d[0],
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
  | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_UNIQUE
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          uniqueKey: {
            symbol: d[0],
            name: d[3],
            index: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }
      }%}
  | %K_FULLTEXT ( __ %K_INDEX | __ %K_KEY ):?
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
            symbol: d[0],
            name: d[4],
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
  ):?
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
          columns: d[3],
          match: d[4],
          on: d[5] || []
        }
      }
    }%}

# =============================================================
# Create table options

P_CREATE_TABLE_OPTIONS ->
  O_CREATE_TABLE_OPTION ( _ %S_COMMA _ O_CREATE_TABLE_OPTION {% d => d[3] %} ):*
    {% d => {
      return {
        id: 'P_CREATE_TABLE_OPTIONS',
        def: [d[0]].concat(d[1] || [])
      }
    }%}

# =============================================================
# Create table option

O_CREATE_TABLE_OPTION -> (
    %K_AUTO_INCREMENT ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { autoincrement: d[2] }
      }%}
  | %K_AVG_ROW_LENGTH ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { avgRowLength: d[2] }
      }%}
  | ( %K_DEFAULT __ ):? %K_CHARACTER __ %K_SET ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return { charset: d[5] }
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
  | %K_COMPRESSION ( __ | _ %S_EQUAL _ ) ( %K_ZLIB {% id %} | %K_LZ4 {% id %} | %K_NONE {% id %} )
      {% d => {
        return { compression: d[2].value }
      }%}
  | %K_CONNECTION ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { connection: d[2] }
      }%}
  | ( %K_DATA __ {% id %} | %K_INDEX __ {% id %} ) %K_DIRECTORY ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return {
          directory: d[3],
          type: d[0].value
        }
      }%}
  | %K_DELAY_KEY_WRITE ( __ | _ %S_EQUAL _ ) %S_NUMBER
      {% d => {
        return { delayKeyWrite: d[2].value }
      }%}
  | %K_ENCRYPTION ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { encrytion: d[2] }
      }%}
  | %K_ENCRYPTION_KEY_ID ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { encrytionKeyId: d[2] }
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
  | %K_KEY_BLOCK_SIZE ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { keyBlockSize: d[2] }
      }%}
  | %K_MAX_ROWS ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { maxRows: d[2] }
      }%}
  | %K_MIN_ROWS ( __ | _ %S_EQUAL _ ) O_TABLE_OPTION_VALUE
      {% d => {
        return { minRows: d[2] }
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
      {% d => {
        return { storage: d[3].value }
      }%}
    ):?
      {% d => {
        return {
          tablespace: {
            name: d[2],
            storage: d[3] ? d[3].storage : null
          }
        }
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

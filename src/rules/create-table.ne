# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

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
    %K_CREATE ( __ %K_TEMPORARY):? __ %K_TABLE ( __ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ S_IDENTIFIER _
    O_CREATE_TABLE_CREATE_DEFINITIONS
    ( _ P_CREATE_TABLE_OPTIONS {% d => d[1] %} ):?
    S_EOS
      {% d => {
        return {
          id: 'P_CREATE_TABLE_COMMON',
          def: {
            table: d[6],
            columnsDef: d[8],
            tableOptions: d[9]
          }
        }
      }%}

# =============================================================
# Create table like another one

P_CREATE_TABLE_LIKE ->
  %K_CREATE ( __ %K_TEMPORARY):? __ %K_TABLE ( __ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ S_IDENTIFIER
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
          table: d[6],
          like: d[7]
        }
      }
    }%}

# =============================================================
# Create table spec - (wrapper for statements in parenthesis)
#
# In MySQL docs this is the '(create_definition,...)' part.

O_CREATE_TABLE_CREATE_DEFINITIONS ->
  %S_LPARENS _ (
    O_CREATE_TABLE_CREATE_DEFINITION ( _ %S_COMMA _ O_CREATE_TABLE_CREATE_DEFINITION {% d => d[3] %} ):*
      {% d => [d[0]].concat(d[1] || []) %}
  ) _ %S_RPARENS
    {% d => {
      return {
        id: 'O_CREATE_TABLE_CREATE_DEFINITIONS',
        def: d[2]
      }
    }%}

# =============================================================
# Create table definition options
#
# In MySQL docs these options are 'create_definition'.
#
# A space between the identifier and column definition
# is not required, as long as the identifier is
# enclosed in backticks. - duartealexf

O_CREATE_TABLE_CREATE_DEFINITION -> (
    S_IDENTIFIER _ (

      O_DATATYPE
      # In MySQL docs these two options are 'column_definition'.
      ( __ O_COLUMN_DATATYPE_SPEC {% d => d[1] %} ):*
      ( __ O_COLUMN_DEFINITION_COMMON {% d => d[1] %} ):*

        {% d => {
          return {
            datatype: d[0],
            datatypeSpecs: d[1] || [],
            columnDefinitions: d[2] || []
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
    ( _ P_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          key: {
            name: d[0],
            type: d[1].value + ' ' + d[3].value,
            index: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }
      }%}
  | ( %K_INDEX {% id %} | %K_KEY {% id %} )
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ P_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          key: {
            name: d[1],
            type: d[0].value,
            index: d[2],
            columns: [d[6]].concat(d[7] || []),
            options: d[10]
          }
        }
      }%}
# | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? ):? %K_UNIQUE ( __ %K_INDEX | __ %K_KEY ):?
#     ( index_name ):? ( index_type ):? ( index_col_name,... )
#     ( index_option ):? ...
# | ( %K_FULLTEXT | %K_SPATIAL ) ( __ %K_INDEX | __ %K_KEY ):? ( index_name ):? ( index_col_name,... )
#     ( index_option ):? ...
# | ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? ):? %K_FOREIGN %K_KEY
#     ( index_name ):? ( index_col_name,... ) reference_definition
# | %K_CHECK _ ( expr )
)
  {% d => {
    return {
      id: 'O_CREATE_TABLE_CREATE_DEFINITION',
      def: d[0]
    }
  }%}

# =============================================================
# Column datatype specifications

O_COLUMN_DATATYPE_SPEC -> (
    %K_UNSIGNED
      {% d => {
        return { unsigned: true }
      }%}
  | %K_ZEROFILL
      {% d => {
        return { zerofill: true }
      }%}
  | %K_CHARACTER __ %K_SET __ O_CHARSET
      {% d => {
        return { charset: d[4] }
      }%}
  | %K_COLLATE __ O_COLLATION
      {% d => {
        return { collation: d[2] }
      }%}
)
  {% d => {
    return {
      id: 'O_COLUMN_DATATYPE_SPEC',
      def: d[0]
    }
  }%}


# =============================================================
# Common column definition

O_COLUMN_DEFINITION_COMMON -> (
    (
        %K_NOT __ %K_NULL           {% d => { return { nullable: false }} %}
      | %K_NULL                     {% d => { return { nullable: true }} %}
    ) {% id %}
  | %K_DEFAULT __ O_DEFAULT_VALUE   {% d => { return { default: d[2] }} %}
  | %K_AUTO_INCREMENT               {% d => { return { autoincrement: true }} %}
  | %K_UNIQUE ( __ %K_KEY ):?       {% d => { return { unique: true }} %}
  | (%K_PRIMARY __):? %K_KEY        {% d => { return { primary: true }} %}
  | %K_COMMENT __ O_QUOTED_STRING   {% d => { return { comment: d[2] }} %}
  | %K_COLUMN_FORMAT __ (
        %K_FIXED   {% id %}
      | %K_DYNAMIC {% id %}
      | %K_DEFAULT {% id %}
    )                               {% d => { return { format: d[2].value }} %}
  | %K_STORAGE __ (
        %K_DISK {% id %}
      | %K_MEMORY {% id %}
      | %K_DEFAULT {% id %}
    )                               {% d => { return { storage: d[2].value }} %}
  | P_COLUMN_REFERENCE              {% d => { return { reference: d[0] }} %}
)
  {% d => {
    return {
      id: 'O_COLUMN_DEFINITION_COMMON',
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
  ):?
    {% d => {
      return {
        id: 'P_COLUMN_REFERENCE',
        def: {
          table: d[2],
          columns: d[3],
          match: d[4],
          on: d[5]
        }
      }
    }%}

# =============================================================
# Index column name, used to reference to foreign keys
#
# In MySQL docs this is the 'index_col_name'.

P_INDEX_COLUMN -> S_IDENTIFIER
  (
    _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
    ( _ %K_ASC {% d => d[1] %} | _ %K_DESC {% d => d[1] %} ):?
      {% d => {
        return {
          length: d[3].value,
          sort: d[6] ? d[6].value : null
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
# In MySQL docs this is the 'index_type'.

P_INDEX_TYPE -> %K_USING __ ( %K_BTREE {% id %} | %K_HASH {% id %} )
  {% d => {
      return {
        id: 'P_INDEX_TYPE',
        def: d[2].value
      }
    }%}

# =============================================================
# Index option
#
# In MySQL docs this is the 'index_option'.

P_INDEX_OPTION -> (
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
      id: 'P_INDEX_OPTION',
      def: d[0]
    }
  }%}

# =============================================================
# Create table options

P_CREATE_TABLE_OPTIONS ->
  P_CREATE_TABLE_OPTION ( _ %S_COMMA _ P_CREATE_TABLE_OPTION {% d => d[3] %} ):*
    {% d => {
      return {
        id: 'P_CREATE_TABLE_OPTIONS',
        def: [d[0]].concat(d[1] || [])
      }
    }%}

# =============================================================
# Create table option

P_CREATE_TABLE_OPTION -> (
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
  | %K_PASSWORD ( __ | _ %S_EQUAL _ ) O_QUOTED_STRING
      {% d => {
        return { password: d[2] }
      }%}
  | %K_ROW_FORMAT ( __ | _ %S_EQUAL _ ) ( %K_DEFAULT {% id %} | %K_DYNAMIC {% id %} | %K_FIXED {% id %} | %K_COMPRESSED {% id %} | %K_REDUNDANT {% id %} | %K_COMPACT {% id %} )
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
      id: 'P_CREATE_TABLE_OPTION',
      def: d[0]
    }
  }%}

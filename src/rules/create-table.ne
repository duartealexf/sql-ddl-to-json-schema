# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

P_CREATE_TABLE -> (
    P_CREATE_TABLE_COMMON   {% id %}
  # | P_CREATE_TABLE_LIKE     {% id %}
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
    O_CREATE_TABLE_COLUMNS_WRAPPER
    # P_CREATE_TABLE_OPTIONS:?
    %S_EOS:?
      {% d => {
        return {
          id: 'P_CREATE_TABLE_COMMON',
          def: {
            table: d[6].value,
            columnsDef: d[8],
            tableOptions: d[9] || null,
            partitionsDef: d[10] || null
          }
        }
      }%}

# =============================================================
# Create table like another one

# P_CREATE_TABLE_LIKE -> __
# CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
#     { LIKE old_tbl_name | (LIKE old_tbl_name) }

# =============================================================
# Create table spec - (wrapper for statements in parenthesis)
#
# In MySQL docs this is the '(create_definition,...)' part.

O_CREATE_TABLE_COLUMNS_WRAPPER ->
  %S_LPARENS _ (
    O_CREATE_TABLE_CREATE_DEFINITION ( _ %S_COMMA _ O_CREATE_TABLE_CREATE_DEFINITION {% d => d[3] %} ):*
      {% d => [d[0]].concat(d[1] || []) %}
  ) _ %S_RPARENS
    {% d => {
      return {
        id: 'O_CREATE_TABLE_COLUMNS_WRAPPER',
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

    ) {% d => {
      return {
        column: d[0].value,
        def: d[2]
      }
    } %}
# | TODO: add other types of create_definition:
# | [CONSTRAINT [symbol]] PRIMARY KEY [index_type] (index_col_name,...)
#     [index_option] ...
# | {INDEX|KEY} [index_name] [index_type] (index_col_name,...)
#     [index_option] ...
# | [CONSTRAINT [symbol]] UNIQUE [INDEX|KEY]
#     [index_name] [index_type] (index_col_name,...)
#     [index_option] ...
# | {FULLTEXT|SPATIAL} [INDEX|KEY] [index_name] (index_col_name,...)
#     [index_option] ...
# | [CONSTRAINT [symbol]] FOREIGN KEY
#     [index_name] (index_col_name,...) reference_definition
# | CHECK (expr)
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
        return { charset: d[4].value }
      }%}
  | %K_COLLATE __ O_COLLATION
      {% d => {
        return { collation: d[2].value }
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
  | %K_DEFAULT __ O_DEFAULT_VALUE   {% d => { return { default: d[2].value }} %}
  | %K_AUTO_INCREMENT               {% d => { return { autoincrement: true }} %}
  | %K_UNIQUE ( __ %K_KEY ):?       {% d => { return { unique: true }} %}
  | (%K_PRIMARY __):? %K_KEY        {% d => { return { primary: true }} %}
  | %K_COMMENT __ O_COMMENT         {% d => { return { comment: d[2].value }} %}
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
          table: d[2].value,
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
    __ %S_NUMBER
    ( __ %K_ASC {% id %} | __ %K_DESC {% id %} ):?
      {% d => {
        return {
          length: d[1].value,
          sort: d[2] ? d[2].value : null
        }
      }%}
  ):?
    {% d => {
      return {
        id: 'P_INDEX_COLUMN',
        def: {
          column: d[0].value,
          length: d[1] && d[1].length ? d[1].length : null,
          sort: d[1] && d[1].sort ? d[1].sort : null
        }
      }
    }%}

# =============================================================
# Create table options

# P_CREATE_TABLE_OPTIONS -> __
# TODO: Implement me:
#     AUTO_INCREMENT [=] value
#   | AVG_ROW_LENGTH [=] value
#   | [DEFAULT] CHARACTER SET [=] charset_name
#   | CHECKSUM [=] {0 | 1}
#   | [DEFAULT] COLLATE [=] collation_name
#   | COMMENT [=] 'string'
#   | COMPRESSION [=] {'ZLIB'|'LZ4'|'NONE'}
#   | CONNECTION [=] 'connect_string'
#   | {DATA|INDEX} DIRECTORY [=] 'absolute path to directory'
#   | DELAY_KEY_WRITE [=] {0 | 1}
#   | ENCRYPTION [=] {'Y' | 'N'}
#   | ENGINE [=] engine_name
#   | INSERT_METHOD [=] { NO | FIRST | LAST }
#   | KEY_BLOCK_SIZE [=] value
#   | MAX_ROWS [=] value
#   | MIN_ROWS [=] value
#   | PACK_KEYS [=] {0 | 1 | DEFAULT}
#   | PASSWORD [=] 'string'
#   | ROW_FORMAT [=] {DEFAULT|DYNAMIC|FIXED|COMPRESSED|REDUNDANT|COMPACT}
#   | STATS_AUTO_RECALC [=] {DEFAULT|0|1}
#   | STATS_PERSISTENT [=] {DEFAULT|0|1}
#   | STATS_SAMPLE_PAGES [=] value
#   | TABLESPACE tablespace_name [STORAGE {DISK|MEMORY|DEFAULT}]
#   | UNION [=] (tbl_name[,tbl_name]...)

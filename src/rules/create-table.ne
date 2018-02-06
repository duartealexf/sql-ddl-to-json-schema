# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

P_CREATE_TABLE ->
    %K_CREATE (__ %K_TEMPORARY):? __ %K_TABLE (__ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ S_IDENTIFIER _
    (
        O_CREATE_TABLE_COLUMNS_WRAPPER
        # P_CREATE_TABLE_OPTIONS:?
        # P_CREATE_TABLE_PART_OPTIONS:?
          {% d => {
            return {
              columns: d[0],
              options: d[1] || null,
              partition: d[2] || null
            }
          }%}

      # TODO: add other variants:
      # | CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
      #     [(create_definition,...)]
      #     [table_options]
      #     [partition_options]
      #     [IGNORE | REPLACE]
      #     [AS] query_expression
      #
      # | CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
      #     { LIKE old_tbl_name | (LIKE old_tbl_name) }

    ) %S_EOS:?
      {% d => {
        return {
          id: 'P_CREATE_TABLE',
          def: {
            table: d[6].value,
            def: d[8]
          }
        }
      }%}

# =============================================================
# Create table spec - (wrapper for statements in parenthesis)
#
# In MySQL docs this is the '(create_definition,...)' part.

O_CREATE_TABLE_COLUMNS_WRAPPER ->
  %S_LPARENS _ (
    O_CREATE_TABLE_CREATE_DEFINITION ( _ %S_COMMA _ O_CREATE_TABLE_CREATE_DEFINITION {% d => d[3] %} ):*
      {% d => {
        return [d[0]].concat(d[1] || [])
      }%}
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

        # Whitespace may have been consumed by parenthesis in datatype.
        O_DATATYPE _

        # In MySQL docs these two options are 'column_definition'.
        ( O_COLUMN_DATATYPE_SPEC _ {% id %} ):*
        ( O_COLUMN_DEFINITION_COMMON _ {% id %} ):*

          {% d => {
            return {
              datatype: d[0],
              datatypeSpecs: d[1] || [],
              columnDefinitions: d[2] || []
            }
          }%}

      # | O_DATATYPE __ P_COLUMN_DEFINITION_GENERATED:+
      #     {% d => {
      #       return {
      #         datatype: d[0].value,
      #         def: d[2]
      #       }
      #     }%}
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
  | P_COLUMN_REFERENCE              {% d => { return { references: d[0] }} %}
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
  ( _ %S_LPARENS _ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER ):* _ %S_RPARENS ):?
  ( _ %K_MATCH __ ( %K_FULL | %K_PARTIAL | %K_SIMPLE ) ):?
  (
    _ %K_ON __ ( %K_DELETE | %K_UPDATE ) __
    ( %K_RESTRICT | %K_CASCADE | %K_SET __ %K_NULL | %K_NO __ %K_ACTION | %K_SET __ %K_DEFAULT )
  ):?

# =============================================================
# Generated definition for generated columns
#

# P_COLUMN_DEFINITION_GENERATED -> __
# TODO: Implement me:
# [GENERATED ALWAYS] AS (expression)
#       [VIRTUAL | STORED] [NOT NULL | NULL]
#       [UNIQUE [KEY]] [[PRIMARY] KEY]
#       [COMMENT 'string']

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

# =============================================================
# Create table partition options

# P_CREATE_TABLE_PART_OPTIONS -> __
# TODO: Implement me:
# PARTITION BY
#         { [LINEAR] HASH(expr)
#         | [LINEAR] KEY [ALGORITHM={1|2}] (column_list)
#         | RANGE{(expr) | COLUMNS(column_list)}
#         | LIST{(expr) | COLUMNS(column_list)} }
#     [PARTITIONS num]
#     [SUBPARTITION BY
#         { [LINEAR] HASH(expr)
#         | [LINEAR] KEY [ALGORITHM={1|2}] (column_list) }
#       [SUBPARTITIONS num]
#     ]
#     [(partition_definition [, partition_definition] ...)]
#
# partition_definition:
#     PARTITION partition_name
#         [VALUES
#             {LESS THAN {(expr | value_list) | MAXVALUE}
#             |
#             IN (value_list)}]
#         [[STORAGE] ENGINE [=] engine_name]
#         [COMMENT [=] 'string' ]
#         [DATA DIRECTORY [=] 'data_dir']
#         [INDEX DIRECTORY [=] 'index_dir']
#         [MAX_ROWS [=] max_number_of_rows]
#         [MIN_ROWS [=] min_number_of_rows]
#         [TABLESPACE [=] tablespace_name]
#         [(subpartition_definition [, subpartition_definition] ...)]
#
# subpartition_definition:
# SUBPARTITION logical_name
#         [[STORAGE] ENGINE [=] engine_name]
#         [COMMENT [=] 'string' ]
#         [DATA DIRECTORY [=] 'data_dir']
#         [INDEX DIRECTORY [=] 'index_dir']
#         [MAX_ROWS [=] max_number_of_rows]
#         [MIN_ROWS [=] min_number_of_rows]
#         [TABLESPACE [=] tablespace_name]

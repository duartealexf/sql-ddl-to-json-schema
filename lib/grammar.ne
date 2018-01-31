# =============================================================
# SQL Parser
# Parses SQL into a JS structure that can later be transformed into JSON Schema.
#
# Syntax rules
# T_ -> TERM (aka keywords)
# P_ -> PHRASE
# O_ -> OPTIONS
# S_ -> SYMBOL

# @include "./includes/symbols.ne"
@include "./includes/charsets.ne"
@include "./includes/collations.ne"
@include "./includes/keywords.ne"
@include "./includes/datatypes.ne"

main -> O_DATATYPE
# main -> P_DDS:+
#   {% d => {
#     return {
#       type: 'main',
#       def: d[0]
#     }
#   }%}

# =============================================================
# Data definition statements

P_DDS -> (
    P_CREATE_DB {% id %}
  | P_CREATE_TABLE {% id %}
)
  {% d => {
    return {
      type: 'P_DDS',
      def: d[0]
    }
  }%}

# =============================================================
# Create database
#
# https://dev.mysql.com/doc/refman/5.7/en/create-database.html

P_CREATE_DB -> _ T_CREATE __ T_DATABASE (__ O_IFEXISTS):? __ S_IDENTIFIER (__ P_CREATE_DB_SPEC):? EOS:?
  {% d => {
    return {
      type: 'P_CREATE_DB',
      def: {
        database: d[6]
      }
    }
  }%}

# =============================================================
# Create database spec (charset and collate)
#
# TODO: do something about CHARSET and COLLATE?
# So far, it's returning null.

P_CREATE_DB_SPEC -> (
    _ (T_DEFAULT __):? "CHARACTER SET" _ "=":? _ O_CHARSET_NAME _   {% d => null %}
  | _ (T_DEFAULT __):? "COLLATE" _ "=":? _ O_COLLATION_NAME _       {% d => null %}
) {% d => null %}

# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

P_CREATE_TABLE ->
    _ T_CREATE (__ T_TEMPORARY):? __ T_TABLE (__ O_IFEXISTS):? __ S_IDENTIFIER _ P_CREATE_TABLE_SPEC:* (__ P_CREATE_TABLE_OPTIONS):? (__ P_CREATE_TABLE_PART_OPTIONS):? EOS:?
      {% d => {
        return {
          type: 'P_CREATE_TABLE',
          def: {
            table: d[7],
            spec: d[9]
          }
        }
      }%}

# =============================================================
# Create table spec (a line in create table)

P_CREATE_TABLE_SPEC ->
    _ "(" _ (S_IDENTIFIER __ P_COLUMN_DEFINITION EOS:? ",":? EOS:? ):+ _ ")" _
      {% d => {
        return {
          type: 'P_CREATE_TABLE_SPEC',
          def: d[3]
        }
      }%}

# =============================================================
# Column definition

P_COLUMN_DEFINITION -> "TODO"

# =============================================================
# Create table options

P_CREATE_TABLE_OPTIONS -> "TODO"

# =============================================================
# Create table partition options

P_CREATE_TABLE_PART_OPTIONS -> "TODO"

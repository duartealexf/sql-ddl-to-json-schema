# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

@include "./rules/index.ne"

@lexer lexer

_ -> %WS:*
__ -> %WS:+

P_CREATE_TABLE ->
    _ %K_CREATE (__ %K_TEMPORARY):? __ %K_TABLE (__ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ %S_IDENTIFIER %S_EOS:?
#    _ %K_CREATE (__ %K_TEMPORARY):? __ %K_TABLE (__ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ %S_IDENTIFIER_ST %CHAR:* %S_IDENTIFIER_EN %S_EOS:?
#    _ %K_CREATE (__ %K_TEMPORARY):? __ %K_TABLE (__ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ %S_IDENTIFIER _ P_CREATE_TABLE_SPEC (__ P_CREATE_TABLE_OPTIONS):? (__ P_CREATE_TABLE_PART_OPTIONS):? %S_EOS
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
    _ "(" _ (%S_IDENTIFIER __ P_COLUMN_DEFINITION %S_EOS ",":? %S_EOS ):+ _ ")" _
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

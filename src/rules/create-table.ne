# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

P_CREATE_TABLE ->
    %K_CREATE (__ %K_TEMPORARY):? __ %K_TABLE (__ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ %S_IDENTIFIER _ P_SPEC_CREATE_TABLE# (__ P_CREATE_TABLE_OPTIONS):? (__ P_CREATE_TABLE_PART_OPTIONS):? %S_EOS
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
#
# A space between the identifier and column definition
# is not required, as long as the identifier is
# enclosed in backticks. - duartealexf

P_SPEC_CREATE_TABLE ->
    %S_LPARENS _ %S_IDENTIFIER _ P_COLUMN_DEFINITION _ %S_RPARENS
      {% d => {
        return {
          type: 'P_SPEC_CREATE_TABLE',
          def: d[3]
        }
      }%}

# =============================================================
# Column definition

P_COLUMN_DEFINITION -> %S_IDENTIFIER

# =============================================================
# Create table options

# P_CREATE_TABLE_OPTIONS -> "TODO"

# =============================================================
# Create table partition options

# P_CREATE_TABLE_PART_OPTIONS -> "TODO"

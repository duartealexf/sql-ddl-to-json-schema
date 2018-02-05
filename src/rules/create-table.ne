# =============================================================
# Create table
#
# https://dev.mysql.com/doc/refman/5.7/en/create-table.html

P_CREATE_TABLE ->
    %K_CREATE (__ %K_TEMPORARY):? __ %K_TABLE (__ %K_IF __ %K_NOT:? __ %K_EXISTS):? __ S_IDENTIFIER _
    O_CREATE_TABLE_COLUMNS_WRAPPER %S_EOS:?# (__ P_CREATE_TABLE_OPTIONS):? (__ P_CREATE_TABLE_PART_OPTIONS):? %S_EOS
      {% d => {
        return {
          id: 'P_CREATE_TABLE',
          def: {
            table: d[6].value,
            def: d[8]
          }
        }
      }%}
  # | TODO: add other types of CREATE TABLE

# =============================================================
# Create table spec - (wrapper for statements in parenthesis)
#
# In MySQL docs this is the '(create_definition,...)' part.

O_CREATE_TABLE_COLUMNS_WRAPPER ->
  %S_LPARENS _ (
      O_CREATE_TABLE_COLUMN_DEFINITION ( _ %S_COMMA _ O_CREATE_TABLE_COLUMN_DEFINITION {% d => d[3] %} ):*
        {% d => {
          return [d[0]].concat(d[1] || [])
        }%}

    # | TODO: add other types of statements in parenthesis.
  ) _ %S_RPARENS
      {% d => {
        return {
          id: 'O_CREATE_TABLE_COLUMNS_WRAPPER',
          def: d[2] // array of statements in parenthesis
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

O_CREATE_TABLE_COLUMN_DEFINITION -> (
    S_IDENTIFIER _ (
        # In MySQL docs these two options are 'column_definition'.
        O_DATATYPE ( __ O_COLUMN_DEFINITION_COMMON:+ {% d => d[1] %} ):? _
          {% d => { return { datatype: d[0], def: d[1] }} %}
      | O_DATATYPE ( __ P_COLUMN_DEFINITION_GENERATED:+ {% d => d[1] %} ):? _
          {% d => { return { datatype: d[0], def: d[1] }} %}
    )
      {% d => {
        return {
          column: d[0].value,
          ...d[2]
        }
      }%}
  # | TODO: add other types of create_definition
)
  {% d => {
    return {
      id: 'O_CREATE_TABLE_COLUMN_DEFINITION',
      def: d[0]
    }
  } %}

# =============================================================
# Common column definition

O_COLUMN_DEFINITION_COMMON -> (
    (
        %K_NOT __ %K_NULL           {% d => { return { nullable: false }} %}
      | %K_NULL                     {% d => { return { nullable: true }} %}
    ) _ {% id %}
  | %K_DEFAULT __ O_DEFAULT_VALUE _ {% d => { return { default: d[2].value }} %}
  | %K_AUTO_INCREMENT _             {% d => { return { autoincrement: true }} %}
  | %K_UNIQUE ( __ %K_KEY ):? _     {% d => { return { unique: true }} %}
  | (%K_PRIMARY __):? %K_KEY _      {% d => { return { primary: true }} %}
  | %K_COMMENT __ O_COMMENT _       {% d => { return { comment: d[2].value }} %}
  | %K_COLUMN_FORMAT __ (
        %K_FIXED   {% id %}
      | %K_DYNAMIC {% id %}
      | %K_DEFAULT {% id %}
    ) _                             {% d => { return { format: d[2].value }} %}
  | %K_STORAGE __ (
        %K_DISK {% id %}
      | %K_MEMORY {% id %}
      | %K_DEFAULT {% id %}
    ) _                             {% d => { return { storage: d[2].value }} %}
  | P_COLUMN_REFERENCE              {% d => { return { references: d[0] }} %}
)
  {% d => {
    return {
      id: 'O_COLUMN_DEFINITION_COMMON',
      def: d[0]
    }
  } %}
# =============================================================
# Generated definition for generated columns
#
# TODO: Implement me.

P_COLUMN_DEFINITION_GENERATED -> __

# =============================================================
# Reference of a column

P_COLUMN_REFERENCE ->
  %K_REFERENCES __ S_IDENTIFIER __ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER ):* (__ (
      ( %K_MATCH __ ( %K_FULL | %K_PARTIAL | %K_SIMPLE ) )
    | %K_ON __ ( %K_DELETE | %K_UPDATE ) __
      ( %K_RESTRICT | %K_CASCADE | %K_SET __ %K_NULL | %K_NO __ %K_ACTION | %K_SET __ %K_DEFAULT )
  ):+ ):?

# =============================================================
# Create table options

# P_CREATE_TABLE_OPTIONS -> "TODO"

# =============================================================
# Create table partition options

# P_CREATE_TABLE_PART_OPTIONS -> "TODO"

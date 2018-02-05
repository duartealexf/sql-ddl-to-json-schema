# =============================================================
# Create database
#
# https://dev.mysql.com/doc/refman/5.7/en/create-database.html

P_CREATE_DB ->
_ %K_CREATE __ %K_DATABASE ( __ %K_IF ( __ %K_NOT ):? __ %K_EXISTS):?
__ S_IDENTIFIER ( __ O_CREATE_DB_SPEC:+ {% d => utils.mergeLatestToObject(d[1]) %} ):? %S_EOS:?
  {% d => {
    return {
      id: 'P_CREATE_DB',
      def: {
        database: d[6].value,
        meta: d[7]
      }
    }
  }%}

# =============================================================
# Create database spec

O_CREATE_DB_SPEC -> (
    _ ( %K_DEFAULT __ ):? %K_CHARACTER __ %K_SET ( __ | _ %S_EQUAL _ ) O_CHARSET _
      {% d => {
        return {
          charset: d[6].value
        }
      }%}
  | _ ( %K_DEFAULT __ ):? %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION _
      {% d => {
        return {
          collation: d[4].value
        }
      }%}
)
  {% d => {
    return {
      id: 'O_CREATE_DB_SPEC',
      def: d[0]
    }
  }%}

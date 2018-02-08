# =============================================================
# Create database
#
# https://dev.mysql.com/doc/refman/5.7/en/create-database.html

P_CREATE_DB ->
  %K_CREATE __ %K_DATABASE ( __ %K_IF ( __ %K_NOT ):? __ %K_EXISTS ):?
  __ S_IDENTIFIER ( __ O_CREATE_DB_SPEC {% d => d[1] %} ):* S_EOS
    {% d => {
      return {
        id: 'P_CREATE_DB',
        def: {
          database: d[5],
          meta: d[6]
        }
      }
    }%}

# =============================================================
# Create database spec

O_CREATE_DB_SPEC -> (
    ( %K_DEFAULT __ ):? %K_CHARACTER __ %K_SET ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return {
          charset: d[5]
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

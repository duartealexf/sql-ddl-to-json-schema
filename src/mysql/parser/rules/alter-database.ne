# =============================================================
# Alter database
#
# https://mariadb.com/kb/en/library/alter-database/

P_ALTER_DB ->
  %K_ALTER __ ( %K_DATABASE | %K_SCHEMA )
  ( __ S_IDENTIFIER {% d => d[1] %} ):?
  ( __ O_ALTER_DB_SPEC {% d => d[1] %} ):+ S_EOS
    {% d => {
      return {
        id: 'P_ALTER_DB',
        def: {
          database: d[3],
          meta: d[4]
        }
      }
    }%}

# =============================================================
# Create database spec

O_ALTER_DB_SPEC -> (
    ( %K_DEFAULT __ ):? ( %K_CHARACTER __ %K_SET | %K_CHARSET ) ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return {
          charset: d[3]
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
      id: 'O_ALTER_DB_SPEC',
      def: d[0]
    }
  }%}

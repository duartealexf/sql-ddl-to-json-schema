# =============================================================
# Create database
#
# https://dev.mysql.com/doc/refman/5.7/en/create-database.html

P_CREATE_DB -> _ %K_CREATE __ %K_DATABASE ( __ %K_IF ( __ %K_NOT ):? __ %K_EXISTS):? __ %S_IDENTIFIER ( __ P_SPEC_CREATE_DB {% d => d[1] %} ):? %S_EOS:?
  {% d => {
    return {
      type: 'P_CREATE_DB',
      def: {
        database: d[6],
        meta: d[7]
      }
    }
  }%}

# =============================================================
# Create database spec

P_SPEC_CREATE_DB -> (
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
  | ( %K_DEFAULT __ ):? %K_CHARACTER __ %K_SET ( __ | _ %S_EQUAL _ ) O_CHARSET __
    ( %K_DEFAULT __ ):? %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION
      {% d => {
        return {
          charset: d[5],
          collation: d[10]
        }
      }%}
  | ( %K_DEFAULT __ ):? %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION __
    ( %K_DEFAULT __ ):? %K_CHARACTER __ %K_SET ( __ | _ %S_EQUAL _ ) O_CHARSET
      {% d => {
        return {
          charset: d[10],
          collation: d[3]
        }
      }%}
)
  {% d => {
    return {
      type: 'P_SPEC_CREATE_DB',
      def: {
        charset: d[0].charset || null,
        collation: d[0].collation || null,
      }
    }
  }%}

# =============================================================
# Drop database
#
# https://dev.mysql.com/doc/refman/5.7/en/drop-database.html

P_DROP_DB -> %K_DROP __ ( %K_DATABASE | %K_SCHEMA )
  ( __ %K_IF __ %K_EXISTS ):? __ S_IDENTIFIER S_EOS
    {% d => {
      return {
        id: 'P_DROP_DB',
        def: d[5]
      }
    }%}

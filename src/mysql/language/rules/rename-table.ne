# =============================================================
# Rename table
#
# https://mariadb.com/kb/en/library/rename-table/

P_RENAME_TABLE -> %K_RENAME __ %K_TABLE
  __ S_IDENTIFIER
  ( __ %K_WAIT __ %S_NUMBER | __ %K_NOWAIT ):?
  __ %K_TO __ S_IDENTIFIER
  ( _ %S_COMMA _ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
    {% d => {
      return {
        table: d[3],
        newName: d[7]
      }
    }%}
  ):* S_EOS
    {% d => {
      return {
        id: 'P_RENAME_TABLE',
        def: [{
          table: d[4],
          newName: d[9]
        }].concat(d[10] || [])
      }
    }%}

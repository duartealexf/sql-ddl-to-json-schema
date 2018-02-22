# =============================================================
# Rename table
#
# https://dev.mysql.com/doc/refman/5.7/en/rename-table.html

P_RENAME_TABLE -> %K_RENAME __ %K_TABLE
  __ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
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
          newName: d[8]
        }].concat(d[9] || [])
      }
    }%}

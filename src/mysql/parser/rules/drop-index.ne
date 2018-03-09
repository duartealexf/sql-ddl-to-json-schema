# =============================================================
# Drop index
#
# https://mariadb.com/kb/en/library/drop-index/

P_DROP_INDEX -> %K_DROP __
  ( %K_ONLINE __ | %K_OFFLINE __ ):?
  %K_INDEX
  ( __ %K_IF __ %K_EXISTS ):? __
  S_IDENTIFIER __ %K_ON __ S_IDENTIFIER
  ( __ %K_WAIT __ %S_NUMBER | __ %K_NOWAIT ):?
  ( __ P_INDEX_ALGORITHM_OPTION {% d => d[1] %} | __ P_LOCK_OPTION {% d => d[1] %} ):? S_EOS
    {% d => {
      return {
        id: 'P_DROP_INDEX',
        def: {
          index: d[6],
          table: d[10],
          options: d[12]
        }
      }
    }%}


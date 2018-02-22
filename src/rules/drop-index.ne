# =============================================================
# Drop index
#
# https://dev.mysql.com/doc/refman/5.7/en/drop-index.html

P_DROP_INDEX -> %K_DROP __ %K_INDEX __ S_IDENTIFIER __ %K_ON __ S_IDENTIFIER
  ( __ P_INDEX_ALGORITHM_OPTION {% d => d[1] %} | __ P_LOCK_OPTION {% d => d[1] %} ):? S_EOS
    {% d => {
      return {
        id: 'P_DROP_INDEX',
        def: {
          index: d[4],
          table: d[8],
          options: d[9]
        }
      }
    }%}


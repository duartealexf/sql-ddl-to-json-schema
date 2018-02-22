# =============================================================
# Drop table
#
# https://dev.mysql.com/doc/refman/5.7/en/drop-table.html

P_DROP_TABLE -> %K_DROP __ ( %K_TEMPORARY __ ):? %K_TABLE
  ( __ %K_IF __ %K_EXISTS ):?
  __ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER {% d => d[3] %} ):*
  ( __ %K_RESTRICT | __ %K_CASCADE ):? S_EOS
    {% d => {
      return {
        id: 'P_DROP_TABLE',
        def: [d[6]].concat(d[7] || [])
      }
    }%}

# =============================================================
# Use database
#
# https://mariadb.com/kb/en/library/use/

P_USE_DB -> %K_USE __ S_IDENTIFIER S_EOS
  {% d => {
    return {
      id: 'P_USE_DB',
      def: {
        database: d[2],
      }
    }
  }%}

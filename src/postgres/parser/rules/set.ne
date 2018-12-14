# =============================================================
# Set statements are ignored by parser.
#
# https://mariadb.com/kb/en/library/set-statement/

# NOTE: SET statement is different for postgres

P_SET -> %K_SET _ (
      %S_UNKNOWN
    | S_IDENTIFIER _
    | %S_EQUAL _
    | %S_LPARENS
    | %S_RPARENS
    | %S_COMMA
    | %S_SEMICOLON
    | %S_BIT_FORMAT
    | %S_HEXA_FORMAT
    | %S_NUMBER
  ):+ S_EOS
  {% d => {
    return {
      id: 'P_SET',
      def: null
    }
  }%}

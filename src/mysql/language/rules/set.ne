# =============================================================
# Set statements are ignored by parser.
#
# https://mariadb.com/kb/en/library/set-statement/

P_SET -> %K_SET __ (
      %S_UNKNOWN
    | S_IDENTIFIER
    | %S_EQUAL
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
      id: 'P_SET'
    }
  }%}

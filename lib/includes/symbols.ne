# =============================================================
# Symbols
S_WS -> [ \t\n\v\f\r] {% id %}
S_EOS -> [ \t\n\v\f\r;] {% id %}

# Some shortcuts for whitespace
_  -> S_WS:* {% (d) => () => null %}
__ -> S_WS:+ {% (d) => () => null %}

# End of statement
EOS -> S_EOS:+ {% (d) => () => null %}

# =============================================================
# Identifiers
#
# https://dev.mysql.com/doc/refman/5.7/en/identifiers.html
#
# TODO: Identifiers may begin with a digit but,
# can consist solely of digits only if quoted.
# TODO: Support quoted identifier with an
# escaped quote as part of identifier

S_IDENTIFIER -> (
    [0-9,a-z,A-Z$_]:+                           {% d => d[0].join('') %}
  | "`" [a-zA-Z0-9_$\x01-\x59\x61-\xff]:+ "`"   {% d => d[1].join('') %}
) {% id %}

S_NUMBER -> [0-9]:+ {% d => Number(d[0].join('')) %}

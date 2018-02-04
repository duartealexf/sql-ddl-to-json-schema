# =============================================================
# SQL Parser
# Parses SQL into a JS structure that can
# later be transformed into JSON Schema.
#
# Syntax rules
# K_ -> KEYWORD
# P_ -> PHRASE
# O_ -> OPTIONS
# S_ -> SYMBOL

# =============================================================
# Lexer and rules loader

@{%
const moo = require('moo');

const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = {
  ...keywords,
  ...symbols,
}

const lexer = moo.compile(rules);

%}

@lexer lexer

# =============================================================
# A few shortcuts for whitespaces.

_ -> %WS:*
__ -> %WS:+

# =============================================================
# Main parser rule (entrypoint).

main -> P_DDS:+
  {% d => {
    return {
      type: 'MAIN',
      def: d[0]
    }
  }%}

# =============================================================
# Data definition statements

P_DDS -> (
    P_CREATE_DB {% id %}
  | P_CREATE_TABLE {% id %}
)
  {% d => {
    return {
      type: 'P_DDS',
      def: d[0]
    }
  }%}

# =============================================================
# Valid options for charset and collations.
#
# https://dev.mysql.com/doc/refman/5.7/en/charset-charsets.html

O_CHARSET -> ( %S_DQUOTE_STRING | %S_SQUOTE_STRING | %S_IDENTIFIER ) {% d => d[0][0] %}
O_COLLATION -> ( %S_DQUOTE_STRING | %S_SQUOTE_STRING | %S_IDENTIFIER ) {% d => d[0][0] %}

# =============================================================
# Other rules will be appended below when compiling.

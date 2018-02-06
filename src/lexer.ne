# =============================================================
# SQL Parser
# Parses SQL into a JS structure that can
# later be transformed into JSON Schema.
#
# Syntax rules
# K_ -> KEYWORDS
# P_ -> PHRASES
# O_ -> OPTIONS
# S_ -> SYMBOLS

# =============================================================
# Lexer and rules loader

@{%
const moo = require('moo');
const utils = require('./shared/utils');

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
# Main parser rule (entrypoint).

P_MAIN -> P_DDS:+
  {% d => {
    return {
      id: 'MAIN',
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
      id: 'P_DDS',
      def: d[0]
    }
  }%}

# =============================================================
# A few shortcuts for whitespaces.

_ -> %WS:*
__ -> %WS:+

# =============================================================
# Valid options for charset and collations.
#
# https://dev.mysql.com/doc/refman/5.7/en/charset-charsets.html
#
# I've tested different combinations of quotes and backticks to
# specify CHARSET and COLLATE, and all of them worked. - duartealexf

O_CHARSET -> ( %S_DQUOTE_STRING | %S_SQUOTE_STRING | S_IDENTIFIER ) {% d => d[0][0] %}
O_COLLATION -> ( %S_DQUOTE_STRING | %S_SQUOTE_STRING | S_IDENTIFIER ) {% d => d[0][0] %}

# =============================================================
# Valid ways to set a default value for a column.

O_DEFAULT_VALUE -> ( %S_DQUOTE_STRING | %S_SQUOTE_STRING | %S_NUMBER | %K_CURRENT_TIMESTAMP | %S_BIT_FORMAT ) {% d => d[0][0] %}

# =============================================================
# Valid ways to set comment for column.

O_COMMENT -> ( %S_DQUOTE_STRING | %S_SQUOTE_STRING ) {% d => d[0][0] %}

# =============================================================
# Identifiers
#
# https://dev.mysql.com/doc/refman/5.7/en/keywords.html
#
# TODO: don't add reserved words to this list.
#
# More or-rules will be appended to this rule during assembly. The
# or-rules are keywords because in statements, identifiers can be
# the same as keywords, but if we want to match a S_IDENTIFIER in
# a rule, and end up matching a keyword, we can use this as a
# fallback to consider it as an identifier. - duartealexf

S_IDENTIFIER ->
    %IDENTIFIER {% id %}
# | all %K_ will be appended here

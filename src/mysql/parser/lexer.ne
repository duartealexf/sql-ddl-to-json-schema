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

const utils = require('../../shared/utils');
const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = Object.assign({}, keywords, symbols);

const lexer = moo.compile(rules);
%}

@lexer lexer

# =============================================================
# Main parser rule (entrypoint).
# Data definition statements

P_DDS -> _ (
    P_CREATE_DB _     {% id %}
  | P_CREATE_TABLE _  {% id %}
  | P_CREATE_INDEX _  {% id %}
  | P_ALTER_DB _      {% id %}
  | P_ALTER_TABLE _   {% id %}
  | P_DROP_DB _       {% id %}
  | P_DROP_TABLE _    {% id %}
  | P_DROP_INDEX _    {% id %}
  | P_RENAME_TABLE _  {% id %}
  | P_SET _           {% id %}
  | P_USE_DB _        {% id %}
)
  {% d => {
    return {
      id: 'P_DDS',
      def: d[1]
    }
  }%}

# =============================================================
# A few shortcuts for whitespaces.

_ -> %WS:*
__ -> %WS:+

# =============================================================
# End of statement

S_EOS -> _ %S_SEMICOLON

# =============================================================
# Valid options for charset and collations and engines.
#
# https://mariadb.com/kb/en/library/character-sets/
#
# I've tested different combinations of quotes and backticks to
# specify CHARSET and COLLATE, and all of them worked. - duartealexf

O_CHARSET ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}

O_COLLATION ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}

# =============================================================
# Valid ways to write an engine in MariaDB
#
# https://mariadb.com/kb/en/library/show-engine/

O_ENGINE ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}

# =============================================================
# Valid ways to set a default value for a column.

O_DEFAULT_VALUE ->
    %S_NUMBER             {% d => d[0].value %}
  | %S_BIT_FORMAT         {% d => d[0].value %}
  | %S_HEXA_FORMAT        {% d => d[0].value %}
  | O_QUOTED_STRING       {% id %}

O_DEFAULT_EXP_VALUE ->
  S_IDENTIFIER
    ( %S_LPARENS _ %S_NUMBER:? _ %S_RPARENS
      {% d =>
        '(' + (d[2] ? d[2].value : '') + ')'
      %}
    ):?
                          {% d => d[0] + (d[1] || '') %}

# =============================================================
# String with any of single or double quote.

O_QUOTED_STRING ->
    %S_DQUOTE_STRING      {% d => d[0].value %}
  | %S_SQUOTE_STRING      {% d => d[0].value %}

# =============================================================
# Valid ways to set a value for a table option

O_TABLE_OPTION_VALUE ->
    O_QUOTED_STRING       {% d => d[0] %}
  | S_IDENTIFIER          {% d => d[0] %}
  | %S_NUMBER             {% d => d[0].value %}

# =============================================================
# Identifiers
#
# https://mariadb.com/kb/en/library/sql-language-structure/
#
# More or-rules will be appended to this rule during assembly. The
# or-rules are keywords, because in statements identifiers can be
# the same as keywords, but if we want to match a S_IDENTIFIER in
# a rule, and end up matching a keyword, we can use this as a
# fallback to consider it as an identifier. - duartealexf

S_IDENTIFIER ->
    %S_IDENTIFIER_QUOTED {% d => d[0].value %} | %S_IDENTIFIER_UNQUOTED {% d => d[0].value %}
# | all %K_ will be appended here, don't add anything after this line.

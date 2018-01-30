# SQL Parser
# Parses SQL into a JS structure that can later be transformed into JSON Schema.
#
# Syntax rules
# T_ -> TERM (aka keywords)
# P_ -> PHRASE
# O_ -> OPTIONS
# S_ -> SYMBOL

@include "./includes/charsets.ne"
@include "./includes/collations.ne"
@include "./includes/keywords.ne"
@include "./includes/symbols.ne"

main -> P_DDS:* {% id %}

P_DDS ->
    P_CREATE_DB {% id %}

P_CREATE_DB -> _ T_CREATE __ T_DATABASE (__ O_IFEXISTS):? __ S_IDENTIFIER (__ P_CREATE_DB_SPEC):? EOS:?
  {% d => {
    return {
      database: d[6]
    }
  }%}


P_CREATE_DB_SPEC -> (
    _ (T_DEFAULT __):? "CHARACTER SET" _ "=":? _ O_CHARSET_NAME _   {% d => null %}
  | _ (T_DEFAULT __):? "COLLATE" _ "=":? _ O_COLLATION_NAME _       {% d => null %}
) {% d => null %}


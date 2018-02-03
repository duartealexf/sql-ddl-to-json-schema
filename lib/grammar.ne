# =============================================================
# SQL Parser
# Parses SQL into a JS structure that can later be transformed into JSON Schema.
#
# Syntax rules
# K_ -> KEYWORD
# P_ -> PHRASE
# O_ -> OPTIONS
# S_ -> SYMBOL

@include "./rules/index.ne"

@lexer lexer

@include "./rules/datatypes.ne"
@include "./rules/create-database.ne"

# =============================================================
# Statements wrapper

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
)
  {% d => {
    return {
      type: 'P_DDS',
      def: d[0]
    }
  }%}

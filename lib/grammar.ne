# From https://github.com/Hardmath123/nearley/
# blob/master/examples/calculator/arithsdfsdmetic.ne

# This is a nice little grammar to familiarize yourself
# with the nearley syntax.

# It parses valid calculator input, obeying OOO and stuff.
# Try clicking "Add Test" and pasting in
#   ln (3 + 2*(8/e - sin(pi/5)))

# `main` is the nonterminal that nearley tries to parse, so
# we define it first.
# The _'s are defined as whitespace below. This is a mini-
# -idiom.
# The stuff inside {% %} is an optional postprocessing
# function which can return anything you like.


main -> _ AS _ {% (d) => {type:'main', d:d, v:d[1].v}} %}

# PEMDAS!
# We define each level of precedence as a nonterminal.

# Parentheses
P -> "(" _ AS _ ")" {% (d) => {type:'P', d:d, v:d[2].v}} %}
    | N             {% id %}

# Exponents
E -> P _ "^" _ E    {% (d) => {type:'E', d:d, v:Math.pow(d[0].v, d[4].v)}} %}
    | P             {% id %}

# Multiplication and division
MD -> MD _ "*" _ E  {% (d) => {type: 'M', d:d, v:d[0].v*d[4].v}} %}
    | MD _ "/" _ E  {% (d) => {type: 'D', d:d, v:d[0].v/d[4].v}} %}
    | E             {% id %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% (d) => {type:'A', d:d, v:d[0].v+d[4].v}} %}
    | AS _ "-" _ MD {% (d) => {type:'S', d:d, v:d[0].v-d[4].v}} %}
    | MD            {% id %}

# A number or a function of a number
N -> float          {% id %}
    | "sin" _ P     {% (d) => {type:'sin', d:d, v:Math.sin(d[2].v)}} %}
    | "cos" _ P     {% (d) => {type:'cos', d:d, v:Math.cos(d[2].v)}} %}
    | "tan" _ P     {% (d) => {type:'tan', d:d, v:Math.tan(d[2].v)}} %}

    | "asin" _ P    {% (d) => {type:'asin', d:d, v:Math.asin(d[2].v)}} %}
    | "acos" _ P    {% (d) => {type:'acos', d:d, v:Math.acos(d[2].v)}} %}
    | "atan" _ P    {% (d) => {type:'atan', d:d, v:Math.atan(d[2].v)}} %}

    | "pi"          {% (d) => {type:'pi', d:d, v:Math.PI}} %}
    | "e"           {% (d) => {type:'e', d:d, v:Math.E}} %}
    | "sqrt" _ P    {% (d) => {type:'sqrt', d:d, v:Math.sqrt(d[2].v)}} %}
    | "ln" _ P      {% (d) => {type:'ln', d:d, v:Math.log(d[2].v)}}  %}

# I use `float` to basically mean a number with a decimal point in it
float ->
      int "." int   {% (d) => {v:parseFloat(d[0].v + d[1].v + d[2].v)}} %}
    | int           {% (d) => {v:parseInt(d[0].v)}} %}

int -> [0-9]:+        {% (d) => {v:d[0].join("")}} %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     {% (d) => null } %}

T_DEFAULT -> "DEFAULT"i                   {% id %}
T_TEMPORARY -> "TEMPORARY"i               {% id %}

T_RENAME -> "RENAME"i                     {% id %}
T_CREATE -> "CREATE"i                     {% id %}
T_ALTER -> "ALTER"i                       {% id %}
T_DROP -> "DROP"i                         {% id %}

T_TABLE -> "TABLE"i                       {% id %}
T_DATABASE -> (
    "DATABASE"i
  | "SCHEMA"i
) {% d => { return d[0][0] } %}

T_IFEXISTS -> "IF EXISTS"i                {% id %}
T_IFNOTEXISTS -> "IF NOT EXISTS"i         {% id %}

O_IFEXISTS -> (
    T_IFEXISTS
  | T_IFNOTEXISTS
) {% d => { return d[0][0] } %}

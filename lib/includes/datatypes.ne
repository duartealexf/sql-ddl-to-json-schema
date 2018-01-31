# =============================================================
# Data types
#
# https://dev.mysql.com/doc/refman/5.7/en/data-types.html


@include "./includes/symbols.ne"

O_DATATYPE -> (
    O_INTEGER_DATATYPE
  | O_FIXED_POINT_DATATYPE
  | O_FLOATING_POINT_DATATYPE
  | O_BIT_DATATYPE
) {% d => {
  return {
    type: 'O_DATATYPE',
    def: d[0][0]
  }
}%}

# =============================================================
# Integer data types
#
# https://dev.mysql.com/doc/refman/5.7/en/integer-types.html

T_INTEGER -> (
    "INTEGER"i
  | "INT"i
)  {% d => { return d[0][0] } %}

T_SMALLINT -> "SMALLINT"i   {% id %}
T_TINYINT -> "TINYINT"i     {% id %}
T_MEDIUMINT -> "MEDIUMINT"i {% id %}
T_BIGINT -> "BIGINT"i       {% id %}

O_INTEGER_DATATYPE -> (
    T_INTEGER
  | T_SMALLINT
  | T_TINYINT
  | T_MEDIUMINT
  | T_BIGINT
) {% d => {
  return {
    type: 'O_INTEGER_DATATYPE',
    def: d[0][0]
  }
}%}

# =============================================================
# Fixed-point data types
#
# https://dev.mysql.com/doc/refman/5.7/en/fixed-point-types.html

T_DECIMAL -> "DECIMAL" {% id %}
T_NUMERIC -> "NUMERIC" {% id %}

O_FIXED_POINT_DATATYPE -> (
  (T_DECIMAL {% id %} | T_NUMERIC {% id %})
  (
      _ "(" _ S_NUMBER _ "," _ S_NUMBER _ ")" _
        {% d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }%}

    | _ "(" _ S_NUMBER _ ")" _
        {% d => {
          return {
            digits: d[3],
            decimals: 0
          }
        }%}
  ):?
) {% d => {
  return {
    type: 'O_FIXED_POINT_DATATYPE',
    def: {
      datatype: d[0][0],
      spec: d[0][1]
    }
  }
}%}

# =============================================================
# Floating-point data types
#
# https://dev.mysql.com/doc/refman/5.7/en/floating-point-types.html

T_FLOAT -> "FLOAT" {% id %}
T_DOUBLE -> "DOUBLE" {% id %}

O_FLOATING_POINT_DATATYPE -> (
  (T_FLOAT {% id %} | T_DOUBLE {% id %})
  (
      _ "(" _ S_NUMBER _ "," _ S_NUMBER _ ")" _
        {% d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }%}
  ):?
) {% d => {
  return {
    type: 'O_FLOATING_POINT_DATATYPE',
    def: {
      datatype: d[0][0],
      spec: d[0][1]
    }
  }
}%}

# =============================================================
# Bit data types
#
# https://dev.mysql.com/doc/refman/5.7/en/bit-type.html

T_BIT -> "BIT"i             {% id %}

O_BIT_DATATYPE ->
  T_BIT _ "(" _ S_NUMBER _ ")" _
    {% d => {
      return {
        type: 'O_BIT_DATATYPE',
        def: {
          values: d[4]
        }
      }
    }%}

# =============================================================
# Datetime types
#
# https://dev.mysql.com/doc/refman/5.7/en/datetime.html

T_DATE -> "DATE"i             {% id %}
T_DATETIME -> "DATETIME"i     {% id %}
T_TIMESTAMP -> "TIMESTAMP"i   {% id %}

O_DATETIME_DATATYPE ->
  ( T_DATE {% id %} | T_DATETIME {% id %} | T_TIMESTAMP {% id %} )
  ( _ "" "" _ )

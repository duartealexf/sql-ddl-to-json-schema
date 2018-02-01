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
  | O_DATETIME_DATATYPE
  | O_YEAR_DATATYPE
  | O_VARIABLE_STRING_DATATYPE
  | O_FIXED_STRING_DATATYPE
  | O_ENUM_DATATYPE
  | O_SET_DATATYPE
  | O_SPATIAL_DATATYPE
  | O_JSON_DATATYPE
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
      _ "(" _ S_NUMBER _ "," _ S_NUMBER _ ")"
        {% d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }%}

    | _ "(" _ S_NUMBER _ ")"
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
      _ "(" _ S_NUMBER _ "," _ S_NUMBER _ ")"
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
  T_BIT _ "(" _ S_NUMBER _ ")"
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
# https://dev.mysql.com/doc/refman/5.7/en/date-and-time-literals.html
# https://dev.mysql.com/doc/refman/5.7/en/fractional-seconds.html

T_DATE -> "DATE"i             {% id %}
T_TIME -> "TIME"i             {% id %}
T_DATETIME -> "DATETIME"i     {% id %}
T_TIMESTAMP -> "TIMESTAMP"i   {% id %}

O_DATETIME_DATATYPE ->
  ( T_DATE {% id %} | T_TIME {% id %} | T_DATETIME {% id %} | T_TIMESTAMP {% id %} )
  ( _ "(" _ S_NUMBER _ ")" {% d => d[3] %} ):?
    {% d => {
      return {
        type: 'O_DATETIME_DATATYPE',
        def: {
          datatype: d[0],
          fractional: d[1]
        }
      }
    }%}

# =============================================================
# Year type
#
# https://dev.mysql.com/doc/refman/5.7/en/year.html

T_YEAR -> "YEAR"i             {% id %}

O_YEAR_DATATYPE -> _
  T_YEAR
  ( _ "(" _ S_NUMBER _ ")" {% d => d[3] %} ):? _
    {% d => {
      return {
        type: 'O_YEAR_DATATYPE',
        def: {
          datatype: d[1],
          digits: d[2] || 4
        }
      }
    }%}

# =============================================================
# Variable length string types
#
# https://dev.mysql.com/doc/refman/5.7/en/string-types.html
# https://dev.mysql.com/doc/refman/5.7/en/char.html
# https://dev.mysql.com/doc/refman/5.7/en/binary-varbinary.html

T_CHAR -> "CHAR"i             {% id %}
T_VARCHAR -> "VARCHAR"i       {% id %}
T_BINARY -> "BINARY"i         {% id %}
T_VARBINARY -> "VARBINARY"i   {% id %}

O_VARIABLE_STRING_DATATYPE ->
  ( T_CHAR {% id %} | T_VARCHAR {% id %} | T_BINARY {% id %} | T_VARBINARY {% id %} )
  _ "(" _ S_NUMBER _ ")"
    {% d => {
      return {
        type: 'O_VARIABLE_STRING_DATATYPE',
        def: {
          datatype: d[0],
          length: d[4]
        }
      }
    }%}

# =============================================================
# Fixed length string types
#
# https://dev.mysql.com/doc/refman/5.7/en/blob.html

T_TINYBLOB -> "TINYBLOB"i             {% id %}
T_BLOB -> "BLOB"i                     {% id %}
T_MEDIUMBLOB -> "MEDIUMBLOB"i         {% id %}
T_LONGBLOB -> "LONGBLOB"i             {% id %}
T_TINYTEXT -> "TINYTEXT"i             {% id %}
T_TEXT -> "TEXT"i                     {% id %}
T_MEDIUMTEXT -> "MEDIUMTEXT"i         {% id %}
T_LONGTEXT -> "LONGTEXT"i             {% id %}

O_FIXED_STRING_DATATYPE ->
  (
      T_TINYBLOB
    | T_BLOB
    | T_MEDIUMBLOB
    | T_LONGBLOB
    | T_TINYTEXT
    | T_TEXT
    | T_MEDIUMTEXT
    | T_LONGTEXT
  )
    {% d => {
      return {
        type: 'O_FIXED_STRING_DATATYPE',
        def: {
          datatype: d[0][0],
        }
      }
    }%}

# =============================================================
# Enum type
#
# https://dev.mysql.com/doc/refman/5.7/en/enum.html
#
# TODO: Change from S_IDENTIFIER to single-quote-escapable-variables

T_ENUM -> "ENUM"i             {% id %}

O_ENUM_DATATYPE ->
  T_ENUM
  ( _ "(" _ "'" S_IDENTIFIER "'" (_ "," _ "'" S_IDENTIFIER "'" _ {% d => d[4] %} ):* _ ")"
    {% d => [d[4]].concat(d[6]) %}
  )
  {% d => {
    return {
      type: 'O_ENUM_DATATYPE',
      def: {
        datatype: d[0],
        values: d[1],
      }
    }
  }%}

# =============================================================
# Set type
#
# https://dev.mysql.com/doc/refman/5.7/en/set.html
#
# TODO: Change from S_IDENTIFIER to single-quote-escapable-variables
# https://github.com/kach/nearley/issues/150
# https://nearley.js.org/docs/tokenizers#lexing-with-moo
# https://github.com/no-context/moo
#
# TODO: single-quote-escapable-variables in SET type cannot have commas

T_SET -> "SET"i             {% id %}

O_SET_DATATYPE ->
  T_SET _
  (
      "(" _ "'" S_IDENTIFIER "'" _ ")"
        {% d => [d[3]] %}
    | "(" _ "'" S_IDENTIFIER "'" (_ "," _ "'" S_IDENTIFIER "'" _ {% d => d[4] %} ):* _ ")"
        {% d => Array.isArray(d[5]) ? [d[3]].concat(d[5]) : [d[3]] %}
  )
  {% d => {
    return {
      type: 'O_SET_DATATYPE',
      def: {
        datatype: d[0],
        values: d[2],
      }
    }
  }%}

# =============================================================
# Spatial types
#
# https://dev.mysql.com/doc/refman/5.7/en/spatial-type-overview.html
# https://dev.mysql.com/doc/refman/5.7/en/creating-spatial-columns.html
# https://dev.mysql.com/doc/refman/5.7/en/gis-geometry-class-hierarchy.html

T_GEOMETRY -> "GEOMETRY"i                       {% id %}
T_POINT -> "POINT"i                             {% id %}
T_LINESTRING -> "LINESTRING"i                   {% id %}
T_POLYGON -> "POLYGON"i                         {% id %}
T_MULTIPOINT -> "MULTIPOINT"i                   {% id %}
T_MULTILINESTRING -> "MULTILINESTRING"i         {% id %}
T_MULTIPOLYGON -> "MULTIPOLYGON"i               {% id %}
T_GEOMETRYCOLLECTION -> "GEOMETRYCOLLECTION"i   {% id %}

O_SPATIAL_DATATYPE ->
  (
    T_GEOMETRY
  | T_POINT
  | T_LINESTRING
  | T_POLYGON
  | T_MULTIPOINT
  | T_MULTILINESTRING
  | T_MULTIPOLYGON
  | T_GEOMETRYCOLLECTION
) {% d => {
      return {
        type: 'O_SPATIAL_DATATYPE',
        def: {
          datatype: d[0][0],
        }
      }
    }%}

# =============================================================
# JSON type
#
# https://dev.mysql.com/doc/refman/5.7/en/json.html

T_JSON -> "JSON"i                       {% id %}

O_JSON_DATATYPE -> T_JSON
  {% d => {
    return {
      type: 'O_JSON_DATATYPE',
      def: {
        datatype: d[0],
      }
    }
  }%}


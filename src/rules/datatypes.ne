# =============================================================
# Data types
#
# https://dev.mysql.com/doc/refman/5.7/en/data-types.html

O_DATATYPE -> (
    O_INTEGER_DATATYPE          {% id %}
  | O_FIXED_POINT_DATATYPE      {% id %}
  | O_FLOATING_POINT_DATATYPE   {% id %}
  | O_BIT_DATATYPE              {% id %}
  | O_DATETIME_DATATYPE         {% id %}
  | O_YEAR_DATATYPE             {% id %}
  | O_VARIABLE_STRING_DATATYPE  {% id %}
  | O_FIXED_STRING_DATATYPE     {% id %}
  | O_ENUM_DATATYPE             {% id %}
  | O_SET_DATATYPE              {% id %}
  | O_SPATIAL_DATATYPE          {% id %}
  | O_JSON_DATATYPE             {% id %}
)
  {% d => {
    return {
      id: 'O_DATATYPE',
      def: d[0]
    }
  }%}

# =============================================================
# Integer data types
#
# https://dev.mysql.com/doc/refman/5.7/en/integer-types.html

O_INTEGER_DATATYPE ->
  (
      %K_INT        {% d => { return { datatype: d[0].value, width: 4 }} %}
    | %K_INTEGER    {% d => { return { datatype: d[0].value, width: 4 }} %}
    | %K_TINYINT    {% d => { return { datatype: d[0].value, width: 1 }} %}
    | %K_SMALLINT   {% d => { return { datatype: d[0].value, width: 2 }} %}
    | %K_MEDIUMINT  {% d => { return { datatype: d[0].value, width: 3 }} %}
    | %K_BIGINT     {% d => { return { datatype: d[0].value, width: 8 }} %}
  )
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?

    {% d => {
      return {
        id: 'O_INTEGER_DATATYPE',
        def: {
          datatype: d[0].datatype,
          width: d[1] ? d[1] : d[0].width
        }
      }
    }%}

# =============================================================
# Fixed-point data types
#
# https://dev.mysql.com/doc/refman/5.7/en/fixed-point-types.html

O_FIXED_POINT_DATATYPE ->
  (%K_DECIMAL {% id %} | %K_NUMERIC {% id %})
  (
      _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3].value + d[7].value,
            decimals: d[7].value
          }
        }%}

    | _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3].value,
            decimals: 0
          }
        }%}
  ):?
{% d => {
  return {
    id: 'O_FIXED_POINT_DATATYPE',
    def: {
      datatype: d[0].value,
      def: d[1]
    }
  }
}%}

# =============================================================
# Floating-point data types
#
# https://dev.mysql.com/doc/refman/5.7/en/floating-point-types.html

O_FLOATING_POINT_DATATYPE ->
  ( %K_FLOAT {% id %} | %K_DOUBLE {% id %} )
  (
    _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
      {% d => {
        return {
          digits: d[3].value + d[7].value,
          decimals: d[7].value
        }
      }%}
  ):?
{% d => {
  return {
    id: 'O_FLOATING_POINT_DATATYPE',
    def: {
      datatype: d[0].value,
      def: d[1]
    }
  }
}%}

# =============================================================
# Bit data types
#
# https://dev.mysql.com/doc/refman/5.7/en/bit-type.html

O_BIT_DATATYPE ->
  %K_BIT _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
    {% d => {
      return {
        id: 'O_BIT_DATATYPE',
        def: {
          values: d[4].value
        }
      }
    }%}

# =============================================================
# Datetime types
#
# https://dev.mysql.com/doc/refman/5.7/en/datetime.html
# https://dev.mysql.com/doc/refman/5.7/en/date-and-time-literals.html
# https://dev.mysql.com/doc/refman/5.7/en/fractional-seconds.html

O_DATETIME_DATATYPE ->
  ( %K_DATE {% id %} | %K_TIME {% id %} | %K_DATETIME {% id %} | %K_TIMESTAMP {% id %} )
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_DATETIME_DATATYPE',
        def: {
          datatype: d[0].value,
          fractional: d[1]
        }
      }
    }%}

# =============================================================
# Year type
#
# https://dev.mysql.com/doc/refman/5.7/en/year.html

O_YEAR_DATATYPE ->
  %K_YEAR
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):? _
    {% d => {
      return {
        id: 'O_YEAR_DATATYPE',
        def: {
          datatype: d[0].value,
          digits: d[1] || 4
        }
      }
    }%}

# =============================================================
# Variable length string types
#
# https://dev.mysql.com/doc/refman/5.7/en/string-types.html
# https://dev.mysql.com/doc/refman/5.7/en/char.html
# https://dev.mysql.com/doc/refman/5.7/en/binary-varbinary.html

O_VARIABLE_STRING_DATATYPE ->
  ( %K_CHAR {% id %} | %K_VARCHAR {% id %} | %K_BINARY {% id %} | %K_VARBINARY {% id %} )
  _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
    {% d => {
      return {
        id: 'O_VARIABLE_STRING_DATATYPE',
        def: {
          datatype: d[0].value,
          length: d[4].value
        }
      }
    }%}

# =============================================================
# Fixed length string types
#
# https://dev.mysql.com/doc/refman/5.7/en/blob.html

O_FIXED_STRING_DATATYPE -> (
    %K_TINYBLOB     {% id %}
  | %K_BLOB         {% id %}
  | %K_MEDIUMBLOB   {% id %}
  | %K_LONGBLOB     {% id %}
  | %K_TINYTEXT     {% id %}
  | %K_TEXT         {% id %}
  | %K_MEDIUMTEXT   {% id %}
  | %K_LONGTEXT     {% id %}
)
  {% d => {
    return {
      id: 'O_FIXED_STRING_DATATYPE',
      def: {
        datatype: d[0].value,
      }
    }
  }%}

# =============================================================
# Enum type
#
# https://dev.mysql.com/doc/refman/5.7/en/enum.html

O_ENUM_DATATYPE ->
  %K_ENUM
  ( _ %S_LPARENS _ %S_SQUOTE_STRING (_ %S_COMMA _ %S_SQUOTE_STRING _ {% d => d[3].value %} ):* _ %S_RPARENS
    {% d => [d[3].value].concat(d[4]) %}
  )
  {% d => {
    return {
      id: 'O_ENUM_DATATYPE',
      def: {
        datatype: d[0].value,
        values: d[1],
      }
    }
  }%}

# =============================================================
# Set type
#
# Provided string variables cannot contain commas.
#
# https://dev.mysql.com/doc/refman/5.7/en/set.html
#

O_SET_DATATYPE ->
  %K_SET _
  (
      %S_LPARENS _ %S_SQUOTE_STRING _ %S_RPARENS
        {% d => [d[2].value] %}
    | %S_LPARENS _ %S_SQUOTE_STRING (_ %S_COMMA _ %S_SQUOTE_STRING _ {% d => d[3].value %} ):* _ %S_RPARENS
        {% d => Array.isArray(d[3]) ? [d[2].value].concat(d[3]) : [d[2].value] %}
  )
  {% d => {
    return {
      id: 'O_SET_DATATYPE',
      def: {
        datatype: d[0].value,
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

O_SPATIAL_DATATYPE -> (
    %K_GEOMETRY             {% id %}
  | %K_POINT                {% id %}
  | %K_LINESTRING           {% id %}
  | %K_POLYGON              {% id %}
  | %K_MULTIPOINT           {% id %}
  | %K_MULTILINESTRING      {% id %}
  | %K_MULTIPOLYGON         {% id %}
  | %K_GEOMETRYCOLLECTION   {% id %}
)
  {% d => {
    return {
      id: 'O_SPATIAL_DATATYPE',
      def: {
        datatype: d[0].value,
      }
    }
  }%}

# =============================================================
# JSON type
#
# https://dev.mysql.com/doc/refman/5.7/en/json.html

O_JSON_DATATYPE -> %K_JSON
  {% d => {
    return {
      id: 'O_JSON_DATATYPE',
      def: {
        datatype: d[0].value,
      }
    }
  }%}


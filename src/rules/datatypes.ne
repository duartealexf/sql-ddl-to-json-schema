# =============================================================
# Data types
#
# https://dev.mysql.com/doc/refman/5.7/en/data-types.html

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
    id: 'O_DATATYPE',
    def: d[0][0]
  }
}%}

# =============================================================
# Integer data types
#
# https://dev.mysql.com/doc/refman/5.7/en/integer-types.html

O_INTEGER_DATATYPE -> (
    %K_INT
  | %K_INTEGER
  | %K_SMALLINT
  | %K_TINYINT
  | %K_MEDIUMINT
  | %K_BIGINT
) {% d => {
  return {
    id: 'O_INTEGER_DATATYPE',
    def: d[0][0].value
  }
}%}

# =============================================================
# Fixed-point data types
#
# https://dev.mysql.com/doc/refman/5.7/en/fixed-point-types.html

O_FIXED_POINT_DATATYPE -> (
  (%K_DECIMAL {% id %} | %K_NUMERIC {% id %})
  (
      _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }%}

    | _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3],
            decimals: 0
          }
        }%}
  ):?
) {% d => {
  return {
    id: 'O_FIXED_POINT_DATATYPE',
    def: {
      datatype: d[0][0],
      def: d[0][1]
    }
  }
}%}

# =============================================================
# Floating-point data types
#
# https://dev.mysql.com/doc/refman/5.7/en/floating-point-types.html

O_FLOATING_POINT_DATATYPE -> (
  (%K_FLOAT {% id %} | %K_DOUBLE {% id %})
  (
      _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }%}
  ):?
) {% d => {
  return {
    id: 'O_FLOATING_POINT_DATATYPE',
    def: {
      datatype: d[0][0],
      def: d[0][1]
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

O_DATETIME_DATATYPE ->
  ( %K_DATE {% id %} | %K_TIME {% id %} | %K_DATETIME {% id %} | %K_TIMESTAMP {% id %} )
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3] %} ):?
    {% d => {
      return {
        id: 'O_DATETIME_DATATYPE',
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

O_YEAR_DATATYPE -> _
  %K_YEAR
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3] %} ):? _
    {% d => {
      return {
        id: 'O_YEAR_DATATYPE',
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

O_FIXED_STRING_DATATYPE ->
  (
      %K_TINYBLOB
    | %K_BLOB
    | %K_MEDIUMBLOB
    | %K_LONGBLOB
    | %K_TINYTEXT
    | %K_TEXT
    | %K_MEDIUMTEXT
    | %K_LONGTEXT
  )
    {% d => {
      return {
        id: 'O_FIXED_STRING_DATATYPE',
        def: {
          datatype: d[0][0],
        }
      }
    }%}

# =============================================================
# Enum type
#
# https://dev.mysql.com/doc/refman/5.7/en/enum.html

O_ENUM_DATATYPE ->
  %K_ENUM
  ( _ %S_LPARENS _ %S_SQUOTE_STRING (_ %S_COMMA _ %S_SQUOTE_STRING _ {% d => d[4] %} ):* _ %S_RPARENS
    {% d => [d[4]].concat(d[6]) %}
  )
  {% d => {
    return {
      id: 'O_ENUM_DATATYPE',
      def: {
        datatype: d[0],
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
        {% d => [d[3]] %}
    | %S_LPARENS _ %S_SQUOTE_STRING (_ %S_COMMA _ %S_SQUOTE_STRING _ {% d => d[4] %} ):* _ %S_RPARENS
        {% d => Array.isArray(d[5]) ? [d[3]].concat(d[5]) : [d[3]] %}
  )
  {% d => {
    return {
      id: 'O_SET_DATATYPE',
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

O_SPATIAL_DATATYPE ->
  (
    %K_GEOMETRY
  | %K_POINT
  | %K_LINESTRING
  | %K_POLYGON
  | %K_MULTIPOINT
  | %K_MULTILINESTRING
  | %K_MULTIPOLYGON
  | %K_GEOMETRYCOLLECTION
) {% d => {
      return {
        id: 'O_SPATIAL_DATATYPE',
        def: {
          datatype: d[0][0],
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
        datatype: d[0],
      }
    }
  }%}


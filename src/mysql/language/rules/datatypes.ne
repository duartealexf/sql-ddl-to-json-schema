# =============================================================
# Data types
#
# https://mariadb.com/kb/en/library/data-types/

O_DATATYPE -> (
    O_INTEGER_DATATYPE          {% id %}
  | O_FIXED_POINT_DATATYPE      {% id %}
  | O_FLOATING_POINT_DATATYPE   {% id %}
  | O_BIT_DATATYPE              {% id %}
  | O_BOOLEAN_DATATYPE          {% id %}
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
# https://mariadb.com/kb/en/data-types-numeric-data-types/

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
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_FIXED_POINT_DATATYPE ->
  ( %K_DECIMAL {% id %} | %K_NUMERIC {% id %} )
  (
      _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
        {% d => {
          return {
            digits: d[3].value,
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
  const obj: any = {
    id: 'O_FIXED_POINT_DATATYPE',
    def: {
      datatype: d[0].value
    }
  }

  if (d[1]) {
    obj.def.digits = d[1].digits
    obj.def.decimals = d[1].decimals
  } else {
    obj.def.digits = 10
    obj.def.decimals = 0
  }

  return obj
}%}

# =============================================================
# Floating-point data types
#
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_FLOATING_POINT_DATATYPE ->
  ( %K_FLOAT {% id %} | %K_DOUBLE {% id %} )
  (
    _ %S_LPARENS _ %S_NUMBER _ %S_COMMA _ %S_NUMBER _ %S_RPARENS
      {% d => {
        return {
          digits: d[3].value,
          decimals: d[7].value
        }
      }%}
  ):?
{% d => {
  const obj: any = {
    id: 'O_FLOATING_POINT_DATATYPE',
    def: {
      datatype: d[0].value
    }
  }

  if (d[1]) {
    obj.def.digits = d[1].digits
    obj.def.decimals = d[1].decimals
  }

  return obj
}%}

# =============================================================
# Bit data types
#
# https://mariadb.com/kb/en/data-types-numeric-data-types/

O_BIT_DATATYPE ->
  %K_BIT ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS _ {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_BIT_DATATYPE',
        def: {
          datatype: d[0].value,
          length: d[1] ?? 1
        }
      }
    }%}

# =============================================================
# Boolean data types
#
# https://mariadb.com/kb/en/boolean/

O_BOOLEAN_DATATYPE -> (
    %K_BOOLEAN {% id %}
  | %K_BOOL {% id %}
)
  {% d => {
    return {
      id: 'O_BOOLEAN_DATATYPE',
      def: {
        datatype: d[0].value
      }
    }
  }%}

# =============================================================
# Datetime types
#
# https://mariadb.com/kb/en/date-and-time-data-types/

O_DATETIME_DATATYPE ->
  ( %K_DATE {% id %} | %K_TIME {% id %} | %K_DATETIME {% id %} | %K_TIMESTAMP {% id %} )
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_DATETIME_DATATYPE',
        def: {
          datatype: d[0].value,
          fractional: d[1] ?? 0
        }
      }
    }%}

# =============================================================
# Year type
#
# https://mariadb.com/kb/en/date-and-time-data-types/

O_YEAR_DATATYPE ->
  %K_YEAR
  ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
    {% d => {
      return {
        id: 'O_YEAR_DATATYPE',
        def: {
          datatype: d[0].value,
          digits: d[1] ?? 4
        }
      }
    }%}

# =============================================================
# Variable length string types
#
# https://mariadb.com/kb/en/string-data-types/

O_VARIABLE_STRING_DATATYPE -> (
    (
        %K_NCHAR {% d => d[0].value %}
      | %K_NATIONAL __ %K_CHAR {% d => d[0].value + ' ' + d[2].value %}
      | %K_CHARACTER {% d => d[0].value %}
      | %K_CHAR {% d => d[0].value %}
      | %K_BINARY {% d => d[0].value %}
    )
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
      {% d => {
        return {
          datatype: d[0],
          length: d[1] ?? 1
        }
      }%}
  | ( %K_VARCHAR {% id %} | %K_VARBINARY {% id %} )
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} )
      {% d => {
        return {
          datatype: d[0].value,
          length: d[1]
        }
      }%}
)
  {% d => {
    return {
      id: 'O_VARIABLE_STRING_DATATYPE',
      def: d[0]
    }
  }%}

# =============================================================
# Fixed length string types
#
# https://mariadb.com/kb/en/string-data-types/

O_FIXED_STRING_DATATYPE -> (
    ( %K_BLOB {% id %} | %K_TEXT {% id %} )
    ( _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS {% d => d[3].value %} ):?
      {% d => {
        return {
          datatype: d[0].value,
          length: d[1] ?? 65535
        }
      }%}
  | %K_TINYBLOB     {% d => { return { datatype: d[0].value, length: 255 }} %}
  | %K_MEDIUMBLOB   {% d => { return { datatype: d[0].value, length: 16777215 }} %}
  | %K_LONGBLOB     {% d => { return { datatype: d[0].value, length: 4294967295 }} %}
  | %K_TINYTEXT     {% d => { return { datatype: d[0].value, length: 255 }} %}
  | %K_MEDIUMTEXT   {% d => { return { datatype: d[0].value, length: 16777215 }} %}
  | %K_LONGTEXT     {% d => { return { datatype: d[0].value, length: 4294967295 }} %}
)
  {% d => {
    return {
      id: 'O_FIXED_STRING_DATATYPE',
      def: d[0]
    }
  }%}

# =============================================================
# Enum type
#
# Provided string variables cannot contain commas.
#
# https://mariadb.com/kb/en/string-data-types/

O_ENUM_DATATYPE ->
  %K_ENUM
  (
    _ %S_LPARENS _ %S_SQUOTE_STRING ( _ %S_COMMA _ %S_SQUOTE_STRING {% d => d[3].value %} ):* _ %S_RPARENS
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
# https://mariadb.com/kb/en/string-data-types/

O_SET_DATATYPE ->
  %K_SET
  (
    _ %S_LPARENS _ %S_SQUOTE_STRING ( _ %S_COMMA _ %S_SQUOTE_STRING {% d => d[3].value %} ):* _ %S_RPARENS
    {% d => [d[3].value].concat(d[4]) %}
  )
  {% d => {
    return {
      id: 'O_SET_DATATYPE',
      def: {
        datatype: d[0].value,
        values: d[1],
      }
    }
  }%}

# =============================================================
# Spatial types
#
# https://mariadb.com/kb/en/library/geometry-types/

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
# https://mariadb.com/kb/en/library/json-data-type/

O_JSON_DATATYPE -> %K_JSON
  {% d => {
    return {
      id: 'O_JSON_DATATYPE',
      def: {
        datatype: d[0].value,
      }
    }
  }%}


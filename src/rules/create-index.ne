# =============================================================
# Create index
#
# https://dev.mysql.com/doc/refman/5.7/en/create-index.html

P_CREATE_INDEX ->
  %K_CREATE
  (
      __ %K_UNIQUE                {% d => d[1] %}
    | __ %K_FULLTEXT              {% d => d[1] %}
    | __ %K_SPATIAL               {% d => d[1] %}
  ):?
  __ %K_INDEX __ S_IDENTIFIER
  ( __ P_INDEX_TYPE               {% d => d[1] %} ):?
  __ %K_ON __ S_IDENTIFIER
  (
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
      {% d => [d[3]].concat(d[4] || []) %}
  ):?
  ( _ P_INDEX_OPTION {% d => d[1] %} ):*
  (
      _ P_INDEX_ALGORITHM_OPTION  {% d => d[1] %}
    | _ P_LOCK_OPTION             {% d => d[1] %}
  ):*
  S_EOS
    {% d => {
      let type = d[1] ? (d[1].value + ' ') : '';
      type = type + d[3].value;

      return {
        id: 'P_CREATE_INDEX',
        def: {
          name: d[5],
          type,
          index: d[6],
          table: d[10],
          columns: d[11],
          options: (d[12] || []).concat(d[13] || [])
        }
      }
    }%}

# =============================================================
# Index column name, used to reference to foreign keys
#
# In MySQL docs this is the 'index_col_name'.

P_INDEX_COLUMN -> S_IDENTIFIER
  (
    _ %S_LPARENS _ %S_NUMBER _ %S_RPARENS
    ( _ %K_ASC {% d => d[1] %} | _ %K_DESC {% d => d[1] %} ):?
      {% d => {
        return {
          length: d[3].value,
          sort: d[6] ? d[6].value : null
        }
      }%}
  ):?
    {% d => {
      return {
        id: 'P_INDEX_COLUMN',
        def: {
          column: d[0],
          length: d[1] && d[1].length ? d[1].length : null,
          sort: d[1] && d[1].sort ? d[1].sort : null
        }
      }
    }%}

# =============================================================
# Index type
#
# In MySQL docs this is the 'index_type'.

P_INDEX_TYPE -> %K_USING __ ( %K_BTREE {% id %} | %K_HASH {% id %} )
  {% d => {
    return {
      id: 'P_INDEX_TYPE',
      def: d[2].value
    }
  }%}

# =============================================================
# Index option
#
# In MySQL docs this is the 'index_option'.

P_INDEX_OPTION -> (
    %K_KEY_BLOCK_SIZE ( __ | _ %S_EQUAL _ ) %S_NUMBER
    {% d => {
      return {
        keyBlockSize: d[2].value
      }
    }%}
  | P_INDEX_TYPE
    {% d => {
      return {
        indexType: d[0]
      }
    }%}
  | %K_WITH __ %K_PARSER __ S_IDENTIFIER
    {% d => {
      return {
        parser: d[4]
      }
    }%}
  | %K_COMMENT __ O_QUOTED_STRING
    {% d => {
      return {
        comment: d[2]
      }
    }%}
)
  {% d => {
    return {
      id: 'P_INDEX_OPTION',
      def: d[0]
    }
  }%}

# =============================================================
# Index algorithm option
#
# In MySQL docs this is the 'algorithm_option'.

P_INDEX_ALGORITHM_OPTION ->
  %K_ALGORITHM ( __ | _ %S_EQUAL _ )
  ( %K_DEFAULT {% id %} | %K_INPLACE {% id %} | %K_COPY {% id %} )
    {% d => {
      return {
        id: 'P_INDEX_ALGORITHM_OPTION',
        def: d[2].value
      }
    }%}

# =============================================================
# Index lock option
#
# In MySQL docs this is the 'lock_option'.

P_LOCK_OPTION ->
  %K_LOCK ( __ | _ %S_EQUAL _ )
  ( %K_DEFAULT {% id %} | %K_NONE {% id %} | %K_SHARED {% id %} | %K_EXCLUSIVE {% id %} )
    {% d => {
      return {
        id: 'P_LOCK_OPTION',
        def: d[2].value
      }
    }%}

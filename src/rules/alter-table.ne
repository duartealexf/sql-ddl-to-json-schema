# =============================================================
# Alter table
#
# https://dev.mysql.com/doc/refman/5.7/en/alter-table.html

P_ALTER_TABLE -> %K_ALTER __ %K_TABLE __ S_IDENTIFIER __
  P_ALTER_TABLE_SPECS ( _ %S_COMMA _ P_ALTER_TABLE_SPECS {% d => d[3] %} ):*
  S_EOS
    {% d => {
      return {
        id: 'P_ALTER_TABLE',
        def: {
          table: d[4],
          specs: [d[6]].concat(d[7])
        }
      }
    }%}

# =============================================================
# Alter table specifications
#
# In MySQL docs these options are 'alter_specification'.

P_ALTER_TABLE_SPECS ->
  P_CREATE_TABLE_OPTIONS:?
  ( _ O_ALTER_TABLE_SPEC {% d => d[1] %} ):?
    {% d => {
      return {
        id: 'P_ALTER_TABLE_SPECS',
        def: {
          tableOptions: d[0],
          spec: d[1]
        }
      }
    }%}

# =============================================================
# Options for alter table spec.
#
# In MySQL docs these options are in 'alter_specification'.

O_ALTER_TABLE_SPEC -> (
    %K_ADD ( __ %K_COLUMN ):? __ S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        return {
          action: 'addColumn',
          name: d[3],
          datatype: d[5],
          columnDefinition: d[6] || [],
          position: d[7]
        }
      }%}

  | %K_ADD ( __ %K_COLUMN ):?
    _ %S_LPARENS _
    (
      S_IDENTIFIER __ O_DATATYPE ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
      (
        _ %S_COMMA _ S_IDENTIFIER __ O_DATATYPE ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
          {% d => {
            return {
              name: d[3],
              datatype: d[5],
              columnDefinition: d[6] || []
            }
          }%}
      ):*
        {% d => {
          return [
            {
              name: d[0],
              datatype: d[2],
              columnDefinition: d[3] || []
            }
          ].concat(d[4])
        }%}
    )
    _ %S_RPARENS
      {% d => {
        return {
          action: 'addColumns',
          columns: d[5]
        }
      }%}

  | %K_ADD __ %K_INDEX
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addIndex',
          name: d[3],
          index: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ %K_KEY
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addKey',
          name: d[3],
          index: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_PRIMARY __ %K_KEY
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addPrimaryKey',
          symbol: d[2],
          index: d[6],
          columns: [d[10]].concat(d[11] || []),
          options: d[14]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_UNIQUE ( __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addUniqueKey',
            symbol: d[2],
            name: d[5],
            index: d[6],
            columns: [d[10]].concat(d[11] || []),
            options: d[14]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_UNIQUE __ %K_INDEX
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addUniqueIndex',
            symbol: d[2],
            name: d[6],
            index: d[7],
            columns: [d[11]].concat(d[12] || []),
            options: d[15]
        }
      }%}

  | %K_ADD __ ( %K_FULLTEXT {% id %} | %K_SPATIAL {% id %} )
    ( __ %K_INDEX {% d => d[1] %} | __ %K_KEY {% d => d[1] %} ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        let subject = type = '';

        /**
         * For some reason it parses "FULLTEXT KEY" in two ways:
         * 1. { type: 'FULLTEXT KEY', name: NULL }
         * 2. { type: 'FULLTEXT', name: 'KEY' }
         *
         * So we need this workaround below:
         */

        if (d[3]) {
          type = d[3].value;
        }

        if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
          type = d[4].toLowerCase();
          d[4] = null;
        }

        if (!type) {
          type = 'key';
        }

        subject = d[2].value.toLowerCase();

        subject = subject[0].toUpperCase() + subject.substr(1);
        type = type[0].toUpperCase() + type.substr(1);

        return {
          action: 'add' + subject + type,
          name: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_FOREIGN __ %K_KEY
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    _ P_COLUMN_REFERENCE
      {% d => {
        return {
          action: 'addForeignKey',
          symbol: d[2],
          name: d[6],
          columns: [d[10]].concat(d[11] || []),
          reference: d[15]
        }
      }%}

  | %K_ALGORITHM ( __ | _ %S_EQUAL _ )
    ( %K_DEFAULT {% id %} | %K_INPLACE {% id %} | %K_COPY {% id %} )
      {% d => {
        return {
          action: 'changeAlgorithm',
          algorithm: d[2].value
        }
      }%}

  | %K_ALTER __ ( %K_COLUMN __ ):? S_IDENTIFIER __ %K_SET __ %K_DEFAULT __ O_DEFAULT_VALUE
      {% d => {
        return {
          action: 'setDefaultColumnValue',
          column: d[3],
          value: d[9]
        }
      }%}

  | %K_ALTER __ ( %K_COLUMN __ ):? S_IDENTIFIER __ %K_DROP __ %K_DEFAULT
      {% d => {
        return {
          action: 'dropDefaultColumnValue',
          column: d[3]
        }
      }%}

  | %K_CHANGE __ ( %K_COLUMN __ ):? S_IDENTIFIER __ S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        return {
          action: 'changeColumn',
          column: d[3],
          newName: d[5],
          datatype: d[7],
          columnDefinition: d[8],
          position: d[9]
        }
      }%}

  | %K_MODIFY __ ( %K_COLUMN __ ):? S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        return {
          action: 'changeColumn',
          column: d[3],
          newName: null,
          datatype: d[5],
          columnDefinition: d[6],
          position: d[7]
        }
      }%}

  | ( %K_DEFAULT __ ):? %K_CHARACTER __ %K_SET ( __ | _ %S_EQUAL _ ) O_CHARSET
    ( __ %K_COLLATE ( __ | _ %S_EQUAL _ ) O_COLLATION {% d => d[3] %} ):?
      {% d => {
        return {
          action: 'changeCharacterSet',
          charset: d[5],
          collate: d[6]
        }
      }%}

  | %K_CONVERT __ %K_TO __ %K_CHARACTER __ %K_SET __ O_CHARSET
    ( __ %K_COLLATE __ O_COLLATION {% d => d[3] %} ):?
      {% d => {
        return {
          action: 'convertToCharacterSet',
          charset: d[8],
          collate: d[9]
        }
      }%}

  | %K_ENABLE __ %K_KEYS
      {% d => {
        return {
          action: 'enableKeys'
        }
      }%}

  | %K_DISABLE __ %K_KEYS
      {% d => {
        return {
          action: 'disableKeys'
        }
      }%}

  | %K_DISCARD __ %K_TABLESPACE
      {% d => {
        return {
          action: 'discardTablespace'
        }
      }%}

  | %K_IMPORT __ %K_TABLESPACE
      {% d => {
        return {
          action: 'importTablespace'
        }
      }%}

  | %K_DROP __ ( %K_COLUMN __ ):? S_IDENTIFIER
      {% d => {
        return {
          action: 'dropColumn',
          column: d[3]
        }
      }%}

  | %K_DROP __ %K_INDEX __ S_IDENTIFIER
      {% d => {
        return {
          action: 'dropIndex',
          index: d[4]
        }
      }%}

  | %K_DROP __ %K_KEY __ S_IDENTIFIER
      {% d => {
        return {
          action: 'dropKey',
          key: d[4]
        }
      }%}

  | %K_DROP __ %K_PRIMARY __ %K_KEY
      {% d => {
        return {
          action: 'dropPrimaryKey'
        }
      }%}

  | %K_DROP __ %K_FOREIGN __ %K_KEY __ S_IDENTIFIER
      {% d => {
        return {
          action: 'dropForeignKey',
          key: d[6]
        }
      }%}

  | %K_FORCE
      {% d => {
        return {
          action: 'force'
        }
      }%}

  | %K_LOCK ( __ | _ %S_EQUAL _ )
    ( %K_DEFAULT {% id %} | %K_NONE {% id %} | %K_SHARED {% id %} | %K_EXCLUSIVE {% id %} )
      {% d => {
        return {
          action: 'changeLock',
          lock: d[2].value
        }
      }%}

  | %K_ORDER __ %K_BY __ S_IDENTIFIER ( _ %S_COMMA _ S_IDENTIFIER {% d => d[3] %} ):*
      {% d => {
        return {
          action: 'orderBy',
          columns: [d[4]].concat(d[5] || [])
        }
      }%}

  | %K_RENAME __ %K_INDEX __ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
      {% d => {
        return {
          action: 'renameIndex',
          index: d[4],
          newName: d[8]
        }
      }%}

  | %K_RENAME __ %K_KEY __ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
      {% d => {
        return {
          action: 'renameKey',
          key: d[4],
          newName: d[8]
        }
      }%}

  | %K_RENAME __ ( %K_TO __ | %K_AS __ ):? S_IDENTIFIER
      {% d => {
        return {
          action: 'rename',
          newName: d[3]
        }
      }%}

  | %K_WITH __ %K_VALIDATION
      {% d => {
        return {
          action: 'withValidation'
        }
      }%}

  | %K_WITHOUT __ %K_VALIDATION
      {% d => {
        return {
          action: 'withoutValidation'
        }
      }%}
)
  {% d => {
    return {
      id: 'O_ALTER_TABLE_SPEC',
      def: d[0]
    }
  }%}

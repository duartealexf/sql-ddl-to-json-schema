# =============================================================
# Alter table
#
# https://mariadb.com/kb/en/library/alter-table/

P_ALTER_TABLE -> %K_ALTER __
  ( %K_ONLINE __ ):?
  ( %K_IGNORE __ ):?
  %K_TABLE __ S_IDENTIFIER __
  ( %K_WAIT __ %S_NUMBER __ | %K_NOWAIT __ ):?
  P_ALTER_TABLE_SPECS ( _ %S_COMMA _ P_ALTER_TABLE_SPECS {% d => d[3] %} ):*
  S_EOS
    {% d => {
      return {
        id: 'P_ALTER_TABLE',
        def: {
          table: d[6],
          specs: [d[9]].concat(d[10])
        }
      }
    }%}

# =============================================================
# Alter table specifications
#
# In docs these options are 'alter_specification'.

P_ALTER_TABLE_SPECS -> (
    P_CREATE_TABLE_OPTIONS
      {% d => {
        return { tableOptions: d[0] }
      }%}
  | O_ALTER_TABLE_SPEC
      {% d => {
        return { spec: d[0] }
      }%}
)
    {% d => {
      return {
        id: 'P_ALTER_TABLE_SPECS',
        def: d[0]
      }
    }%}

# =============================================================
# Options for alter table spec.
#
# In docs these options are in 'alter_specification'.

O_ALTER_TABLE_SPEC -> (
    %K_ADD ( __ %K_COLUMN ):? __ S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    ( __ P_COLUMN_REFERENCE {% d => d[1] %} ):?
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        const obj = {
          action: 'addColumn',
          name: d[3],
          datatype: d[5],
          columnDefinition: d[6] || [],
          position: d[8],
        };

        if (d[7]) {
          obj.reference = d[7];
        }

        return obj;
      }%}

  | %K_ADD ( __ %K_COLUMN ):?
    _ %S_LPARENS _
    (
      S_IDENTIFIER __ O_DATATYPE
      ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
      ( __ P_COLUMN_REFERENCE {% d => d[1] %} ):?
      (
        _ %S_COMMA _ S_IDENTIFIER __ O_DATATYPE
        ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
        ( __ P_COLUMN_REFERENCE {% d => d[1] %} ):?
          {% d => {
            const obj = {
              name: d[3],
              datatype: d[5],
              columnDefinition: d[6] || [],
            };

            if (d[7]) {
              obj.reference = d[7];
            }

            return obj;
          }%}
      ):*
        {% d => {
          const obj = {
            name: d[0],
            datatype: d[2],
            columnDefinition: d[3] || [],
          };

          if (d[4]) {
            obj.reference = d[4];
          }

          return [obj].concat(d[5] || [])
        }%}
    )
    _ %S_RPARENS
      {% d => {
        return {
          action: 'addColumns',
          columns: d[5]
        }
      }%}

  | %K_ADD __ ( %K_INDEX | %K_KEY )
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

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):? %K_PRIMARY __ %K_KEY
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {
        return {
          action: 'addPrimaryKey',
          name: d[2],
          index: d[6],
          columns: [d[10]].concat(d[11] || []),
          options: d[14]
        }
      }%}

  | %K_ADD __ ( %K_CONSTRAINT ( __ S_IDENTIFIER {% d => d[1] %} ):? __ {% d => d[1] %} ):?
    %K_UNIQUE
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    ( __ P_INDEX_TYPE {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[5] && ['index', 'key'].includes(d[5].toLowerCase())) {
          d[5] = null;
        }

        return {
          action: 'addUniqueKey',
            name: d[2],
            index: d[6],
            columns: [d[10]].concat(d[11] || []),
            options: d[14]
        }
      }%}

  | %K_ADD __ %K_FULLTEXT
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
          d[4] = null;
        }

        return {
          action: 'addFulltextIndex',
          name: d[4],
          columns: [d[8]].concat(d[9] || []),
          options: d[12]
        }
      }%}

  | %K_ADD __ %K_SPATIAL
    ( __ %K_INDEX | __ %K_KEY ):?
    ( __ S_IDENTIFIER {% d => d[1] %} ):?
    _ %S_LPARENS _ P_INDEX_COLUMN ( _ %S_COMMA _ P_INDEX_COLUMN {% d => d[3] %} ):* _ %S_RPARENS
    ( _ O_INDEX_OPTION {% d => d[1] %} ):*
      {% d => {

        /**
         * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
         */

        if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
          d[4] = null;
        }

        return {
          action: 'addSpatialIndex',
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
          name: d[2],
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

  | %K_ALTER __ ( %K_COLUMN __ ):? S_IDENTIFIER __ %K_SET __ %K_DEFAULT __ ( O_DEFAULT_VALUE {% d => d[0] %} | O_DEFAULT_EXP_VALUE {% d => d[0] %})
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
    ( __ P_COLUMN_REFERENCE {% d => d[1] %} ):?
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        const obj = {
          action: 'changeColumn',
          column: d[3],
          newName: d[5],
          datatype: d[7],
          columnDefinition: d[8],
          position: d[10],
        }

        if (d[9]) {
          obj.reference = d[9];
        }

        return obj;
      }%}

  | %K_MODIFY __ ( %K_COLUMN __ ):? S_IDENTIFIER __ O_DATATYPE
    ( __ O_COLUMN_DEFINITION {% d => d[1] %} ):*
    ( __ P_COLUMN_REFERENCE {% d => d[1] %} ):?
    (
        __ %K_FIRST {% d => { return { after: null }} %}
      | __ %K_AFTER __ S_IDENTIFIER {% d => { return { after: d[3] }} %}
    ):?
      {% d => {
        const obj = {
          action: 'changeColumn',
          column: d[3],
          newName: null,
          datatype: d[5],
          columnDefinition: d[6],
          position: d[8],
        };

        if (d[7]) {
          obj.reference = d[7];
        }

        return obj;
      }%}

  | %K_CONVERT __ %K_TO __ ( %K_CHARACTER __ %K_SET | %K_CHARSET ) __ O_CHARSET
    ( __ %K_COLLATE __ O_COLLATION {% d => d[3] %} ):?
      {% d => {
        return {
          action: 'convertToCharacterSet',
          charset: d[6],
          collate: d[7]
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

  | %K_DROP __ ( %K_COLUMN __ ):? ( %K_IF __ %K_EXISTS __ ):? S_IDENTIFIER
      {% d => {
        return {
          action: 'dropColumn',
          column: d[4]
        }
      }%}

  | %K_DROP __ ( %K_INDEX | %K_KEY ) __ S_IDENTIFIER
      {% d => {
        return {
          action: 'dropIndex',
          index: d[4]
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

  | %K_RENAME __ ( %K_INDEX | %K_KEY ) __ S_IDENTIFIER __ %K_TO __ S_IDENTIFIER
      {% d => {
        return {
          action: 'renameIndex',
          index: d[4],
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

  | %K_ADD __ %K_PERIOD __ %K_FOR __ %K_SYSTEM_TIME
    _ %S_LPARENS _ S_IDENTIFIER _ %S_COMMA _ S_IDENTIFIER _ %S_RPARENS
      {% d => {
        return {
          action: 'addPeriodForSystemTime',
          startColumnName: d[10],
          endColumnName: d[14]
        }
      }%}
)
  {% d => {
    return {
      id: 'O_ALTER_TABLE_SPEC',
      def: d[0]
    }
  }%}

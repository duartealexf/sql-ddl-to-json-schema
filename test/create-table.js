const ava = require('ava');
const Parser = require('../lib');

const tests = {
  'Should create test table with int, varchar, not null, default, and null.': {
    queries: [
      'CREATE TABLE `test` (`age` INT NULL DEFAULT 18, `name` VARCHAR(12) NOT NULL)',
    ],
    expect: {
      'id': 'MAIN',
      'def': [
        {
          'id': 'P_DDS',
          'def': {
            'id': 'P_CREATE_TABLE',
            'def': {
              'table': 'test',
              'def': {
                'id': 'O_CREATE_TABLE_DEFINITION',
                'def': [
                  { 'id': 'O_CREATE_TABLE_DEFINITION_SPEC',
                    'def': {
                      'column': 'age',
                      'datatype': {
                        'id': 'O_DATATYPE',
                        'def': {
                          'id': 'O_INTEGER_DATATYPE',
                          'def': 'INT'
                        }
                      },
                      'def': [
                        {
                          'id': 'O_COLUMN_DEFINITION_COMMON',
                          'def': {
                            'nullable': true
                          }
                        },
                        {
                          'id': 'O_COLUMN_DEFINITION_COMMON',
                          'def': {
                            'default': 18
                          }
                        }
                      ]
                    }
                  },
                  {
                    'id': 'O_CREATE_TABLE_DEFINITION_SPEC',
                    'def': {
                      'column': 'name',
                      'datatype': {
                        'id': 'O_DATATYPE',
                        'def': {
                          'id': 'O_VARIABLE_STRING_DATATYPE',
                          'def': {
                            'datatype': 'VARCHAR',
                            'length': 12
                          }
                        }
                      },
                      'def': [
                        {
                          'id': 'O_COLUMN_DEFINITION_COMMON',
                          'def': {
                            'nullable': false
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
};

Object.getOwnPropertyNames(tests).forEach(description => {
  const test = tests[description];

  test.queries.forEach(query => {

    const testname = `${description} | ${query}`;

    const parser = new Parser();
    parser.feed(query);

    ava(testname, t => {
      const value = parser.results;
      t.deepEqual(value, test.expect);
    });
  });
});

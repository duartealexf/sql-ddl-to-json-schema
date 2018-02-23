const ava = require('ava');
const Parser = require('../lib');

const tests = {
  'Should create test database': {
    queries: [
      'CREATE DATABASE test;',
      'CREATE OR replace DATABASE test;',
      'create database test;',
      'create SCHEMA `test`;',
      `create
        schema
        test
      ;`,
    ],
    expect: {
      id: 'MAIN',
      def: [
        {
          id: 'P_DDS',
          def: {
            id: 'P_CREATE_DB',
            def: {
              database: 'test',
              meta: []
            }
          }
        }
      ]
    }
  },

  'Should create test database with charset utf8': {
    queries: [
      'CREATE DATABASE test DEFAULT CHARACTER SET utf8;',
      'CREATE DATABASE test CHARACTER SET utf8;',
      'CREATE DATABASE test CHARACTER SET = "utf8";',
      'CREATE DATABASE test CHARACTER SET =`utf8`;',
      "CREATE DATABASE test CHARACTER SET= 'utf8';",
    ],
    expect: {
      id: 'MAIN',
      def: [
        {
          id: 'P_DDS',
          def: {
            id: 'P_CREATE_DB',
            def: {
              database: 'test',
              meta: [
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    charset: 'utf8'
                  }
                }
              ]
            }
          }
        }
      ]
    }
  },

  'Should create test database with collation utf8_general_ci': {
    queries: [
      'CREATE DATABASE test COLLATE utf8_general_ci;',
      'CREATE DATABASE test DEFAULT COLLATE = `utf8_general_ci`;',
      'CREATE DATABASE test DEFAULT COLLATE ="utf8_general_ci";',
      "CREATE DATABASE test DEFAULT COLLATE= 'utf8_general_ci';",
    ],
    expect: {
      id: 'MAIN',
      def: [
        {
          id: 'P_DDS',
          def: {
            id: 'P_CREATE_DB',
            def: {
              database: 'test',
              meta: [
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    collation: 'utf8_general_ci'
                  }
                }
              ]
            }
          }
        }
      ]
    }
  },

  'Should create test database with charset utf8 and collation utf8_general_ci': {
    queries: [
      'CREATE DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;',
    ],
    expect: {
      id: 'MAIN',
      def: [
        {
          id: 'P_DDS',
          def: {
            id: 'P_CREATE_DB',
            def: {
              database: 'test',
              meta: [
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    charset: 'utf8',
                  }
                },
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    collation: 'utf8_general_ci'
                  }
                }
              ]
            }
          }
        }
      ]
    }
  },

  'Should create test database with collation utf8_general_ci and charset utf8': {
    queries: [
      'CREATE DATABASE test COLLATE utf8_general_ci CHARACTER SET utf8;',
    ],
    expect: {
      id: 'MAIN',
      def: [
        {
          id: 'P_DDS',
          def: {
            id: 'P_CREATE_DB',
            def: {
              database: 'test',
              meta: [
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    collation: 'utf8_general_ci'
                  }
                },
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    charset: 'utf8',
                  }
                }
              ]
            }
          }
        }
      ]
    }
  },

  'Should create test database even when having two collate options.': {
    queries: [
      'CREATE DATABASE test COLLATE utf8_cirylic_ci CHARACTER SET utf8 COLLATE utf8_general_ci;',
    ],
    expect: {
      id: 'MAIN',
      def: [
        {
          id: 'P_DDS',
          def: {
            id: 'P_CREATE_DB',
            def: {
              database: 'test',
              meta: [
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    collation: 'utf8_cirylic_ci'
                  }
                },
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    charset: 'utf8',
                  }
                },
                {
                  id: 'O_CREATE_DB_SPEC',
                  def: {
                    collation: 'utf8_general_ci'
                  }
                }
              ]
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

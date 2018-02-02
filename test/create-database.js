const ava = require('ava');
const Parser = require('../lib');

const tests = {
  'Should create test database': {
    queries: [
      'CREATE DATABASE test',
      'create database test',
      'CREATE DATABASE `test` CHARACTER SET utf8;',
      'CREATE DATABASE test COLLATE `utf8`;',
      'CREATE DATABASE test DEFAULT CHARACTER SET "utf8";',
      "CREATE DATABASE test DEFAULT COLLATE 'utf8';",
      'CREATE DATABASE test DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;',
      'CREATE DATABASE test CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;',
      'CREATE DATABASE test DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;',
      'CREATE DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;',
      'CREATE DATABASE test DEFAULT COLLATE utf8_general_ci DEFAULT CHARACTER SET utf8;',
      'CREATE DATABASE test COLLATE utf8_general_ci DEFAULT CHARACTER SET utf8;',
      'CREATE DATABASE test DEFAULT COLLATE utf8_general_ci CHARACTER SET utf8;',
      'CREATE DATABASE test COLLATE utf8_general_ci CHARACTER SET utf8;',
    ],
    expect: {
      type: 'main',
      def: [
        {
          type: 'P_DDS',
          def: {
            type: 'P_CREATE_DB',
            def: {
              database: 'test'
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


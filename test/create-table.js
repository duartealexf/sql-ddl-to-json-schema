const ava = require('ava');
const Parser = require('../lib');

const tests = {
  'Should create test database with null specs': {
    queries: [
      'CREATE TABLE test (test test)', // WIP!
    ],
    expect: {
      type: 'MAIN',
      def: [
        {
          type: 'P_DDS',
          def: {
            type: 'P_CREATE_TABLE',
            def: {
              table: 'test',
              spec: {
                type: 'P_SPEC_CREATE_TABLE',
                def: {
                  column: 'test'
                }
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

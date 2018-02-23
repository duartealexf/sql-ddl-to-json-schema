const ava = require('ava');
const Parser = require('../../lib');

const tests = {
  'Should drop test database': {
    queries: [
      'DROP DATABASE test;',
      'drop database test;',
      'drop SCHEMA `test`;',
      `drop
        schema
        test
      ;`,
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_DROP_DB",
            def: "test"
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

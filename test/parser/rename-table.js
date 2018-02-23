const ava = require('ava');
const Parser = require('../../lib');

const tests = {
  'Should rename one table.': {
    queries: [
      'RENAME TABLE people TO persons;',
      'rename table people to persons;'
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_RENAME_TABLE",
            def: [
              {
                table: "people",
                newName: "persons"
              }
            ]
          }
        }
      ]
    }
  },

  'Should rename several tables.': {
    queries: [
      'rename table people to persons, homes to houses,cats to pets ,test to tests;',
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_RENAME_TABLE",
            def: [
              {
                table: "people",
                newName: "persons"
              },
              {
                table: "homes",
                newName: "houses"
              },
              {
                table: "cats",
                newName: "pets"
              },
              {
                table: "test",
                newName: "tests"
              }
            ]
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

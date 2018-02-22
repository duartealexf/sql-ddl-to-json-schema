const ava = require('ava');
const Parser = require('../lib');

const tests = {
  'Should drop people table': {
    queries: [
      'DROP TABLE people;',
      'drop table people;',
      'drop temporary table people;',
      'drop temporary table if exists people;',
      'drop temporary table if exists people restrict;',
      'drop temporary table if exists people cascade;',
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_DROP_TABLE",
            def: [
              "people"
            ]
          }
        }
      ]
    }
  },

  'Should drop several tables': {
    queries: [
      'DROP TABLE people, cars,pets ,test;',
      'drop table people, cars,pets ,test;',
      'drop temporary table people, cars,pets ,test;',
      'drop temporary table if exists people, cars,pets ,test;',
      'drop temporary table if exists people, cars,pets ,test restrict;',
      'drop temporary table if exists people, cars,pets ,test cascade;',
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_DROP_TABLE",
            def: [
              "people",
              "cars",
              "pets",
              "test"
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

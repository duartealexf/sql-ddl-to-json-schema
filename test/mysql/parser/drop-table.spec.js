const runner = require('../runner');

runner.run({
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
});

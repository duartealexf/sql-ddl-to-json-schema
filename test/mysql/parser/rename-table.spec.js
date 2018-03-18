const runner = require('../runner');

runner.run({
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
});

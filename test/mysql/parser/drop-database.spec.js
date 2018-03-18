const runner = require('../runner');

runner.run({
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
});

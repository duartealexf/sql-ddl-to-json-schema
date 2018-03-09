const runner = require('../runner');

runner.run({
  'Should drop index.': {
    queries: [
      'drop index i_oid on people;',
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_DROP_INDEX",
            def: {
              index: "i_oid",
              table: "people",
              options: null
            }
          }
        }
      ]
    }
  },

  'Should drop index with algorithm option.': {
    queries: [
      'drop index i_oid on people algorithm default;',
      'drop index i_oid on people algorithm=default;',
      'drop index i_oid on people algorithm = default;',
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_DROP_INDEX",
            def: {
              index: "i_oid",
              table: "people",
              options: {
                id: "P_INDEX_ALGORITHM_OPTION",
                def: "default"
              }
            }
          }
        }
      ]
    }
  },

  'Should drop index with lock option': {
    queries: [
      'drop index i_oid on people lock default;',
      'drop index i_oid on people lock=default;',
      'drop index i_oid on people lock = default;',
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_DROP_INDEX",
            def: {
              index: "i_oid",
              table: "people",
              options: {
                id: "P_LOCK_OPTION",
                def: "default"
              }
            }
          }
        }
      ]
    }
  }
});

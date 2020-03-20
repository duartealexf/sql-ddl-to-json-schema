const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should drop index.': {
    queries: [
      'drop index i_oid on people;',
    ],
    expect: join(__dirname, 'expect', 'drop-index', '0.json')
  },

  'Parser: Should drop index with algorithm option.': {
    queries: [
      'drop index i_oid on people algorithm default lock none;',
      'drop index i_oid on people algorithm=default lock=none;',
      'drop index i_oid on people algorithm = default lock = none;',
    ],
    expect: join(__dirname, 'expect', 'drop-index', '1.json')
  },

  'Parser: Should drop index with lock option': {
    queries: [
      'drop index i_oid on people lock default;',
      'drop index i_oid on people lock=default;',
      'drop index i_oid on people lock = default;',
    ],
    expect: join(__dirname, 'expect', 'drop-index', '2.json')
  }
});

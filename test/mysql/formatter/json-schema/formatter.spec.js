const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const sql = [
  createTable,
];

runner.run(query => parseHandler.getJSONSchemaFormat(query, { useRef: true }), {
  'JSON Schema formatter: should format tables correctly.': {
    queries: [
      sql.join('')
    ],
    expect: join(__dirname, 'expect', '0.json'),
  },
});

runner.run(query => parseHandler.getJSONSchemaFormat(query, { useRef: false }), {
  'JSON Schema formatter: should format tables correctly.': {
    queries: [
      sql.join('')
    ],
    expect: join(__dirname, 'expect', '1.json'),
  },
});


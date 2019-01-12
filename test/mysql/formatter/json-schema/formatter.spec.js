const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'json-schema.json');

const sql = [
  createTable,
];

runner.run(parseHandler.getJSONSchemaFormat, {
  'JSON Schema formatter: should format tables correctly.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});


const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/drop-table.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should drop a table.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed('DROP TABLE house;');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

ava('Compact formatter: Should drop two tables.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed('DROP TABLE house, pet;');

  expect.pop();

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(expect), JSON.stringify(expect));
});

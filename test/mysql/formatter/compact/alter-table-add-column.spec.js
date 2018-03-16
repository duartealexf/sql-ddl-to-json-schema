const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-column.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, adding columns in different positions.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person ADD is_married BOOLEAN AFTER suffix;');
  parser.feed('ALTER TABLE person ADD uuid VARCHAR(36) FIRST;');
  parser.feed('ALTER TABLE person ADD updated_at TIMESTAMP;');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

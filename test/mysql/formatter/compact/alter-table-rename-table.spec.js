const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-rename-table.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, renaming it.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person RENAME TO people;');
  parser.feed('ALTER TABLE pet RENAME AS dog;');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

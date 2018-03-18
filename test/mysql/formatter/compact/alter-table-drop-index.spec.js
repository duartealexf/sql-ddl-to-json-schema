const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-drop-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, dropping index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person DROP INDEX primary;');
  parser.feed('ALTER TABLE person DROP INDEX unique_motto;');
  parser.feed('ALTER TABLE person DROP INDEX fi_initials;');
  parser.feed('ALTER TABLE pet DROP INDEX i_dimensions;');
  parser.feed('ALTER TABLE house DROP KEY coords;');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

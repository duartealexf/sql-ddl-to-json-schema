const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-rename-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, renaming index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person RENAME INDEX unique_motto TO unq_motto;');
  parser.feed('ALTER TABLE person RENAME KEY fi_initials TO fidx_initials;');
  parser.feed('ALTER TABLE pet RENAME INDEX i_dimensions TO idx_dimensions;');
  parser.feed('ALTER TABLE house RENAME INDEX coords TO placement;');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-rename-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, renaming index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person RENAME INDEX u_motto TO unq_motto;');
  parser.feed('ALTER TABLE person RENAME KEY fi_initials TO fidx_initials;');
  parser.feed('ALTER TABLE pet RENAME INDEX i_dimensions TO idx_dimensions;');
  parser.feed('ALTER TABLE house RENAME INDEX coords TO placement;');

  // Shouldn't rename unexisting index.
  parser.feed('ALTER TABLE house RENAME INDEX xyz TO abc;');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-rename-index.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});

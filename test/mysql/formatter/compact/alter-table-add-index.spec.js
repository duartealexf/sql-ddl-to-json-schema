const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, adding index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE house ADD INDEX idx_built (is_built (1) asc, is_apartment (2)) KEY_BLOCK_SIZE = 16 USING BTREE WITH PARSER myParser COMMENT "formatter test";');
  parser.feed('ALTER TABLE house ADD KEY (where);');

  // Should not add key or index with same name.
  parser.feed('ALTER TABLE house ADD INDEX idx_built (is_built);');

  // Should not add key or index for unexisting table.
  parser.feed('ALTER TABLE abcxyz ADD INDEX idx_built (is_built);');

  // Should not add key or index for unexisting table column.
  parser.feed('ALTER TABLE house ADD INDEX idx_built (abcxyz);');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-add-index.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});


const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, adding index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE house ADD INDEX idx_built (is_built (1) asc, is_apartment (2)) KEY_BLOCK_SIZE = 16 USING BTREE WITH PARSER myParser COMMENT "formatter test";');
  parser.feed('ALTER TABLE house ADD KEY (where);');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});


const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-unique-key.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, adding unique key.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE pet ADD CONSTRAINT uq_birth UNIQUE KEY unique_birth (birth(12) desc, status(1)) KEY_BLOCK_SIZE 64 USING BTREE WITH PARSER uniqueParser COMMENT "unique formatter test";');
  parser.feed('ALTER TABLE pet ADD CONSTRAINT UNIQUE INDEX (history);');
  parser.feed('ALTER TABLE pet ADD UNIQUE KEY INDEX (shape);');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

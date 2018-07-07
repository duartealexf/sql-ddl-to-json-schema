const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-column.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, adding columns in different positions.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person ADD COLUMN test1 TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING FIRST;');
  parser.feed('ALTER TABLE person ADD COLUMN test2 BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC AFTER sequence;');
  parser.feed('ALTER TABLE person ADD COLUMN test3 TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar);');
  parser.feed('ALTER TABLE person ADD COLUMN test3 JSON COMMENT "duplicate, should not be added";');

  // Shouldn't add a column with autoincrement if there is another one with autoincrement in table.
  parser.feed('ALTER TABLE person ADD COLUMN id2 int(8) AUTO_INCREMENT;');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-add-column.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});

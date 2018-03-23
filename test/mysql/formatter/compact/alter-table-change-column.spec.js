const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-change-column.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, changing column.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person CHANGE COLUMN weight width TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 AUTO_INCREMENT UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING FIRST;');
  parser.feed('ALTER TABLE person CHANGE COLUMN status is_alive BOOLEAN NOT NULL KEY COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC AFTER sequence;');
  parser.feed('ALTER TABLE person CHANGE COLUMN avatar photo TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar);');
  parser.feed('ALTER TABLE pet MODIFY COLUMN year TINYINT;');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-change-column.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});

const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-columns.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, adding columns.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed(`
  ALTER TABLE person ADD COLUMN (
    test1 TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 AUTO_INCREMENT UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING,
    test2 BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC,
    test3 TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar),
    test3 JSON COMMENT "duplicate, should not be added"
  );
  `);

  // Shouldn't add autoincrement without being a primary key.
  parser.feed('ALTER TABLE pet ADD COLUMN xyzabc INT(11) AUTO_INCREMENT;');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-add-columns.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});

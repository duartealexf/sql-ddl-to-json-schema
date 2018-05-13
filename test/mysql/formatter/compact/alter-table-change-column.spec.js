const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-change-column.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, changing column.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  /**
   * Positive assertions.
   */

  parser.feed('ALTER TABLE person CHANGE COLUMN weight size TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING FIRST;');
  parser.feed('ALTER TABLE person CHANGE COLUMN status is_alive BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC AFTER sequence;');
  parser.feed('ALTER TABLE pet MODIFY COLUMN year TINYINT;');

  // Should ignore foreign key reference.
  parser.feed('ALTER TABLE person CHANGE COLUMN avatar photo TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar);');

  // Should ignore duplicate unique option.
  parser.feed('ALTER TABLE person CHANGE COLUMN motto my_text TEXT(50) UNIQUE;');

  // Should rename primary and foreign key column reference.
  parser.feed('ALTER TABLE person CHANGE COLUMN id code INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT "primary key test";');

  // Should rename fulltext index column reference.
  parser.feed('ALTER TABLE person CHANGE COLUMN initials letters CHAR(3) COLUMN_FORMAT FIXED;');

  // Should rename unique key column reference.
  parser.feed('ALTER TABLE person CHANGE COLUMN my_text phrase TEXT(100);');

  // Should rename foreign key column reference.
  parser.feed('ALTER TABLE pet CHANGE COLUMN height height_num DECIMAL;');

  // Should rename index column reference.
  parser.feed('ALTER TABLE pet CHANGE COLUMN birth birth_datetime DATETIME;');

  // Should rename spatial index column reference.
  parser.feed('ALTER TABLE house CHANGE COLUMN coordx x_axis FLOAT(6,2);');


  /**
   * Negative assertions.
   */

  // Shouldn't change a column to autoincrement if there is another one with autoincrement in table.
  parser.feed('ALTER TABLE person CHANGE COLUMN ssn int(10) AUTO_INCREMENT;');

  // Shouldn't change a column, moving it after unexisting column.
  parser.feed('ALTER TABLE pet CHANGE COLUMN year year TINYINT after xyz;');

  // Shouldn't change a column if it tries to add a second primary key.
  parser.feed('ALTER TABLE person CHANGE COLUMN size size INT(8) primary key;');

  // Shouldn't change unexisting column.
  parser.feed('ALTER TABLE person CHANGE COLUMN xyz abc INT(8) NOT NULL;');

  // Shouldn't change column adding a second autoincrement.
  parser.feed('ALTER TABLE person CHANGE COLUMN size size INT(8) AUTO_INCREMENT;');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-change-column.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});

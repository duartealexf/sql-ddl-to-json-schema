const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const sql = [
  createTable,
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Compact formatter: Should alter table, changing columns.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN weight size TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT NULL UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING FIRST;',
        'ALTER TABLE person CHANGE COLUMN status is_alive BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC AFTER sequence;',
        'ALTER TABLE pet MODIFY COLUMN year TINYINT DEFAULT NOW();',
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '0.json'),
  },

  'Compact formatter: Alter table change column should ignore foreign key reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN avatar photo TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar);',
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '1.json'),
  },

  'Compact formatter: Alter table change column should ignore duplicate unique option.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN motto my_text TEXT(50) UNIQUE;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '2.json'),
  },

  'Compact formatter: Alter table change column should rename primary and foreign key column reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN id code INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT "primary key test";'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '3.json')
  },

  'Compact formatter: Alter table change column should rename fulltext index column reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN initials letters CHAR(3) COLUMN_FORMAT FIXED;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '4.json'),
  },

  'Compact formatter: Alter table change column should rename unique key column reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN motto phrase TEXT(100);'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '5.json'),
  },

  'Compact formatter: Alter table change column should rename foreign key column reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE pet CHANGE COLUMN height height_num DECIMAL;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '6.json'),
  },

  'Compact formatter: Alter table change column should rename index column reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE pet CHANGE COLUMN birth birth_datetime DATETIME;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '7.json'),
  },

  'Compact formatter: Alter table change column should rename spatial index column reference.': {
    queries: [
      sql.concat([
        'ALTER TABLE house CHANGE COLUMN coordx x_axis FLOAT(6,2);'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '8.json'),
  },

  'Compact formatter: Alter table change column should not change a column to autoincrement if there is another one with autoincrement in table.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN ssn int(10) AUTO_INCREMENT;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '9.json'),
  },

  'Compact formatter: Alter table change column should not change a column, moving it after unexisting column.': {
    queries: [
      sql.concat([
        'ALTER TABLE pet CHANGE COLUMN year year TINYINT after xyz;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '10.json'),
  },

  'Compact formatter: Alter table change column should not change a column if it tries to add a second primary key.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN size size INT(8) primary key;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '11.json'),
  },

  'Compact formatter: Alter table change column should not change unexisting column.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN xyz abc INT(8) NOT NULL;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '12.json'),
  },

  'Compact formatter: Alter table change column should not change column adding a second autoincrement.': {
    queries: [
      sql.concat([
        'ALTER TABLE person CHANGE COLUMN size size INT(8) AUTO_INCREMENT;'
      ]).join('')
    ],
    expect: join(__dirname, 'expect', 'alter-table-change-column', '13.json'),
  },
});

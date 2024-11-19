import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable];

run(getCompactFormat, {
  'Compact formatter: Compact formatter: Should alter table, changing columns.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE person CHANGE COLUMN weight size TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT NULL UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING FIRST;',
          'ALTER TABLE person CHANGE COLUMN status is_alive BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC AFTER sequence;',
          'ALTER TABLE pet MODIFY COLUMN year TINYINT DEFAULT NOW();',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table change column should ignore foreign key reference.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE person CHANGE COLUMN avatar photo TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar);',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table change column should ignore duplicate unique option.': {
    queries: [
      sql.concat(['ALTER TABLE person CHANGE COLUMN motto my_text TEXT(50) UNIQUE;']).join(''),
    ],
  },

  'Compact formatter: Alter table change column should rename primary and foreign key column reference.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE person CHANGE COLUMN id code INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT "primary key test";',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table change column should rename fulltext index column reference.': {
    queries: [
      sql
        .concat(['ALTER TABLE person CHANGE COLUMN initials letters CHAR(3) COLUMN_FORMAT FIXED;'])
        .join(''),
    ],
  },

  'Compact formatter: Alter table change column should rename unique key column reference.': {
    queries: [sql.concat(['ALTER TABLE person CHANGE COLUMN motto phrase TEXT(100);']).join('')],
  },

  'Compact formatter: Alter table change column should rename foreign key column reference.': {
    queries: [sql.concat(['ALTER TABLE pet CHANGE COLUMN height height_num DECIMAL;']).join('')],
  },

  'Compact formatter: Alter table change column should rename index column reference.': {
    queries: [
      sql.concat(['ALTER TABLE pet CHANGE COLUMN birth birth_datetime DATETIME;']).join(''),
    ],
  },

  'Compact formatter: Alter table change column should rename spatial index column reference.': {
    queries: [sql.concat(['ALTER TABLE house CHANGE COLUMN coordx x_axis FLOAT(6,2);']).join('')],
  },

  'Compact formatter: Alter table change column should not change a column to autoincrement if there is another one with autoincrement in table.': {
    queries: [
      sql.concat(['ALTER TABLE person CHANGE COLUMN ssn int(10) AUTO_INCREMENT;']).join(''),
    ],
  },

  'Compact formatter: Alter table change column should not change a column, moving it after unexisting column.': {
    queries: [sql.concat(['ALTER TABLE pet CHANGE COLUMN year year TINYINT after xyz;']).join('')],
  },

  'Compact formatter: Alter table change column should not change a column if it tries to add a second primary key.': {
    queries: [
      sql.concat(['ALTER TABLE person CHANGE COLUMN size size INT(8) primary key;']).join(''),
    ],
  },

  'Compact formatter: Alter table change column should not change unexisting column.': {
    queries: [sql.concat(['ALTER TABLE person CHANGE COLUMN xyz abc INT(8) NOT NULL;']).join('')],
  },

  'Compact formatter: Alter table change column should not change column adding a second autoincrement.': {
    queries: [
      sql.concat(['ALTER TABLE person CHANGE COLUMN size size INT(8) AUTO_INCREMENT;']).join(''),
    ],
  },

  'Compact formatter: Alter table change column should change last column.': {
    queries: [
      sql.concat(['ALTER TABLE person CHANGE COLUMN pattern pattern VARCHAR(128);']).join(''),
    ],
  },
});

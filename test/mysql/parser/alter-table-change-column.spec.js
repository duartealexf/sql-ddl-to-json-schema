const expect0 = require('./expect/alter-table-change-column/0.json');
const expect1 = require('./expect/alter-table-change-column/1.json');
const expect2 = require('./expect/alter-table-change-column/2.json');
const expect3 = require('./expect/alter-table-change-column/3.json');
const expect4 = require('./expect/alter-table-change-column/4.json');
const expect5 = require('./expect/alter-table-change-column/5.json');
const expect6 = require('./expect/alter-table-change-column/6.json');
const runner = require('../runner');

runner.run({
  'Should alter table changing column name and definition with options and position after another column.': {
    queries: [
      `ALTER TABLE people change column name fullname varchar(255) character set utf8 default 'John Smith' after ssn;`,
      `ALTER TABLE people change name fullname varchar(255) character set utf8 default 'John Smith' after ssn;`
    ],
    expect: expect0,
  },

  'Should alter table changing column name and definition with option, first position.': {
    queries: [
      `ALTER TABLE people change column name fullname varchar(255) character set utf8 first;`,
      `ALTER TABLE people change name fullname varchar(255) character set utf8 first;`
    ],
    expect: expect1
  },

  'Should alter table changing column name and definition.': {
    queries: [
      `ALTER TABLE people change column name fullname varchar(255);`,
      `ALTER TABLE people change name fullname varchar(255);`
    ],
    expect: expect2
  },

  'Should alter table modifying column definition with options and position after another column.': {
    queries: [
      `ALTER TABLE people modify column name varchar(255) character set utf8 default 'John Smith' after ssn;`,
      `ALTER TABLE people modify name varchar(255) character set utf8 default 'John Smith' after ssn;`
    ],
    expect: expect3,
  },

  'Should alter table changing column definition with option, first position.': {
    queries: [
      `ALTER TABLE people modify column name varchar(255) character set utf8 first;`,
      `ALTER TABLE people modify name varchar(255) character set utf8 first;`
    ],
    expect: expect4
  },

  'Should alter table changing column definition.': {
    queries: [
      `ALTER TABLE people modify column name varchar(255);`,
      `ALTER TABLE people modify name varchar(255);`
    ],
    expect: expect5
  },

  'Should alter table dropping column.': {
    queries: [
      `ALTER TABLE people drop column if exists middle_name;`,
      `ALTER TABLE people drop if exists middle_name;`,
      `ALTER TABLE people drop column middle_name;`,
      `ALTER TABLE people drop middle_name;`,
    ],
    expect: expect6
  }
});

const ava = require('ava');
const Parser = require('../lib');

const expect0 = require('./expect/alter-table-change-column/0.json');
const expect1 = require('./expect/alter-table-change-column/1.json');
const expect2 = require('./expect/alter-table-change-column/2.json');
const expect3 = require('./expect/alter-table-change-column/3.json');
const expect4 = require('./expect/alter-table-change-column/4.json');
const expect5 = require('./expect/alter-table-change-column/5.json');
// const expect6 = require('./expect/alter-table-change-column/6.json');
// const expect7 = require('./expect/alter-table-change-column/7.json');
// const expect8 = require('./expect/alter-table-change-column/8.json');

const tests = {
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
  }
};

Object.getOwnPropertyNames(tests).forEach(description => {
  const test = tests[description];

  test.queries.forEach(query => {

    const testname = `${description} | ${query}`;

    const parser = new Parser();
    parser.feed(query);

    ava(testname, t => {
      const value = parser.results;
      t.deepEqual(value, test.expect);
    });
  });
});

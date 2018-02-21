const ava = require('ava');
const Parser = require('../lib');

const expect0 = require('./expect/alter-table-foreign/0.json');
const expect1 = require('./expect/alter-table-foreign/1.json');
const expect2 = require('./expect/alter-table-foreign/2.json');
const expect3 = require('./expect/alter-table-foreign/3.json');
const expect4 = require('./expect/alter-table-foreign/4.json');
const expect5 = require('./expect/alter-table-foreign/5.json');
const expect6 = require('./expect/alter-table-foreign/6.json');

const tests = {
  'Should alter table adding foreign key with two columns, match and trigger.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_ax_id__ay_id (ax_id (20) asc , ay_id ) references other ( xid ( 10 ) desc , yid ) match full on delete set null;`
    ],
    expect: expect0,
  },

  'Should alter table adding foreign key with two columns, and match.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_ax_id__ay_id(ax_id(20)asc,ay_id)references other(xid(10)desc,yid)match full;`
    ],
    expect: expect1,
  },

  'Should alter table adding foreign key with one column.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_o_id (o_id) references other (id);`
    ],
    expect: expect2,
  },

  'Should alter table adding foreign key with unnamed key.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key (o_id) references other (id);`
    ],
    expect: expect3,
  },

  'Should alter table adding foreign key with unnamed constraint.': {
    queries: [
      `ALTER TABLE people add constraint foreign key fk_o_id (o_id) references other (id);`,
      `ALTER TABLE people add foreign key fk_o_id (o_id) references other (id);`
    ],
    expect: expect4,
  },

  'Should alter table adding foreign key with unnamed constraint and key.': {
    queries: [
      `ALTER TABLE people add foreign key (o_id) references other (id);`
    ],
    expect: expect5,
  },

  'Should alter table dropping foreign key.': {
    queries: [
      `ALTER TABLE people drop foreign key fk_oid;`
    ],
    expect: expect6,
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

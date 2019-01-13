const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should alter table adding foreign key with two columns, match and trigger.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_ax_id__ay_id (ax_id (20) asc , ay_id ) references other ( xid ( 10 ) desc , yid ) match full on delete set null on update no action on delete cascade;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '0.json')
  },

  'Parser: Should alter table adding foreign key with two columns, and match.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_ax_id__ay_id(ax_id(20)asc,ay_id)references other(xid(10)desc,yid)match full;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '1.json')
  },

  'Parser: Should alter table adding foreign key with one column.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_o_id (o_id) references other (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '2.json')
  },

  'Parser: Should alter table adding foreign key with unnamed key.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key (o_id) references other (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '3.json')
  },

  'Parser: Should alter table adding foreign key with unnamed constraint.': {
    queries: [
      `ALTER TABLE people add constraint foreign key fk_o_id (o_id) references other (id);`,
      `ALTER TABLE people add foreign key fk_o_id (o_id) references other (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '4.json')
  },

  'Parser: Should alter table adding foreign key with unnamed constraint and key.': {
    queries: [
      `ALTER TABLE people add foreign key (o_id) references other (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '5.json')
  },

  'Parser: Should alter table dropping foreign key.': {
    queries: [
      `ALTER TABLE people drop foreign key fk_oid;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-foreign', '6.json')
  }
});

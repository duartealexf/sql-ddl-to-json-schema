import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table adding foreign key with two columns, match and trigger.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_ax_id__ay_id (ax_id (20) asc , ay_id ) references other ( xid ( 10 ) desc , yid ) match full on delete set null on update no action on delete cascade;`,
    ],
  },

  'Parser: Should alter table adding foreign key with two columns, and match.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_ax_id__ay_id(ax_id(20)asc,ay_id)references other(xid(10)desc,yid)match full;`,
    ],
  },

  'Parser: Should alter table adding foreign key with one column.': {
    queries: [
      `ALTER TABLE people add constraint xyz foreign key fk_o_id (o_id) references other (id);`,
    ],
  },

  'Parser: Should alter table adding foreign key with unnamed key.': {
    queries: [`ALTER TABLE people add constraint xyz foreign key (o_id) references other (id);`],
  },

  'Parser: Should alter table adding foreign key with unnamed constraint.': {
    queries: [
      `ALTER TABLE people add constraint foreign key fk_o_id (o_id) references other (id);`,
      `ALTER TABLE people add foreign key fk_o_id (o_id) references other (id);`,
    ],
  },

  'Parser: Should alter table adding foreign key with unnamed constraint and key.': {
    queries: [`ALTER TABLE people add foreign key (o_id) references other (id);`],
  },

  'Parser: Should alter table dropping foreign key.': {
    queries: [`ALTER TABLE people drop foreign key fk_oid;`],
  },
});

const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed(
  `CREATE TABLE person (
    constraint pk_id__o_id primary key using btree (id(2), o_id(3)asc)key_block_size 1024 comment 'hi there' using hash key_block_size 1024 with parser test,
    index ik_id__o_id using hash (id(2), o_id(3)asc) comment 'hi there',
    key kk_id using btree (id),
    index ik_id (id),
    key kk_id (id)
  );`
);
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

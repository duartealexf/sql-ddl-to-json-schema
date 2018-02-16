const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed(
  `
  CREATE UNIQUE INDEX test USING BTREE ON people (name (20) asc, initials) KEY_BLOCK_SIZE = 20 COMMENT 'test' ALGORITHM = DEFAULT LOCK DEFAULT;
  create fulltext index test on people (name) algorithm= inplace lock=none;
  create spatial index test on people (name) algorithm =copy;
  create index test on people (name);
  `
);
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

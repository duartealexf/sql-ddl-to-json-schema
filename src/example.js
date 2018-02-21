const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  ALTER TABLE people enable keys , disable keys,discard tablespace,
  import tablespace ,force,
  with validation, without validation, rename to persons
  ;
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

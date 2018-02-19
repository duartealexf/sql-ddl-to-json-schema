const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  ALTER TABLE people add foreign key (o_id) references other (id);
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

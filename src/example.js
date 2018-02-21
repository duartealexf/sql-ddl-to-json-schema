const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  ALTER TABLE people comment 'test';
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

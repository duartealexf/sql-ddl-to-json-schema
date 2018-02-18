const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  rename table people to persons, homes to houses,cats to pets ,test to tests;
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

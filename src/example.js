const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  drop database app;
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

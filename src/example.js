const Parser = require('../lib/parser');

const parser = new Parser();

parser.feed(
  `
  drop index i_oid on people lock default;
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));

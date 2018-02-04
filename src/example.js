const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed("CREATE TABLE test (test test)");
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

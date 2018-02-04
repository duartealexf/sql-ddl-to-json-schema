const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed("CREATE table test1 (test CHAR(1))");
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

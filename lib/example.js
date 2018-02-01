const Parser = require('./parser');

const parser = new Parser();
parser.feed('CREATE TABLE test');
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

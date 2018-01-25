const Parser = require('./parser');

const parser = new Parser();
parser.feed('1+1');
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

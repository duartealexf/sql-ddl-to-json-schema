const Parser = require('./parser');

const parser = new Parser();
parser.feed('BIT ( 10 ) ');
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

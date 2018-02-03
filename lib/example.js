const Parser = require('./parser');

const parser = new Parser();
parser.feed("CREATE DATABASE test1 CHARACTER SET utf8;");
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

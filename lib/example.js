const Parser = require('./parser');

const parser = new Parser();
parser.feed('CREATE DATABASE `test` CHARACTER SET utf8');
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

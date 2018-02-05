const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed("CREATE TABLE `test` (`age` INT NULL DEFAULT 18, `name` VARCHAR(12) NOT NULL)");
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

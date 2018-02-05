const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed("CREATE temporary TABLE `test` (`id` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` VARCHAR(12) NOT NULL)");
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

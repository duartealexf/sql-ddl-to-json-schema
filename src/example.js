const Parser = require('../lib/parser');

const parser = new Parser();
// parser.feed("CREATE TABLE create (pk_action_type int(10) NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, deleted tinyint(3) DEFAULT 0 NOT NULL, created_at timestamp(19) DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp(19) NULL)");
parser.feed("CREATE DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;");
const value = parser.results;
console.log(JSON.stringify(value, null, 2));

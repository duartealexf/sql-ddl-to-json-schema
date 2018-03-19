const Parser = require('../../lib');
// const fs = require('fs');
// const path = require('path');

const parser = new Parser('mysql');

parser.feed(`
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(255) NOT NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE MyISAM COMMENT 'All system users';

ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
`);

const value = parser.results;
// console.log(JSON.stringify(value, null, 2));
const json = parser.toCompactJson(value);
console.log(JSON.stringify(json, null, 2));

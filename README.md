# SQL DDL to JSON Schema converter

[![Build Status](https://travis-ci.org/duartealexf/sql-ddl-to-json-schema.svg?branch=master)](https://travis-ci.org/duartealexf/sql-ddl-to-json-schema)

WORK IN PROGESS - [Check out the roadmap](https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/ROADMAP.md)

A grammar and stream-friendly SQL parser based on [nearley](nearley.js.org) that transforms DDL statements into JSON Schema.
No SQL client or Database Management System required.

## Installation

Not published yet - unavailable for production.

If you want to contribute, create an issue, a PR or fork.

<!-- `yarn add sql-ddl-to-json-schema`; -->
<!-- or -->
<!-- `npm i sql-ddl-to-json-schema`; -->

## Development

To commit, use commitizen: `git cz`.

### Starting up

- Clone this repo
- Install nodemon: `yarn global add nodemon` or `npm i g nodemon`
- Install dependencies: `yarn`

### Scripts

- To build the grammar: `yarn run build`
- To build and watch for changes: `yarn run build:watch`
- To test: `yarn run test`
- To build and test and watch for changes: `yarn run build-test:watch`
- To test against nearley tester: `yarn run nearley-test --input 'CREATE TABLE test'`


## Links
- [Grammar List](http://www.antlr3.org/grammar/list.html)
- [Basic MySQL Parser](https://www.safaribooksonline.com/library/view/flex-bison/9780596805418/ch04.html)
- [MySQL Formatter](https://github.com/TeamSQL/sql-formatter/blob/master/src/languages/MySQLFormatter.js)
- [SQL Parser for AlaSQL in JiSON](https://github.com/agershun/alasql/blob/develop/utils/a.jison)
- [jSQL project](https://github.com/Pamblam/jSQL)

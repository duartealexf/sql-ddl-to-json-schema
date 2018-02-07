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

## Contributing

This project assumes you are using yarn, as all scripts in `package.json` are run through yarn.

- Clone this repo
- Install nodemon: `yarn global add nodemon`
- Install dependencies: `yarn`

### Commiting

To commit, use commitizen: `git cz` (you will need to have installed commitizen: `yarn global add commitizen`).

### Understanding the internals

Folder structure:

```md
/
|- index.js           Entrypoint file, imports from lib/index.js
|- lib/
|  |- index.js        Imports parser class.
|  |- parser.js       Parser class, which will be used by users.
|  |- compiled/       Contains compiled grammar files.
|
|- src/
|  |- assembly.js     Script that concatenates all .ne files to grammar.ne.
|  |- example.js      Serves development purpose for testing isolated statements.
|  |- lexer.ne        Entrypoint and first lines of the grammar.
|  |- dictionary/     Contains .js files with array of keywords used in lexer.ne.
|  |- rules/          Contains .ne files with grammar rules.
|  |- shared/         Shared files used by dictionary .js files.
|
|- test/              Tests.
```

- There are naming rules for tokens in ne files, as stated in `lexer.ne`. They are prepended with:

```txt
K_ -> Keywords
P_ -> Phrase (aka statements)
O_ -> Options (one of several keywords or phrases)
S_ -> Symbol (not a keyword, but chars and other matches by RegExp's)
```

1. You will be handling mostly with files in rules folder.

1. The `dictionary/keywords.js` file contains keywords, but they are prepended with K_ when used in .ne files. Make sure you understand how it is exported.

1. The compiled `grammar.ne` file comprises an assembly (concatenation) of `lexer.ne` and files in `rules` folder. So don't worry about importing .ne files in other .ne files. This prevents circular dependency and grammar rules in `lexer.ne` are scoped to all files (thus not having to repeat them in every file).

### Scripts at hand

- Assemble `grammar.ne` and compile to `grammar.js`: `yarn run build`
- Same as above, but watch for changes: `yarn run build:watch`
- Assemble, build and test: `yarn run test`
- Same as above, but watch for changes: `yarn run test:watch`
- Parse example file: `yarn run example`
- Test against nearley tester: `yarn run nearley-test --input 'CREATE TABLE test (test CHAR(1));'`

### Debugging

Taking the example file as an example, you may debug with the following configurations, for each IDE:

#### Visual Studio Code

Place the launch config below.
To debug tests you may want to change the args as you go.

```json
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Debug Compilation",
        "args": [
          "lib/compiled/grammar.ne"
        ],
        "program": "${workspaceFolder}/node_modules/nearley/bin/nearleyc.js"
      },
      {
        "type": "node",
        "request": "launch",
        "name": "Debug Tests",
        "args": [
          "test/create-table.js"
        ],
        "program": "${workspaceFolder}/node_modules/ava/profile.js"
      },
      {
        "type": "node",
        "request": "launch",
        "name": "Debug Example",
        "program": "${workspaceFolder}/src/example.js"
      },
      {
        "type": "node",
        "request": "launch",
        "name": "Debug Assembly",
        "program": "${workspaceFolder}/src/assembly.js"
      }
    ]
}

```

## Links
- [Grammar List](http://www.antlr3.org/grammar/list.html)
- [Basic MySQL Parser](https://www.safaribooksonline.com/library/view/flex-bison/9780596805418/ch04.html)
- [MySQL Formatter](https://github.com/TeamSQL/sql-formatter/blob/master/src/languages/MySQLFormatter.js)
- [SQL Parser for AlaSQL in JiSON](https://github.com/agershun/alasql/blob/develop/utils/a.jison)
- [jSQL project](https://github.com/Pamblam/jSQL)

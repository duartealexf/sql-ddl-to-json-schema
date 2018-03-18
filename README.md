# SQL DDL to JSON Schema converter

[![Build Status](https://travis-ci.org/duartealexf/sql-ddl-to-json-schema.svg?branch=master)](https://travis-ci.org/duartealexf/sql-ddl-to-json-schema)

Transforms SQL DDL statements into JSON format (a compact format and JSON Schema).

```sql
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(255) NOT NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE MyISAM COMMENT 'All system users';

ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
```

Outputs to a compact JSON format:

```json
[
  {
    "name": "users",
    "columns": [
      {
        "name": "id",
        "type": {
          "datatype": "int",
          "width": 11
        },
        "options": {
          "nullable": false,
          "autoincrement": true
        }
      },
      {
        "name": "nickname",
        "type": {
          "datatype": "varchar",
          "length": 255
        },
        "options": {
          "nullable": false
        }
      },
      {
        "name": "deleted_at",
        "type": {
          "datatype": "timestamp",
          "fractional": 0
        },
        "options": {
          "nullable": true
        }
      },
      {
        "name": "created_at",
        "type": {
          "datatype": "timestamp",
          "fractional": 0
        },
        "options": {
          "nullable": false,
          "default": "CURRENT_TIMESTAMP"
        }
      },
      {
        "name": "updated_at",
        "type": {
          "datatype": "timestamp",
          "fractional": 0
        },
        "options": {
          "nullable": true
        }
      }
    ],
    "primaryKey": {
      "columns": [
        {
          "column": "id"
        }
      ]
    },
    "uniqueKeys": [
      {
        "columns": [
          {
            "column": "nickname"
          }
        ],
        "name": "unq_nick"
      }
    ],
    "options": {
      "comment": "All system users",
      "engine": "MyISAM"
    }
  }
]
```

Output to JSON Schema is still work in progress - [Check out the roadmap](https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/ROADMAP.md)

## About

This project reads, parses and interprets [SQL DDL Statements from MySQL dialect](https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/ROADMAP.md#mariadb--mysql) transforming them into JSON Format.

No SQL server, client or RDMS is required.

This project is a grammar and stream-friendly SQL parser based on [nearley](nearley.js.org).

## Usage

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
|- index.js               Entrypoint file, imports from lib/index.js
|- lib/                   Compiled (dist) library folder, product of this project.
|
|- src/
|  |- shared/             Shared files used by dialects, parsers and formatters.
|  |- mysql/
|     |- example.js       Serves development purpose for testing isolated statements.
|     |- formatter/       Formats the parsed JSON (output of parser) to other format.
|        |- compact/      Formatter for a compact JSON format.
|        |- jsonschema/   Formatter for a JSON Schema format (not yet implemented).
|     |- parser/
|        |- dictionary/   JS files with array of keywords used in lexer.ne.
|        |- rules/        Nearley files with grammar rules.
|        |- lexer.ne      Entrypoint and first lines of the grammar.
|
|- tasks/
|  |- mysql/
|     |- assembly.js      Script that concatenates all .ne files to grammar.ne to lib folder.
|     |- formatters.js    Script that sends a copy of formatters to lib folder.
|
|- test/                  Tests.
```

- There are naming rules for tokens in ne files, as stated in `lexer.ne`. They are prepended with:

```txt
K_ -> Keywords
P_ -> Phrase (aka statements)
O_ -> Options (one of several keywords or phrases)
S_ -> Symbol (not a keyword, but chars and other matches by RegExp's)
```

1. The `dictionary/keywords.js` file contains keywords, but they are prepended with K_ when used in .ne files. Take a look to make sure you understand how it is exported.

1. The compiled `grammar.ne` file comprises an assembly (concatenation) of `lexer.ne` and files in `rules` folder. So don't worry about importing .ne files in other .ne files. This prevents circular dependency and grammar rules in `lexer.ne` are scoped to all files (thus not having to repeat them in every file).

### Scripts at hand

Valid to all SQL dialects:

- Assemble `grammar.ne` and compile to `grammar.js`: `yarn run build`
- Same as above, but watch for changes: `yarn run build:watch`
- Assemble, build and test: `yarn run test`
- Same as above, but watch for changes: `yarn run test:watch`
- Test against nearley tester: `yarn run nearley-test lib/mysql/parser/grammar.js --input 'CREATE TABLE test (test CHAR(1));'`

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
        "lib/mysql/parser/grammar.ne"
      ],
      "program": "${workspaceFolder}/node_modules/nearley/bin/nearleyc.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "args": [
        "test/mysql/parser/parser.spec.js"
      ],
      "program": "${workspaceFolder}/node_modules/ava/profile.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Example",
      "program": "${workspaceFolder}/src/mysql/example.js"
    }
  ]
}

```

## Links
- [Grammar List](http://www.antlr3.org/grammar/list.html)
- [jSQL project](https://github.com/Pamblam/jSQL)

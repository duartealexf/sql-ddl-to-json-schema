# SQL DDL to JSON Schema converter

[![Build Status](https://travis-ci.org/duartealexf/sql-ddl-to-json-schema.svg?branch=master)](https://travis-ci.org/duartealexf/sql-ddl-to-json-schema)
[![npm](https://img.shields.io/npm/v/sql-ddl-to-json-schema.svg)](https://img.shields.io/npm/v/sql-ddl-to-json-schema.svg)
[![node](https://img.shields.io/node/v/sql-ddl-to-json-schema.svg)](https://img.shields.io/node/v/sql-ddl-to-json-schema.svg)
[![license](https://img.shields.io/npm/l/sql-ddl-to-json-schema.svg)](https://img.shields.io/npm/l/sql-ddl-to-json-schema.svg)

Transforms SQL DDL statements into JSON format (JSON Schema and a compact format).

- [SQL DDL to JSON Schema converter](#sql-ddl-to-json-schema-converter)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Shorthand](#shorthand)
    - [Step by step](#step-by-step)
  - [Options for JSON Schema output](#options-for-json-schema-output)
    - [`useRef`](#useref)
    - [`indent`](#indent)
    - [`extension`](#extension)
  - [What it is, what it is not](#what-it-is-what-it-is-not)
  - [About](#about)
  - [Contributing](#contributing)
    - [Commiting](#commiting)
    - [Understanding the internals](#understanding-the-internals)
    - [Scripts at hand](#scripts-at-hand)
    - [Debugging](#debugging)
      - [Visual Studio Code](#visual-studio-code)
  - [Links](#links)

## Overview

Taking the following SQL:

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

It parses and delivers an **array of JSON Schema documents** (one for each parsed table):

```json
[
  {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$comment": "JSON Schema for users table",
    "$id": "users",
    "title": "users",
    "description": "All system users",
    "type": "object",
    "required": [
      "id",
      "nickname",
      "created_at"
    ],
    "definitions": {
      "id": {
        "$comment": "primary key",
        "type": "integer",
        "minimum": 1,
        "maximum": 1.5474250491067253e+26
      },
      "nickname": {
        "type": "string",
        "maxLength": 255
      },
      "deleted_at": {
        "type": "string"
      },
      "created_at": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    },
    "properties": {
      "id": {
        "$ref": "#/definitions/id"
      },
      "nickname": {
        "$ref": "#/definitions/nickname"
      },
      "deleted_at": {
        "$ref": "#/definitions/deleted_at"
      },
      "created_at": {
        "$ref": "#/definitions/created_at"
      },
      "updated_at": {
        "$ref": "#/definitions/updated_at"
      }
    }
  }
]
```

And an array of tables in a compact JSON format:

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

*Currently only DDL statements of MySQL and MariaDB dialects are supported.* - [Check out the roadmap](https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/ROADMAP.md)

## Installation

```
yarn add sql-ddl-to-json-schema
npm i sql-ddl-to-json-schema
```

## Usage

### Shorthand

```js

const Parser = require('sql-ddl-to-json-schema');
const parser = new Parser('mysql');

const sql = `
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(255) NOT NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE MyISAM COMMENT 'All system users';

ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
`;

/*
 * Read on for available options.
 */
const options = {};

/*
 * Output each table to a JSON Schema file in a given directory...
 */
parser.feed(sql)
  .toJsonSchemaFiles(__dirname, options)
  .then((outputFilePaths) => {
    // ...
  });

/*
 * Or get the JSON Schema if you need to modify it...
 */
const jsonSchemaDocuments = parser.feed(sql)
  .toJsonSchemaArray(options);

/*
 * Or explore the compact JSON format...
 */
const compactJsonTablesArray = parser.feed(sql)
  .toCompactJson(parsedJsonFormat);
```

### Step by step

```js
/*
 * Read on for available options.
 */
const options = {};

/*
 * Feed the parser with the SQL DDL statements...
 */
parser.feed(sql);

/*
 * You can get the parsed results in JSON format...
 */
const parsedJsonFormat = parser.results;

/*
 * And pass it to be formatted in a compact JSON format...
 */
const compactJsonTablesArray = parser.toCompactJson(parsedJsonFormat);

/*
 * Then pass it to format to an array of JSON Schema items. One for each table...
 */
const jsonSchemaDocuments = parser.toJsonSchemaArray(options, compactJsonTablesArray);

/*
 * Finally spread the JSON Schema documents to files, which returns a promise...
 */
const jsonFilesOutput = parser.toJsonSchemaFiles(__dirname, options, jsonSchemaDocuments)
  .then((outputFilePaths) => {
    // ...
  });
```

## Options for JSON Schema output

There are a few options when it comes to formatting the JSON Schema output:

### `useRef`

Whether to add all properties to `definitions` and in `properties` only use $ref.

Default value: `true`.

### `indent`

Indent size of output files.

Default value: `2`.

### `extension`

Extension of output files.

Default value: `'.json'`.

## What it is, what it is not

**It is** a SQL DDL parser for Javascript, based on [nearley](https://nearley.js.org). It will parse DDL statements only, converting it to JSON. No DML is supported.

**It is not** a SQL DBMS, nor a SQL Server, nor SQL client.

## About

**No SQL server, client or DBMS is required.**

To see which DDL statements / SQL dialects are supported, [check out the roadmap](https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/ROADMAP.md).

This project is a grammar and stream-friendly SQL parser based on [nearley](https://nearley.js.org).

## Contributing

You are welcome to contribute!

Preferably use `npm`, as all scripts in `package.json` are run through npm.

- Clone this repo
- Install dependencies: `npm i`

### Commiting

To commit, use commitizen: `git cz` (you will need to have installed commitizen: `npm i -g commitizen`).

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
|        |- json-schema/   Formatter for a JSON Schema format.
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

2. The compiled `grammar.ne` file comprises an assembly (concatenation) of `lexer.ne` and files in `rules` folder. So don't worry about importing .ne files in other .ne files. This prevents circular dependency and grammar rules in `lexer.ne` are scoped to all files (thus not having to repeat them in every file).

### Scripts at hand

Valid to all SQL dialects:

- Assemble `grammar.ne` and compile to `grammar.js`: `npm run build`
- Same as above, but watch for changes: `npm run build:watch`
- Run tests: `npm run test`
- Test and watch for changes: `npm run test:watch`
- Test against nearley tester: `npm run nearley-test lib/mysql/parser/grammar.js --input 'CREATE TABLE test (test CHAR(1));'`

The tests call SQL statements on the parser and test the JSON result (whatever the format) against a JSON file in a folder called `expect`, for that test case. The command below updates all `expect` files to whatever is being parsed in the test cases. This is useful when there is a change in the parser that affects many files and changes JSON result in them. Run the script to update the expected parse result in the file:

`npm run test:update`

### Debugging

Taking the example file as an example, you may debug with the following configurations, for each IDE:

#### Visual Studio Code

Place the launch config below.

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
      "name": "Debug Opened Test File",
      "args": [
        "${file}"
      ],
      "program": "${workspaceFolder}/node_modules/ava/profile.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Example",
      "program": "${workspaceFolder}/src/mysql/example.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Update Expectation Of Opened Test File",
      "env": {
        "DRY_UPDATE": "1"
      },
      "args": [
        "${file}"
      ],
      "program": "${workspaceFolder}/node_modules/ava/profile.js"
    }
  ]
}

```

## Links

- [Grammar List](http://www.antlr3.org/grammar/list.html)
- [moo](https://github.com/no-context/moo)
- [nearley](https://github.com/kach/nearley)

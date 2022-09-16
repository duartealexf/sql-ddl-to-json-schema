# SQL DDL to JSON Schema converter

[![Tests](https://github.com/duartealexf/sql-ddl-to-json-schema/actions/workflows/run-tests.yaml/badge.svg)](https://github.com/duartealexf/sql-ddl-to-json-schema/actions/workflows/run-tests.yaml)
[![npm](https://img.shields.io/npm/v/sql-ddl-to-json-schema.svg)](https://img.shields.io/npm/v/sql-ddl-to-json-schema.svg)
[![node](https://img.shields.io/node/v/sql-ddl-to-json-schema.svg)](https://img.shields.io/node/v/sql-ddl-to-json-schema.svg)
[![license](https://img.shields.io/npm/l/sql-ddl-to-json-schema.svg)](https://img.shields.io/npm/l/sql-ddl-to-json-schema.svg)

Transforms SQL DDL statements into JSON format (JSON Schema and a compact format).

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Shorthand](#shorthand)
  - [Step by step](#step-by-step)
- [Options for JSON Schema output](#options-for-json-schema-output)
  - [`useRef`](#useref)
- [Version compatibility table](#version-compatibility-table)
- [What it is, what it is not](#what-it-is-what-it-is-not)
- [About](#about)
- [Contributing](#contributing)
  - [Commiting](#commiting)
  - [Understanding the internals](#understanding-the-internals)
  - [Scripts at hand](#scripts-at-hand)
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

```sh
yarn add sql-ddl-to-json-schema
npm i sql-ddl-to-json-schema
```

## Usage

### Shorthand

```ts
const { Parser } = require('sql-ddl-to-json-schema');
// or:
import { Parser } from 'sql-ddl-to-json-schema'

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

/**
 * Read on for available options.
 */
const options = {};

/**
 * Get the JSON Schema if you need to modify it...
 */
const jsonSchemaDocuments = parser.feed(sql).toJsonSchemaArray(options);

/**
 * Or explore the compact JSON format...
 */
const compactJsonTablesArray = parser.feed(sql).toCompactJson(parser.results);
```

### Step by step

```ts
/**
 * Read on for available options.
 */
const options = { useRef: true };

/**
 * Feed the parser with the SQL DDL statements...
 */
parser.feed(sql);

/**
 * You can get the parsed results in JSON format...
 */
const parsedJsonFormat = parser.results;

/**
 * And pass it to be formatted in a compact JSON format...
 */
const compactJsonTablesArray = parser.toCompactJson(parsedJsonFormat);

/**
 * Finally pass it to format to an array of JSON Schema items. One for each table...
 */
const jsonSchemaDocuments = parser.toJsonSchemaArray(options, compactJsonTablesArray);
```

## Options for JSON Schema output

There are a few options when it comes to formatting the JSON Schema output:

### `useRef`

Whether to add all properties to `definitions` and in `properties` only use $ref.

Default value: `true`.

## Version compatibility table

| This lib version range | NodeJS version range | Angular support | Other browser-based JS support |
| ---------------------- | -------------------- | --------------- | ------------------------------ |
| <= 3.x                 | >= 6.x               | No              | Yes                            |
| >= 4                   | >= 8.6               | Yes             | Yes                            |

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

Prefer using the latest version of NodeJS.

To commit, use commitizen: `git cz` (you will need to have installed devDependencies: `npm i`).

### Understanding the internals

Folder structure:

```md
|- lib/                   Compiled library folder, product of this project.
|
|- src/
|  |- typings/            Types used throughout project.
|  |- shared/             Shared files used by dialects, parsers and formatters.
|  |- mysql/
|     |- formatter/       Formats the parsed JSON (output of parser) to other format.
|        |- compact/      Formatter for compact JSON format.
|        |- json-schema/  Formatter for JSON Schema format.
|     |- language/
|        |- dictionary/   TS files with array of keywords and symbols used in lexer.ne.
|        |- rules/        Nearley files with grammar rules.
|        |- lexer.ne      Entrypoint and first lines of the grammar.
|
|- tasks/
|  |- mysql/
|     |- assembly.ts      Script that concatenates all .ne files to grammar.ne to lib folder.
|     |- formatters.ts    Script that sends a copy of formatters to lib folder.
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

1. The `dictionary/keywords.ts` file contains keywords, but they are prepended with K_ when used in .ne files. Take a look to make sure you understand how it is exported.

2. The compiled `grammar.ne` file comprises an assembly (concatenation) of `lexer.ne` and files in `language` folder. So don't worry about importing .ne files in other .ne files. This prevents circular dependency and grammar rules in `lexer.ne` are scoped to all files (thus not having to repeat them in every file).

### Scripts at hand

Valid to all SQL dialects:

- Assemble `grammar.ne` and compile to `grammar.ts`: `npm run build`
- Same as above, but watch for changes: `npm run build:watch`
- Run tests: `npm run test`
- Test and watch for changes: `npm run test:watch`

#### Visual Studio Code

Debug launch config is versioned in this repository.

## Links

- [Grammar List](http://www.antlr3.org/grammar/list.html)
- [moo](https://github.com/no-context/moo)
- [nearley](https://github.com/kach/nearley)

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.7](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.6...v4.0.7) (2022-09-16)


### Bug Fixes

* add binary collation support ([a89e50f](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/a89e50f08fac191ec3e931e84ad265610dc8ec6a))

### [4.0.6](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.5...v4.0.6) (2021-11-13)

### [4.0.5](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.3...v4.0.5) (2021-11-13)

### [4.0.4](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.3...v4.0.4) (2020-09-02)

* Fix the problem that ?? operator doesn't work in typescript ([merge PR #60](https://github.com/duartealexf/sql-ddl-to-json-schema/pull/60)) - thank you [aihpoSSophia](https://github.com/aihpoSSophia)!

## [4.0.3](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.2...v4.0.3) (2020-07-19)

* Add Node 14 to engines and CI tests

## [4.0.2](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.1...v4.0.2) (2020-07-19)

* Vulnerability fixes

## [4.0.1](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v4.0.0...v4.0.1) (2020-03-23)

### Bug Fixes

* Fix package release build.

## [4.0.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v3.1.2...v4.0.0) (2020-03-22)

### ⚠ BREAKING CHANGES

* Removed `toJSONSchemaFiles` method from parser, as it caused build issues in Angular.
* Changed export to named export (non-default). Now to import it, use braces, as in `import { Parser } from 'sql-ddl-to-json-schema'`.
* The parsed format does not contain null values anymore. Instead, the values that used to be null are not mentioned at all in parsed JSON format.

### Bug Fixes

* Fix Angular compatibility. ([29c640f](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/29c640f1983e316bc14f5cedbe54bc063ef562c1)), closes [#47]

### Features

* Add typing definitions.

<a name="3.1.3"></a>
## [3.1.3](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v3.1.2...v3.1.3) (2020-03-11)

### Bug Fixes

* Fix circular dependency warnings when building on Angular. ([838ee63](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/838ee63)), co-authored-by: yanmengfei <yanmengfei@inspur.com>

<a name="3.1.2"></a>
## [3.1.2](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v3.1.1...v3.1.2) (2019-05-05)


### Bug Fixes

* Fix unsigned in JSON Schema output. ([10a430f](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/10a430f))

<a name="3.1.1"></a>
## [3.1.1](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v3.1.0...v3.1.1) (2019-05-05)


### Bug Fixes

* Fix onUpdate column option for compact JSON. ([36be786](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/36be786)), closes [#45](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/45)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v3.0.1...v3.1.0) (2019-04-07)


### Features

* Add support for USE statement. ([cefd1d7](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/cefd1d7)), closes [#42](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/42)



<a name="3.0.1"></a>
## [3.0.1](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v3.0.0...v3.0.1) (2019-03-16)


### Bug Fixes

* Ignore formatting queries that do not affect tables. ([3f88701](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/3f88701)), closes [#41](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/41)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.2.0...v3.0.0) (2019-01-13)


### Bug Fixes

* Timestamp initialization with triggers now working ([32bbf7a](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/32bbf7a))


### Features

* Add option to not use $ref in JSON Schema output. ([713f1a1](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/713f1a1)), closes [#36](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/36)
* Allow initialization of timestamp ([5f37b57](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/5f37b57)) (Thanks @umegaya for the PR!)

### BREAKING CHANGES

* The `toJsonSchemaArray` method used to have only one argument: the tables array in
compact JSON format. Now this array is the second argument to be passed to this method. The first
argument refers to JSON Schema output options. Refer to the README for the list of options.

* For those who use the parsed format directly: foreign key reference had to be moved out of the O_COLUMN_DEFINITION rule, moving it out of column options. This had to be done because of grammar ambiguity when parsing "ON DELETE" or "ON UPDATE" clauses, as it conflicted with the foreign key triggers. It is still compliant with MySQL and MariaDB syntaxes. It will not affect the compact JSON format nor the JSON Schema format.



<a name="2.2.0"></a>
# [2.2.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.1.0...v2.2.0) (2018-07-22)


### Bug Fixes

* Add missing CHARSET alias. ([367a14f](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/367a14f)), closes [#28](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/28) [#29](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/29)
* Add NULL option as default column value. ([22d65a9](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/22d65a9)), closes [#26](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/26)
* Disabled foreign key checks. ([78cddaf](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/78cddaf)), closes [#27](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/27)
* Fix behavior of preparsing with escaping chars. ([eb9aad8](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/eb9aad8)), closes [#21](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/21)
* Fix line count of parsing errors. ([#30](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/30)) ([039ca75](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/039ca75)), closes [#20](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/20)
* Set INDEX_COLUMN length as optional, as per MariaDB and MySQL docs. ([a94fe33](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/a94fe33)), closes [#24](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/24)


### Features

* Add support for basic function statements as default column values. ([218fd6c](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/218fd6c)), closes [#25](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/25)
* Add support for SET statements. ([bdfc327](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/bdfc327)), closes [#23](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/23)
* Add support for SQL comments. ([#33](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/33)) ([dfffb37](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/dfffb37)), closes [#22](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/22)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.6...v2.1.0) (2018-07-08)


### Bug Fixes

* Fix behavior when sending null arguments to parser. ([46f6e46](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/46f6e46))


### Features

* Add validation to JSON Schema $id attribute when outputing to files. ([32dd787](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/32dd787))
* JSON Schema output ([7655c2b](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/7655c2b))



<a name="2.0.6"></a>
## [2.0.6](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.5...v2.0.6) (2018-07-01)


### Bug Fixes

* Add default values of digits and decimals for fixed point datatype. ([c7bffd7](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/c7bffd7))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.4...v2.0.5) (2018-05-14)


### Bug Fixes

* Add check to not add auto increment without being a primary key. ([fed92cd](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/fed92cd))
* Add rename of fk references on table rename. ([060a0e1](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/060a0e1))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.3...v2.0.4) (2018-05-13)


### Bug Fixes

* Update dependencies for Node v10. ([#17](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/17)) ([898917b](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/898917b))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.2...v2.0.3) (2018-05-13)


### Bug Fixes

* Set max version of node to 9. ([7e7d25d](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/7e7d25d))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.1...v2.0.2) (2018-05-13)


### Bug Fixes

* Fix build for node 9 and code linting. ([b4c1cc5](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/b4c1cc5))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v2.0.0...v2.0.1) (2018-05-13)


### Bug Fixes

* Add rename of column references when renaming column. ([f9db921](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/f9db921)), closes [#9](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/9)
* Skip copying of foreign keys in MySQL CREATE TABLE LIKE statement. ([1e0d2db](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/1e0d2db))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v1.2.0...v2.0.0) (2018-03-31)


### Bug Fixes

* Add checks to not have two columns with autoincrement. ([ddcbb6c](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/ddcbb6c))
* Add foreign key check when dropping a column. ([ffa9936](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/ffa9936)), closes [#12](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/12)
* Add foreign key check when dropping tables. ([ac5d2bc](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/ac5d2bc))
* Bugfix on RENAME TABLE rule compact formatter. ([b614b82](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/b614b82))
* Changed to ALTER TABLE ADD COLUMN having REFERENCES does not add FK. ([36a02d0](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/36a02d0)), closes [#16](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/16)
* Fixed so it does not drop the last column of a table. ([828ce79](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/828ce79))
* Removed 'symbol' property from indexes and keys. ([c1b1f60](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/c1b1f60)), closes [#14](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/14) [#15](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/15)


### BREAKING CHANGES

* Ambiguous and confusing 'symbol' property from indexes and keys was removed from
compact JSON format. Through tests it is noticed that MySQL and MariaDB don't seem to use them.



<a name="1.2.0"></a>
# [1.2.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v1.1.0...v1.2.0) (2018-03-23)


### Bug Fixes

* Bug fix in Index.clone method. ([8a11ed6](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/8a11ed6))


### Features

* Add clone method in models for CREATE TABLE LIKE, other improvements. ([c6408ea](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/c6408ea)), closes [#8](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/8) [#10](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/10) [#11](https://github.com/duartealexf/sql-ddl-to-json-schema/issues/11)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v1.0.2...v1.1.0) (2018-03-20)


### Features

* **parser:** Add Parser.toCompactJson with no arguments, taking parsed SQL. ([b4f713c](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/b4f713c))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v1.0.1...v1.0.2) (2018-03-20)


### Bug Fixes

* Fix build by adding moo as dependency. ([717e2be](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/717e2be))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/duartealexf/sql-ddl-to-json-schema/compare/v1.0.0...v1.0.1) (2018-03-20)


### Bug Fixes

* Changed .npmignore and .gitignore. ([e52e238](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/e52e238))



<a name="1.0.0"></a>
# 1.0.0 (2018-03-19)


### Bug Fixes

* **rule:** Fix last implementation of keyword-as-identifier. ([c9a6ab6](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/c9a6ab6))
* Add commitizen path. ([e7af802](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/e7af802))
* **rule:** Fix keyword-as-identifier rule. ([94e97ad](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/94e97ad))
* Added SCHEMA as synonym for DATABASE. ([a523cea](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/a523cea))
* Correct CREATE INDEX test name. ([cf1e5a4](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/cf1e5a4))
* Fix ambiguous interpretation of a FULLTEXT/SPATIAL INDEX/KEY. ([7f7d828](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/7f7d828))
* Fix apparent infinite loop on parsing rules. ([de6c1cd](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/de6c1cd))
* Fix missing scripts and missing utils.js file. ([d4f53fd](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/d4f53fd))
* Fix several bugs, order of keywords and tests. ([22b50ed](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/22b50ed))
* **datatype:** Add width of INT datatype. ([70cbab2](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/70cbab2))
* Fix support for multiple statements. ([235f55b](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/235f55b))
* Fix syntax of datatypes and wip in CREATE TABLE statements. Add keywords. ([da83fff](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/da83fff))
* Fixed import in example file. ([aa5b715](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/aa5b715))
* **datatype:** Correct returning values of datatypes. ([d1017c6](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/d1017c6))
* **datatype:** Fix bug in fractional field in DATETIME. ([93817e9](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/93817e9))
* **docs:** Fix typo in README. ([0b6f963](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/0b6f963))
* **keyword:** Fix word boundary issues with keywords. Fix tests. ([1d71ff0](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/1d71ff0))
* **scripts:** Fix typo in example script. ([42d98a8](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/42d98a8))


### Code Refactoring

* Add assembly of .ne files into a single one. ([463e9c4](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/463e9c4))


### Features

* Add ALTER DATABASE statement. ([9e4f660](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/9e4f660))
* Add ALTER TABLE add column, fulltext, spatial, index, primary and unique. ([5081490](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/5081490))
* Add ALTER TABLE foreign key options. ([5c73430](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/5c73430))
* Add CREATE DATABASE statement parser. ([ed85709](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/ed85709))
* Add CREATE INDEX. ([a21b50b](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/a21b50b))
* Add CREATE TABLE LIKE statement. ([cdeccfd](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/cdeccfd))
* Add CREATE TABLE options, still not parsing though. ([3dd4e97](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/3dd4e97))
* Add CREATE TABLE statement table options. ([6f139cd](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/6f139cd))
* Add DROP DATABASE statement. ([e2f2e28](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/e2f2e28))
* Add DROP INDEX statement. ([2bf5898](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/2bf5898))
* Add DROP TABLE statement. ([ccab54c](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/ccab54c))
* Add FOREIGN KEY support. ([6c37aa2](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/6c37aa2))
* Add FULLTEXT and SPATIAL index support. ([9663354](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/9663354))
* Add new ALTER TABLE statements. ([80e2340](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/80e2340))
* Add new features in CREATE TABLE statement. ([58f1c16](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/58f1c16))
* Add PRIMARY KEY, INDEX and KEY column definitions. ([54ca115](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/54ca115))
* Add remaining ALTER TABLE statements. ([f685d72](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/f685d72))
* **rule:** Add more options to CREATE TABLE parse. ([c8f94bc](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/c8f94bc))
* Add RENAME TABLE statement. ([07878fb](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/07878fb))
* **datatype:** Add support for datatype. ([76cd373](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/76cd373))
* Add UNIQUE key / index table definition. ([d2366a7](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/d2366a7))
* **keyword:** Add all keywords and reserved words from MySQL docs. ([83b38f1](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/83b38f1))
* **keyword:** Add CURRENT_TIMESTAMP option as a default value. ([5c080ba](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/5c080ba))
* **keywords:** Add function names to keywords. ([67b41a3](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/67b41a3))
* **moo:** Add moo and wip in code refactoring. ([018f97c](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/018f97c))
* Add working complex example of CREATE TABLE. ([ce4538e](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/ce4538e))
* Added MariaDB compatibility to MySQL parser. ([6c4ae0a](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/6c4ae0a))
* **symbols:** Add new symbols. ([f46ffdb](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/f46ffdb))


### Performance Improvements

* Added preparser to separate statements, improving performance. ([3895c86](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/3895c86))
* Removed unused keywords and symbols to improve performance. ([8865f45](https://github.com/duartealexf/sql-ddl-to-json-schema/commit/8865f45))


### BREAKING CHANGES

* Create and alter table statements with key definitions had format changed, as Index
and Key were treated differently. Since they are synonyms, some rules were grouped together and some
were split in two.
* **rule:** All %S_IDENTIFIER were changed to S_IDENTIFIER (no percent sign).
* Changed Utils to class with static methods. Add utils to .ne files to make methods
available.
* Assembly of .ne files by concatenating into one, to prevent circular dependency.
Improved directory structure and README documentation on Contributing section.
* **datatype:** Support for datatypes changed the structure of the resulting struct, having default
'type' and 'def' fields. The former defines the name of what was parsed (the T_xxx, P_xxx, etc),
while the latter has custom configurations according to the context. Tests are changed to support
this new structure.

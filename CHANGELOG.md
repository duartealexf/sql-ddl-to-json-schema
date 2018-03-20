# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

# Roadmap

## SQL dialects

There are several SQL dialects that this project will eventually cover, in this order:

- MariaDB 10.2.13 / MySQL 5.7
- PostgreSQL
- MSSQL
- Oracle

Roadmap for each one is still in WIP.

## MariaDB / MySQL

- [X] CREATE DATABASE
  - [X] CHARACTER SET
  - [X] COLLATION
- [X] CREATE TABLE
  - [X] COLUMN DEFINITIONS / KEYS / INDEX
  - [X] CREATE TABLE OPTIONS
  - [X] CREATE TABLE LIKE
- [x] CREATE INDEX
- [x] ALTER DATABASE
- [X] ALTER TABLE
- [X] DROP DATABASE
- [X] DROP INDEX
- [X] DROP TABLE
- [X] RENAME TABLE

More complex features are not priority, as they require parsing SELECT statements or expressions* ...

- `CREATE TABLE AS (EXPRESSION)`*
- `CREATE TABLE GENERATED AS (EXPRESSION)` columns
- `CREATE TABLE` partition options
- `CREATE VIEW`
- `ALTER VIEW`
- `DROP VIEW`
- `CHECK CONSTRAINTS`**
- Expressions as column default values (MariaDB only)

\* https://dev.mysql.com/doc/refman/5.7/en/expressions.html

\*\* https://mariadb.com/kb/en/library/constraint/

## PostgreSQL

- [ ] CREATE DATABASE
- [ ] CREATE INDEX
- [ ] CREATE TABLE
- [ ] CREATE VIEW
- [ ] ALTER DATABASE
- [ ] ALTER TABLE
- [ ] ALTER VIEW
- [ ] DROP DATABASE
- [ ] DROP INDEX
- [ ] DROP TABLE
- [ ] DROP VIEW
- [ ] RENAME TABLE

## MSSQL

TODO

## Oracle

TODO

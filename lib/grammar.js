// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

const moo = require('moo');

const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = {
  ...keywords,
  ...symbols
}

const lexer = moo.compile(rules);

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_INTEGER_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_FIXED_POINT_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_FLOATING_POINT_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_BIT_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_DATETIME_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_YEAR_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_VARIABLE_STRING_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_FIXED_STRING_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_ENUM_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_SET_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_SPATIAL_DATATYPE"]},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_JSON_DATATYPE"]},
    {"name": "O_DATATYPE", "symbols": ["O_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_DATATYPE',
            def: d[0][0]
          }
        }},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_INTEGER") ? {type: "K_INTEGER"} : K_INTEGER)]},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_SMALLINT") ? {type: "K_SMALLINT"} : K_SMALLINT)]},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TINYINT") ? {type: "K_TINYINT"} : K_TINYINT)]},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MEDIUMINT") ? {type: "K_MEDIUMINT"} : K_MEDIUMINT)]},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_BIGINT") ? {type: "K_BIGINT"} : K_BIGINT)]},
    {"name": "O_INTEGER_DATATYPE", "symbols": ["O_INTEGER_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_INTEGER_DATATYPE',
            def: d[0][0]
          }
        }},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DECIMAL") ? {type: "K_DECIMAL"} : K_DECIMAL)], "postprocess": id},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_NUMERIC") ? {type: "K_NUMERIC"} : K_NUMERIC)], "postprocess": id},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":","}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess":  d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess":  d => {
          return {
            digits: d[3],
            decimals: 0
          }
        }},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_FIXED_POINT_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1", "symbols": ["O_FIXED_POINT_DATATYPE$subexpression$1$subexpression$1", "O_FIXED_POINT_DATATYPE$subexpression$1$ebnf$1"]},
    {"name": "O_FIXED_POINT_DATATYPE", "symbols": ["O_FIXED_POINT_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_FIXED_POINT_DATATYPE',
            def: {
              datatype: d[0][0],
              spec: d[0][1]
            }
          }
        }},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_FLOAT") ? {type: "K_FLOAT"} : K_FLOAT)], "postprocess": id},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DOUBLE") ? {type: "K_DOUBLE"} : K_DOUBLE)], "postprocess": id},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":","}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess":  d => {
          return {
            digits: d[3] + d[7],
            decimals: d[7]
          }
        }},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_FLOATING_POINT_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1", "symbols": ["O_FLOATING_POINT_DATATYPE$subexpression$1$subexpression$1", "O_FLOATING_POINT_DATATYPE$subexpression$1$ebnf$1"]},
    {"name": "O_FLOATING_POINT_DATATYPE", "symbols": ["O_FLOATING_POINT_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_FLOATING_POINT_DATATYPE',
            def: {
              datatype: d[0][0],
              spec: d[0][1]
            }
          }
        }},
    {"name": "O_BIT_DATATYPE", "symbols": [(lexer.has("K_BIT") ? {type: "K_BIT"} : K_BIT), "_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess":  d => {
          return {
            type: 'O_BIT_DATATYPE',
            def: {
              values: d[4]
            }
          }
        }},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_DATE") ? {type: "K_DATE"} : K_DATE)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TIME") ? {type: "K_TIME"} : K_TIME)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_DATETIME") ? {type: "K_DATETIME"} : K_DATETIME)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TIMESTAMP") ? {type: "K_TIMESTAMP"} : K_TIMESTAMP)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess": d => d[3]},
    {"name": "O_DATETIME_DATATYPE$ebnf$1", "symbols": ["O_DATETIME_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_DATETIME_DATATYPE", "symbols": ["O_DATETIME_DATATYPE$subexpression$1", "O_DATETIME_DATATYPE$ebnf$1"], "postprocess":  d => {
          return {
            type: 'O_DATETIME_DATATYPE',
            def: {
              datatype: d[0],
              fractional: d[1]
            }
          }
        }},
    {"name": "O_YEAR_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess": d => d[3]},
    {"name": "O_YEAR_DATATYPE$ebnf$1", "symbols": ["O_YEAR_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_YEAR_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_YEAR_DATATYPE", "symbols": ["_", (lexer.has("K_YEAR") ? {type: "K_YEAR"} : K_YEAR), "O_YEAR_DATATYPE$ebnf$1", "_"], "postprocess":  d => {
          return {
            type: 'O_YEAR_DATATYPE',
            def: {
              datatype: d[1],
              digits: d[2] || 4
            }
          }
        }},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_CHAR") ? {type: "K_CHAR"} : K_CHAR)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_VARCHAR") ? {type: "K_VARCHAR"} : K_VARCHAR)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_BINARY") ? {type: "K_BINARY"} : K_BINARY)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_VARBINARY") ? {type: "K_VARBINARY"} : K_VARBINARY)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE", "symbols": ["O_VARIABLE_STRING_DATATYPE$subexpression$1", "_", {"literal":"("}, "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", {"literal":")"}], "postprocess":  d => {
          return {
            type: 'O_VARIABLE_STRING_DATATYPE',
            def: {
              datatype: d[0],
              length: d[4]
            }
          }
        }},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TINYBLOB") ? {type: "K_TINYBLOB"} : K_TINYBLOB)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_BLOB") ? {type: "K_BLOB"} : K_BLOB)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MEDIUMBLOB") ? {type: "K_MEDIUMBLOB"} : K_MEDIUMBLOB)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_LONGBLOB") ? {type: "K_LONGBLOB"} : K_LONGBLOB)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TINYTEXT") ? {type: "K_TINYTEXT"} : K_TINYTEXT)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TEXT") ? {type: "K_TEXT"} : K_TEXT)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MEDIUMTEXT") ? {type: "K_MEDIUMTEXT"} : K_MEDIUMTEXT)]},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_LONGTEXT") ? {type: "K_LONGTEXT"} : K_LONGTEXT)]},
    {"name": "O_FIXED_STRING_DATATYPE", "symbols": ["O_FIXED_STRING_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_FIXED_STRING_DATATYPE',
            def: {
              datatype: d[0][0],
            }
          }
        }},
    {"name": "O_ENUM_DATATYPE$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_ENUM_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "_"], "postprocess": d => d[4]},
    {"name": "O_ENUM_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_ENUM_DATATYPE$subexpression$1$ebnf$1", "O_ENUM_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ENUM_DATATYPE$subexpression$1", "symbols": ["_", {"literal":"("}, "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "O_ENUM_DATATYPE$subexpression$1$ebnf$1", "_", {"literal":")"}], "postprocess": d => [d[4]].concat(d[6])},
    {"name": "O_ENUM_DATATYPE", "symbols": [(lexer.has("K_ENUM") ? {type: "K_ENUM"} : K_ENUM), "O_ENUM_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_ENUM_DATATYPE',
            def: {
              datatype: d[0],
              values: d[1],
            }
          }
        }},
    {"name": "O_SET_DATATYPE$subexpression$1", "symbols": [{"literal":"("}, "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "_", {"literal":")"}], "postprocess": d => [d[3]]},
    {"name": "O_SET_DATATYPE$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_SET_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "_"], "postprocess": d => d[4]},
    {"name": "O_SET_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_SET_DATATYPE$subexpression$1$ebnf$1", "O_SET_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_SET_DATATYPE$subexpression$1", "symbols": [{"literal":"("}, "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "O_SET_DATATYPE$subexpression$1$ebnf$1", "_", {"literal":")"}], "postprocess": d => Array.isArray(d[5]) ? [d[3]].concat(d[5]) : [d[3]]},
    {"name": "O_SET_DATATYPE", "symbols": [(lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "_", "O_SET_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_SET_DATATYPE',
            def: {
              datatype: d[0],
              values: d[2],
            }
          }
        }},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_GEOMETRY") ? {type: "K_GEOMETRY"} : K_GEOMETRY)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_POINT") ? {type: "K_POINT"} : K_POINT)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_LINESTRING") ? {type: "K_LINESTRING"} : K_LINESTRING)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_POLYGON") ? {type: "K_POLYGON"} : K_POLYGON)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MULTIPOINT") ? {type: "K_MULTIPOINT"} : K_MULTIPOINT)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MULTILINESTRING") ? {type: "K_MULTILINESTRING"} : K_MULTILINESTRING)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MULTIPOLYGON") ? {type: "K_MULTIPOLYGON"} : K_MULTIPOLYGON)]},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_GEOMETRYCOLLECTION") ? {type: "K_GEOMETRYCOLLECTION"} : K_GEOMETRYCOLLECTION)]},
    {"name": "O_SPATIAL_DATATYPE", "symbols": ["O_SPATIAL_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            type: 'O_SPATIAL_DATATYPE',
            def: {
              datatype: d[0][0],
            }
          }
        }},
    {"name": "O_JSON_DATATYPE", "symbols": [(lexer.has("K_JSON") ? {type: "K_JSON"} : K_JSON)], "postprocess":  d => {
          return {
            type: 'O_JSON_DATATYPE',
            def: {
              datatype: d[0],
            }
          }
        }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT)]},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1", "symbols": ["P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1", "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_CREATE_DB$ebnf$1", "symbols": ["P_CREATE_DB$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$2$subexpression$1", "symbols": ["__", "P_CREATE_DB_SPEC"]},
    {"name": "P_CREATE_DB$ebnf$2", "symbols": ["P_CREATE_DB$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$3", "symbols": [(lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS)], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB", "symbols": ["_", (lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "__", (lexer.has("K_DATABASE") ? {type: "K_DATABASE"} : K_DATABASE), "P_CREATE_DB$ebnf$1", "__", (lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "P_CREATE_DB$ebnf$2", "P_CREATE_DB$ebnf$3"], "postprocess":  d => {
          return {
            type: 'P_CREATE_DB',
            def: {
              database: d[6]
            }
          }
        }},
    {"name": "O_CHARSET$subexpression$1", "symbols": [(lexer.has("S_DQUOTE_STRING") ? {type: "S_DQUOTE_STRING"} : S_DQUOTE_STRING)]},
    {"name": "O_CHARSET$subexpression$1", "symbols": [(lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING)]},
    {"name": "O_CHARSET$subexpression$1", "symbols": [(lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER)]},
    {"name": "O_CHARSET", "symbols": ["O_CHARSET$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "O_COLLATION$subexpression$1", "symbols": [(lexer.has("S_DQUOTE_STRING") ? {type: "S_DQUOTE_STRING"} : S_DQUOTE_STRING)]},
    {"name": "O_COLLATION$subexpression$1", "symbols": [(lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING)]},
    {"name": "O_COLLATION$subexpression$1", "symbols": [(lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER)]},
    {"name": "O_COLLATION", "symbols": ["O_COLLATION$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$1", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$2", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$1", (lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "_", "P_CREATE_DB_SPEC$subexpression$1$ebnf$2", "_", "O_CHARSET"], "postprocess": d => null},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$3$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$3", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$4", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$3", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "_", "P_CREATE_DB_SPEC$subexpression$1$ebnf$4", "_", "O_COLLATION"], "postprocess": d => null},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$5$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$5", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$6", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$7$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$7", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$7$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$8", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$8", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$5", (lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "_", "P_CREATE_DB_SPEC$subexpression$1$ebnf$6", "_", "O_CHARSET", "__", "P_CREATE_DB_SPEC$subexpression$1$ebnf$7", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "_", "P_CREATE_DB_SPEC$subexpression$1$ebnf$8", "_", "O_COLLATION"], "postprocess": d => null},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$9$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$9", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$9$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$9", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$10", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$10", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$11$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$11", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$11$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$11", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$12", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "P_CREATE_DB_SPEC$subexpression$1$ebnf$12", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB_SPEC$subexpression$1", "symbols": ["P_CREATE_DB_SPEC$subexpression$1$ebnf$9", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "_", "P_CREATE_DB_SPEC$subexpression$1$ebnf$10", "_", "O_COLLATION", "__", "P_CREATE_DB_SPEC$subexpression$1$ebnf$11", (lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "_", "P_CREATE_DB_SPEC$subexpression$1$ebnf$12", "_", "O_CHARSET"], "postprocess": d => null},
    {"name": "P_CREATE_DB_SPEC", "symbols": ["P_CREATE_DB_SPEC$subexpression$1"], "postprocess": d => null},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "P_CREATE_TABLE$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_TEMPORARY") ? {type: "K_TEMPORARY"} : K_TEMPORARY)]},
    {"name": "P_CREATE_TABLE$ebnf$1", "symbols": ["P_CREATE_TABLE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE$ebnf$2$subexpression$1$ebnf$1", "symbols": [(lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT)], "postprocess": id},
    {"name": "P_CREATE_TABLE$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", "P_CREATE_TABLE$ebnf$2$subexpression$1$ebnf$1", "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_CREATE_TABLE$ebnf$2", "symbols": ["P_CREATE_TABLE$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE$ebnf$3", "symbols": [(lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS)], "postprocess": id},
    {"name": "P_CREATE_TABLE$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE", "symbols": ["_", (lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "P_CREATE_TABLE$ebnf$1", "__", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "P_CREATE_TABLE$ebnf$2", "__", (lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "P_CREATE_TABLE$ebnf$3"], "postprocess":  d => {
          return {
            type: 'P_CREATE_TABLE',
            def: {
              table: d[7],
              spec: d[9]
            }
          }
        }},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$1$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "__", "P_COLUMN_DEFINITION", (lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS), "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$1$ebnf$1", (lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS)]},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1", "symbols": ["P_CREATE_TABLE_SPEC$ebnf$1$subexpression$1"]},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$2$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$2$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "__", "P_COLUMN_DEFINITION", (lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS), "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$2$ebnf$1", (lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS)]},
    {"name": "P_CREATE_TABLE_SPEC$ebnf$1", "symbols": ["P_CREATE_TABLE_SPEC$ebnf$1", "P_CREATE_TABLE_SPEC$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_TABLE_SPEC", "symbols": ["_", {"literal":"("}, "_", "P_CREATE_TABLE_SPEC$ebnf$1", "_", {"literal":")"}, "_"], "postprocess":  d => {
          return {
            type: 'P_CREATE_TABLE_SPEC',
            def: d[3]
          }
        }},
    {"name": "P_COLUMN_DEFINITION", "symbols": [{"literal":"TODO"}]},
    {"name": "P_CREATE_TABLE_OPTIONS", "symbols": [{"literal":"TODO"}]},
    {"name": "P_CREATE_TABLE_PART_OPTIONS", "symbols": [{"literal":"TODO"}]},
    {"name": "main$ebnf$1", "symbols": ["P_DDS"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "P_DDS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess":  d => {
          return {
            type: 'MAIN',
            def: d[0][0]
          }
        }},
    {"name": "P_DDS$subexpression$1", "symbols": ["P_CREATE_DB"], "postprocess": id},
    {"name": "P_DDS$subexpression$1", "symbols": ["P_CREATE_TABLE"], "postprocess": id},
    {"name": "P_DDS", "symbols": ["P_DDS$subexpression$1"], "postprocess":  d => {
          return {
            type: 'P_DDS',
            def: d[0]
          }
        }}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

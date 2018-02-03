// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

const moo = require('moo');

const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = {
  ...keywords,
  ...symbols,
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
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT)]},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1", "symbols": ["P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "P_CREATE_DB$ebnf$1$subexpression$1$ebnf$1", "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_CREATE_DB$ebnf$1", "symbols": ["P_CREATE_DB$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$2$subexpression$1", "symbols": ["__", "P_SPEC_CREATE_DB"], "postprocess": d => d[1]},
    {"name": "P_CREATE_DB$ebnf$2", "symbols": ["P_CREATE_DB$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$3", "symbols": [(lexer.has("S_EOS") ? {type: "S_EOS"} : S_EOS)], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB", "symbols": ["_", (lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "__", (lexer.has("K_DATABASE") ? {type: "K_DATABASE"} : K_DATABASE), "P_CREATE_DB$ebnf$1", "__", (lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "P_CREATE_DB$ebnf$2", "P_CREATE_DB$ebnf$3"], "postprocess":  d => {
          return {
            type: 'P_CREATE_DB',
            def: {
              database: d[6],
              meta: d[7]
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
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$1", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$1", "symbols": ["__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$1", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$1", (lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "P_SPEC_CREATE_DB$subexpression$1$subexpression$1", "O_CHARSET"], "postprocess":  d => {
          return {
            charset: d[5]
          }
        }},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$2$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$2", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$2", "symbols": ["__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$2", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$2", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "P_SPEC_CREATE_DB$subexpression$1$subexpression$2", "O_COLLATION"], "postprocess":  d => {
          return {
            collation: d[3]
          }
        }},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$3$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$3", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$3", "symbols": ["__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$3", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$4$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$4", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$4", "symbols": ["__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$4", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$3", (lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "P_SPEC_CREATE_DB$subexpression$1$subexpression$3", "O_CHARSET", "__", "P_SPEC_CREATE_DB$subexpression$1$ebnf$4", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "P_SPEC_CREATE_DB$subexpression$1$subexpression$4", "O_COLLATION"], "postprocess":  d => {
          return {
            charset: d[5],
            collation: d[10]
          }
        }},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$5$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$5", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$5", "symbols": ["__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$5", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$6$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$6", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$6$subexpression$1"], "postprocess": id},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$6", "symbols": ["__"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1$subexpression$6", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SPEC_CREATE_DB$subexpression$1", "symbols": ["P_SPEC_CREATE_DB$subexpression$1$ebnf$5", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "P_SPEC_CREATE_DB$subexpression$1$subexpression$5", "O_COLLATION", "__", "P_SPEC_CREATE_DB$subexpression$1$ebnf$6", (lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "P_SPEC_CREATE_DB$subexpression$1$subexpression$6", "O_CHARSET"], "postprocess":  d => {
          return {
            charset: d[10],
            collation: d[3]
          }
        }},
    {"name": "P_SPEC_CREATE_DB", "symbols": ["P_SPEC_CREATE_DB$subexpression$1"], "postprocess":  d => {
          return {
            type: 'P_SPEC_CREATE_DB',
            def: {
              charset: d[0].charset || null,
              collation: d[0].collation || null,
            }
          }
        }},
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
    {"name": "P_CREATE_TABLE", "symbols": [(lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "P_CREATE_TABLE$ebnf$1", "__", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "P_CREATE_TABLE$ebnf$2", "__", (lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "_", "P_SPEC_CREATE_TABLE"], "postprocess":  d => {
          return {
            type: 'P_CREATE_TABLE',
            def: {
              table: d[7],
              spec: d[9]
            }
          }
        }},
    {"name": "P_SPEC_CREATE_TABLE", "symbols": [(lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER), "_", "P_COLUMN_DEFINITION", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            type: 'P_SPEC_CREATE_TABLE',
            def: d[3]
          }
        }},
    {"name": "P_COLUMN_DEFINITION", "symbols": [(lexer.has("S_IDENTIFIER") ? {type: "S_IDENTIFIER"} : S_IDENTIFIER)]},
    {"name": "main$ebnf$1", "symbols": ["P_DDS"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "P_DDS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess":  d => {
          return {
            type: 'MAIN',
            def: d[0]
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

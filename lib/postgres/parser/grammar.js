// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');

const utils = require('../../shared/utils');
const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = Object.assign({}, keywords, symbols);

const lexer = moo.compile(rules);
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "P_DDS$subexpression$1", "symbols": ["_", "P_SET"], "postprocess": id},
    {"name": "P_DDS$subexpression$1", "symbols": ["_", "P_CREATE_TABLE"], "postprocess": id},
    {"name": "P_DDS", "symbols": ["P_DDS$subexpression$1"], "postprocess":  d => {
          return {
            id: 'P_DDS',
            def: d[1]
          }
        }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "S_EOS", "symbols": ["_", (lexer.has("S_SEMICOLON") ? {type: "S_SEMICOLON"} : S_SEMICOLON)]},
    {"name": "O_CHARSET", "symbols": ["O_QUOTED_STRING"], "postprocess": d => d[0]},
    {"name": "O_CHARSET", "symbols": ["S_IDENTIFIER"], "postprocess": d => d[0]},
    {"name": "O_COLLATION", "symbols": ["O_QUOTED_STRING"], "postprocess": d => d[0]},
    {"name": "O_COLLATION", "symbols": ["S_IDENTIFIER"], "postprocess": d => d[0]},
    {"name": "O_ENGINE", "symbols": ["O_QUOTED_STRING"], "postprocess": d => d[0]},
    {"name": "O_ENGINE", "symbols": ["S_IDENTIFIER"], "postprocess": d => d[0]},
    {"name": "O_DEFAULT_VALUE", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess": d => d[0].value},
    {"name": "O_DEFAULT_VALUE", "symbols": [(lexer.has("S_BIT_FORMAT") ? {type: "S_BIT_FORMAT"} : S_BIT_FORMAT)], "postprocess": d => d[0].value},
    {"name": "O_DEFAULT_VALUE", "symbols": [(lexer.has("S_HEXA_FORMAT") ? {type: "S_HEXA_FORMAT"} : S_HEXA_FORMAT)], "postprocess": d => d[0].value},
    {"name": "O_DEFAULT_VALUE$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": () => "()"},
    {"name": "O_DEFAULT_VALUE$ebnf$1", "symbols": ["O_DEFAULT_VALUE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_DEFAULT_VALUE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_DEFAULT_VALUE", "symbols": ["S_IDENTIFIER", "O_DEFAULT_VALUE$ebnf$1"], "postprocess": d => d[0] + (d[1] || '')},
    {"name": "O_DEFAULT_VALUE", "symbols": ["O_QUOTED_STRING"], "postprocess": id},
    {"name": "O_QUOTED_STRING", "symbols": [(lexer.has("S_DQUOTE_STRING") ? {type: "S_DQUOTE_STRING"} : S_DQUOTE_STRING)], "postprocess": d => d[0].value},
    {"name": "O_QUOTED_STRING", "symbols": [(lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING)], "postprocess": d => d[0].value},
    {"name": "O_TABLE_OPTION_VALUE", "symbols": ["O_QUOTED_STRING"], "postprocess": d => d[0]},
    {"name": "O_TABLE_OPTION_VALUE", "symbols": ["S_IDENTIFIER"], "postprocess": d => d[0]},
    {"name": "O_TABLE_OPTION_VALUE", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("S_IDENTIFIER_QUOTED") ? {type: "S_IDENTIFIER_QUOTED"} : S_IDENTIFIER_QUOTED)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("S_IDENTIFIER_UNQUOTED") ? {type: "S_IDENTIFIER_UNQUOTED"} : S_IDENTIFIER_UNQUOTED)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TO") ? {type: "K_TO"} : K_TO)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PI") ? {type: "K_PI"} : K_PI)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_IF") ? {type: "K_IF"} : K_IF)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_OR") ? {type: "K_OR"} : K_OR)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ON") ? {type: "K_ON"} : K_ON)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BY") ? {type: "K_BY"} : K_BY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NO") ? {type: "K_NO"} : K_NO)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_AS") ? {type: "K_AS"} : K_AS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ASC") ? {type: "K_ASC"} : K_ASC)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FOR") ? {type: "K_FOR"} : K_FOR)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LZ4") ? {type: "K_LZ4"} : K_LZ4)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SET") ? {type: "K_SET"} : K_SET)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NOW") ? {type: "K_NOW"} : K_NOW)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_INT") ? {type: "K_INT"} : K_INT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_YES") ? {type: "K_YES"} : K_YES)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BIT") ? {type: "K_BIT"} : K_BIT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ZLIB") ? {type: "K_ZLIB"} : K_ZLIB)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DATE") ? {type: "K_DATE"} : K_DATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DESC") ? {type: "K_DESC"} : K_DESC)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DISK") ? {type: "K_DISK"} : K_DISK)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_WITH") ? {type: "K_WITH"} : K_WITH)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TRUE") ? {type: "K_TRUE"} : K_TRUE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DATA") ? {type: "K_DATA"} : K_DATA)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ENUM") ? {type: "K_ENUM"} : K_ENUM)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BOOL") ? {type: "K_BOOL"} : K_BOOL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NULL") ? {type: "K_NULL"} : K_NULL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_RAND") ? {type: "K_RAND"} : K_RAND)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TIME") ? {type: "K_TIME"} : K_TIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TEXT") ? {type: "K_TEXT"} : K_TEXT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PAGE") ? {type: "K_PAGE"} : K_PAGE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_USER") ? {type: "K_USER"} : K_USER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_YEAR") ? {type: "K_YEAR"} : K_YEAR)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BLOB") ? {type: "K_BLOB"} : K_BLOB)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FULL") ? {type: "K_FULL"} : K_FULL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_HASH") ? {type: "K_HASH"} : K_HASH)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NONE") ? {type: "K_NONE"} : K_NONE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_WAIT") ? {type: "K_WAIT"} : K_WAIT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COPY") ? {type: "K_COPY"} : K_COPY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_JSON") ? {type: "K_JSON"} : K_JSON)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CHAR") ? {type: "K_CHAR"} : K_CHAR)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_KEYS") ? {type: "K_KEYS"} : K_KEYS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LAST") ? {type: "K_LAST"} : K_LAST)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LIKE") ? {type: "K_LIKE"} : K_LIKE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LOCK") ? {type: "K_LOCK"} : K_LOCK)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UUID") ? {type: "K_UUID"} : K_UUID)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UNION") ? {type: "K_UNION"} : K_UNION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FALSE") ? {type: "K_FALSE"} : K_FALSE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FIRST") ? {type: "K_FIRST"} : K_FIRST)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FIXED") ? {type: "K_FIXED"} : K_FIXED)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ORDER") ? {type: "K_ORDER"} : K_ORDER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FORCE") ? {type: "K_FORCE"} : K_FORCE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_USING") ? {type: "K_USING"} : K_USING)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_AFTER") ? {type: "K_AFTER"} : K_AFTER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BTREE") ? {type: "K_BTREE"} : K_BTREE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_RTREE") ? {type: "K_RTREE"} : K_RTREE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MATCH") ? {type: "K_MATCH"} : K_MATCH)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NCHAR") ? {type: "K_NCHAR"} : K_NCHAR)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ROUND") ? {type: "K_ROUND"} : K_ROUND)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ALTER") ? {type: "K_ALTER"} : K_ALTER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_POINT") ? {type: "K_POINT"} : K_POINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FLOAT") ? {type: "K_FLOAT"} : K_FLOAT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PARSER") ? {type: "K_PARSER"} : K_PARSER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CHANGE") ? {type: "K_CHANGE"} : K_CHANGE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DOUBLE") ? {type: "K_DOUBLE"} : K_DOUBLE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UNIQUE") ? {type: "K_UNIQUE"} : K_UNIQUE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PERIOD") ? {type: "K_PERIOD"} : K_PERIOD)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SCHEMA") ? {type: "K_SCHEMA"} : K_SCHEMA)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ONLINE") ? {type: "K_ONLINE"} : K_ONLINE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ACTION") ? {type: "K_ACTION"} : K_ACTION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_IMPORT") ? {type: "K_IMPORT"} : K_IMPORT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SHARED") ? {type: "K_SHARED"} : K_SHARED)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_IGNORE") ? {type: "K_IGNORE"} : K_IGNORE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NOWAIT") ? {type: "K_NOWAIT"} : K_NOWAIT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BINARY") ? {type: "K_BINARY"} : K_BINARY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_RENAME") ? {type: "K_RENAME"} : K_RENAME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SIMPLE") ? {type: "K_SIMPLE"} : K_SIMPLE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SYSTEM") ? {type: "K_SYSTEM"} : K_SYSTEM)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BIGINT") ? {type: "K_BIGINT"} : K_BIGINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UPDATE") ? {type: "K_UPDATE"} : K_UPDATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ENGINE") ? {type: "K_ENGINE"} : K_ENGINE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DELETE") ? {type: "K_DELETE"} : K_DELETE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MODIFY") ? {type: "K_MODIFY"} : K_MODIFY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MEMORY") ? {type: "K_MEMORY"} : K_MEMORY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ENABLE") ? {type: "K_ENABLE"} : K_ENABLE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PARTIAL") ? {type: "K_PARTIAL"} : K_PARTIAL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_WITHOUT") ? {type: "K_WITHOUT"} : K_WITHOUT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_VERSION") ? {type: "K_VERSION"} : K_VERSION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ZONE") ? {type: "K_ZONE"} : K_ZONE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_VARYING") ? {type: "K_VARYING"} : K_VARYING)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_VARCHAR") ? {type: "K_VARCHAR"} : K_VARCHAR)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_POLYGON") ? {type: "K_POLYGON"} : K_POLYGON)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PRIMARY") ? {type: "K_PRIMARY"} : K_PRIMARY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_OFFLINE") ? {type: "K_OFFLINE"} : K_OFFLINE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NUMERIC") ? {type: "K_NUMERIC"} : K_NUMERIC)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_BOOLEAN") ? {type: "K_BOOLEAN"} : K_BOOLEAN)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CASCADE") ? {type: "K_CASCADE"} : K_CASCADE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CHARSET") ? {type: "K_CHARSET"} : K_CHARSET)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_REPLACE") ? {type: "K_REPLACE"} : K_REPLACE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COMMENT") ? {type: "K_COMMENT"} : K_COMMENT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COMPACT") ? {type: "K_COMPACT"} : K_COMPACT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_INTEGER") ? {type: "K_INTEGER"} : K_INTEGER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CURDATE") ? {type: "K_CURDATE"} : K_CURDATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CURTIME") ? {type: "K_CURTIME"} : K_CURTIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DECIMAL") ? {type: "K_DECIMAL"} : K_DECIMAL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DISABLE") ? {type: "K_DISABLE"} : K_DISABLE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DISCARD") ? {type: "K_DISCARD"} : K_DISCARD)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DYNAMIC") ? {type: "K_DYNAMIC"} : K_DYNAMIC)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TINYINT") ? {type: "K_TINYINT"} : K_TINYINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FOREIGN") ? {type: "K_FOREIGN"} : K_FOREIGN)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SYSDATE") ? {type: "K_SYSDATE"} : K_SYSDATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_STORAGE") ? {type: "K_STORAGE"} : K_STORAGE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_INPLACE") ? {type: "K_INPLACE"} : K_INPLACE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SPATIAL") ? {type: "K_SPATIAL"} : K_SPATIAL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CONVERT") ? {type: "K_CONVERT"} : K_CONVERT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SMALLINT") ? {type: "K_SMALLINT"} : K_SMALLINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LONGTEXT") ? {type: "K_LONGTEXT"} : K_LONGTEXT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_RESTRICT") ? {type: "K_RESTRICT"} : K_RESTRICT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CHECKSUM") ? {type: "K_CHECKSUM"} : K_CHECKSUM)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PASSWORD") ? {type: "K_PASSWORD"} : K_PASSWORD)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UTC_DATE") ? {type: "K_UTC_DATE"} : K_UTC_DATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ZEROFILL") ? {type: "K_ZEROFILL"} : K_ZEROFILL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MIN_ROWS") ? {type: "K_MIN_ROWS"} : K_MIN_ROWS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DATETIME") ? {type: "K_DATETIME"} : K_DATETIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TINYTEXT") ? {type: "K_TINYTEXT"} : K_TINYTEXT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UNSIGNED") ? {type: "K_UNSIGNED"} : K_UNSIGNED)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LONGBLOB") ? {type: "K_LONGBLOB"} : K_LONGBLOB)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DATABASE") ? {type: "K_DATABASE"} : K_DATABASE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MAX_ROWS") ? {type: "K_MAX_ROWS"} : K_MAX_ROWS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_GEOMETRY") ? {type: "K_GEOMETRY"} : K_GEOMETRY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FULLTEXT") ? {type: "K_FULLTEXT"} : K_FULLTEXT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_NATIONAL") ? {type: "K_NATIONAL"} : K_NATIONAL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UTC_TIME") ? {type: "K_UTC_TIME"} : K_UTC_TIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TINYBLOB") ? {type: "K_TINYBLOB"} : K_TINYBLOB)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ALGORITHM") ? {type: "K_ALGORITHM"} : K_ALGORITHM)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PACK_KEYS") ? {type: "K_PACK_KEYS"} : K_PACK_KEYS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_INVISIBLE") ? {type: "K_INVISIBLE"} : K_INVISIBLE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DIRECTORY") ? {type: "K_DIRECTORY"} : K_DIRECTORY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TIMESTAMP") ? {type: "K_TIMESTAMP"} : K_TIMESTAMP)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MEDIUMINT") ? {type: "K_MEDIUMINT"} : K_MEDIUMINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LOCALTIME") ? {type: "K_LOCALTIME"} : K_LOCALTIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ROW_COUNT") ? {type: "K_ROW_COUNT"} : K_ROW_COUNT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_EXCLUSIVE") ? {type: "K_EXCLUSIVE"} : K_EXCLUSIVE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_REDUNDANT") ? {type: "K_REDUNDANT"} : K_REDUNDANT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TEMPORARY") ? {type: "K_TEMPORARY"} : K_TEMPORARY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_VARBINARY") ? {type: "K_VARBINARY"} : K_VARBINARY)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MEDIUMTEXT") ? {type: "K_MEDIUMTEXT"} : K_MEDIUMTEXT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_REFERENCES") ? {type: "K_REFERENCES"} : K_REFERENCES)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TABLESPACE") ? {type: "K_TABLESPACE"} : K_TABLESPACE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_FOUND_ROWS") ? {type: "K_FOUND_ROWS"} : K_FOUND_ROWS)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UUID_SHORT") ? {type: "K_UUID_SHORT"} : K_UUID_SHORT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ROW_FORMAT") ? {type: "K_ROW_FORMAT"} : K_ROW_FORMAT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_VALIDATION") ? {type: "K_VALIDATION"} : K_VALIDATION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ENCRYPTION") ? {type: "K_ENCRYPTION"} : K_ENCRYPTION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COMPRESSED") ? {type: "K_COMPRESSED"} : K_COMPRESSED)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MEDIUMBLOB") ? {type: "K_MEDIUMBLOB"} : K_MEDIUMBLOB)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CONNECTION") ? {type: "K_CONNECTION"} : K_CONNECTION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LINESTRING") ? {type: "K_LINESTRING"} : K_LINESTRING)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MULTIPOINT") ? {type: "K_MULTIPOINT"} : K_MULTIPOINT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_VERSIONING") ? {type: "K_VERSIONING"} : K_VERSIONING)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SYSTEM_USER") ? {type: "K_SYSTEM_USER"} : K_SYSTEM_USER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SYSTEM_TIME") ? {type: "K_SYSTEM_TIME"} : K_SYSTEM_TIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_IETF_QUOTES") ? {type: "K_IETF_QUOTES"} : K_IETF_QUOTES)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COMPRESSION") ? {type: "K_COMPRESSION"} : K_COMPRESSION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CURRENT_USER") ? {type: "K_CURRENT_USER"} : K_CURRENT_USER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CURRENT_TIME") ? {type: "K_CURRENT_TIME"} : K_CURRENT_TIME)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CURRENT_DATE") ? {type: "K_CURRENT_DATE"} : K_CURRENT_DATE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MULTIPOLYGON") ? {type: "K_MULTIPOLYGON"} : K_MULTIPOLYGON)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_SESSION_USER") ? {type: "K_SESSION_USER"} : K_SESSION_USER)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_INSERT_METHOD") ? {type: "K_INSERT_METHOD"} : K_INSERT_METHOD)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UTC_TIMESTAMP") ? {type: "K_UTC_TIMESTAMP"} : K_UTC_TIMESTAMP)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_TRANSACTIONAL") ? {type: "K_TRANSACTIONAL"} : K_TRANSACTIONAL)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_PAGE_CHECKSUM") ? {type: "K_PAGE_CHECKSUM"} : K_PAGE_CHECKSUM)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CONNECTION_ID") ? {type: "K_CONNECTION_ID"} : K_CONNECTION_ID)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_COLUMN_FORMAT") ? {type: "K_COLUMN_FORMAT"} : K_COLUMN_FORMAT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_KEY_BLOCK_SIZE") ? {type: "K_KEY_BLOCK_SIZE"} : K_KEY_BLOCK_SIZE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LAST_INSERT_ID") ? {type: "K_LAST_INSERT_ID"} : K_LAST_INSERT_ID)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_UNIX_TIMESTAMP") ? {type: "K_UNIX_TIMESTAMP"} : K_UNIX_TIMESTAMP)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_AVG_ROW_LENGTH") ? {type: "K_AVG_ROW_LENGTH"} : K_AVG_ROW_LENGTH)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_AUTO_INCREMENT") ? {type: "K_AUTO_INCREMENT"} : K_AUTO_INCREMENT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_LOCALTIMESTAMP") ? {type: "K_LOCALTIMESTAMP"} : K_LOCALTIMESTAMP)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_MULTILINESTRING") ? {type: "K_MULTILINESTRING"} : K_MULTILINESTRING)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_DELAY_KEY_WRITE") ? {type: "K_DELAY_KEY_WRITE"} : K_DELAY_KEY_WRITE)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_STATS_PERSISTENT") ? {type: "K_STATS_PERSISTENT"} : K_STATS_PERSISTENT)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_CURRENT_TIMESTAMP") ? {type: "K_CURRENT_TIMESTAMP"} : K_CURRENT_TIMESTAMP)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_ENCRYPTION_KEY_ID") ? {type: "K_ENCRYPTION_KEY_ID"} : K_ENCRYPTION_KEY_ID)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_STATS_AUTO_RECALC") ? {type: "K_STATS_AUTO_RECALC"} : K_STATS_AUTO_RECALC)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_GEOMETRYCOLLECTION") ? {type: "K_GEOMETRYCOLLECTION"} : K_GEOMETRYCOLLECTION)], "postprocess": d => d[0].value},
    {"name": "S_IDENTIFIER", "symbols": [(lexer.has("K_STATS_SAMPLE_PAGES") ? {type: "K_STATS_SAMPLE_PAGES"} : K_STATS_SAMPLE_PAGES)], "postprocess": d => d[0].value},
    {"name": "P_ALTER_DB$subexpression$1", "symbols": [(lexer.has("K_DATABASE") ? {type: "K_DATABASE"} : K_DATABASE)]},
    {"name": "P_ALTER_DB$subexpression$1", "symbols": [(lexer.has("K_SCHEMA") ? {type: "K_SCHEMA"} : K_SCHEMA)]},
    {"name": "P_ALTER_DB$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "P_ALTER_DB$ebnf$1", "symbols": ["P_ALTER_DB$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_ALTER_DB$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_ALTER_DB$ebnf$2$subexpression$1", "symbols": ["__", "O_ALTER_DB_SPEC"], "postprocess": d => d[1]},
    {"name": "P_ALTER_DB$ebnf$2", "symbols": ["P_ALTER_DB$ebnf$2$subexpression$1"]},
    {"name": "P_ALTER_DB$ebnf$2$subexpression$2", "symbols": ["__", "O_ALTER_DB_SPEC"], "postprocess": d => d[1]},
    {"name": "P_ALTER_DB$ebnf$2", "symbols": ["P_ALTER_DB$ebnf$2", "P_ALTER_DB$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_ALTER_DB", "symbols": [(lexer.has("K_ALTER") ? {type: "K_ALTER"} : K_ALTER), "__", "P_ALTER_DB$subexpression$1", "P_ALTER_DB$ebnf$1", "P_ALTER_DB$ebnf$2", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_ALTER_DB',
            def: {
              database: d[3],
              meta: d[4]
            }
          }
        }},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$ebnf$1", "symbols": ["O_ALTER_DB_SPEC$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET)]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHARSET") ? {type: "K_CHARSET"} : K_CHARSET)]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$subexpression$2", "symbols": ["__"]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$subexpression$2", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1", "symbols": ["O_ALTER_DB_SPEC$subexpression$1$ebnf$1", "O_ALTER_DB_SPEC$subexpression$1$subexpression$1", "O_ALTER_DB_SPEC$subexpression$1$subexpression$2", "O_CHARSET"], "postprocess":  d => {
          return {
            charset: d[3]
          }
        }},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$ebnf$2$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$ebnf$2", "symbols": ["O_ALTER_DB_SPEC$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$subexpression$3", "symbols": ["__"]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1$subexpression$3", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_ALTER_DB_SPEC$subexpression$1", "symbols": ["O_ALTER_DB_SPEC$subexpression$1$ebnf$2", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "O_ALTER_DB_SPEC$subexpression$1$subexpression$3", "O_COLLATION"], "postprocess":  d => {
          return {
            collation: d[3]
          }
        }},
    {"name": "O_ALTER_DB_SPEC", "symbols": ["O_ALTER_DB_SPEC$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_ALTER_DB_SPEC',
            def: d[0]
          }
        }},
    {"name": "P_ALTER_TABLE$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_ONLINE") ? {type: "K_ONLINE"} : K_ONLINE), "__"]},
    {"name": "P_ALTER_TABLE$ebnf$1", "symbols": ["P_ALTER_TABLE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_ALTER_TABLE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_ALTER_TABLE$ebnf$2$subexpression$1", "symbols": [(lexer.has("K_IGNORE") ? {type: "K_IGNORE"} : K_IGNORE), "__"]},
    {"name": "P_ALTER_TABLE$ebnf$2", "symbols": ["P_ALTER_TABLE$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_ALTER_TABLE$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_ALTER_TABLE$ebnf$3$subexpression$1", "symbols": [(lexer.has("K_WAIT") ? {type: "K_WAIT"} : K_WAIT), "__", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "__"]},
    {"name": "P_ALTER_TABLE$ebnf$3$subexpression$1", "symbols": [(lexer.has("K_NOWAIT") ? {type: "K_NOWAIT"} : K_NOWAIT), "__"]},
    {"name": "P_ALTER_TABLE$ebnf$3", "symbols": ["P_ALTER_TABLE$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "P_ALTER_TABLE$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_ALTER_TABLE$ebnf$4", "symbols": []},
    {"name": "P_ALTER_TABLE$ebnf$4$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_ALTER_TABLE_SPECS"], "postprocess": d => d[3]},
    {"name": "P_ALTER_TABLE$ebnf$4", "symbols": ["P_ALTER_TABLE$ebnf$4", "P_ALTER_TABLE$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_ALTER_TABLE", "symbols": [(lexer.has("K_ALTER") ? {type: "K_ALTER"} : K_ALTER), "__", "P_ALTER_TABLE$ebnf$1", "P_ALTER_TABLE$ebnf$2", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "__", "S_IDENTIFIER", "__", "P_ALTER_TABLE$ebnf$3", "P_ALTER_TABLE_SPECS", "P_ALTER_TABLE$ebnf$4", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_ALTER_TABLE',
            def: {
              table: d[6],
              specs: [d[9]].concat(d[10])
            }
          }
        }},
    {"name": "P_ALTER_TABLE_SPECS$subexpression$1", "symbols": ["P_CREATE_TABLE_OPTIONS"], "postprocess":  d => {
          return { tableOptions: d[0] }
        }},
    {"name": "P_ALTER_TABLE_SPECS$subexpression$1", "symbols": ["O_ALTER_TABLE_SPEC"], "postprocess":  d => {
          return { spec: d[0] }
        }},
    {"name": "P_ALTER_TABLE_SPECS", "symbols": ["P_ALTER_TABLE_SPECS$subexpression$1"], "postprocess":  d => {
          return {
            id: 'P_ALTER_TABLE_SPECS',
            def: d[0]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$1", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$2", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$2$subexpression$1", "symbols": ["__", "O_COLUMN_DEFINITION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$2", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$2", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_FIRST") ? {type: "K_FIRST"} : K_FIRST)], "postprocess": d => { return { after: null }}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_AFTER") ? {type: "K_AFTER"} : K_AFTER), "__", "S_IDENTIFIER"], "postprocess": d => { return { after: d[3] }}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$3", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$1", "__", "S_IDENTIFIER", "__", "O_DATATYPE", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$2", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$3"], "postprocess":  d => {
          return {
            action: 'addColumn',
            name: d[3],
            datatype: d[5],
            columnDefinition: d[6] || [],
            position: d[7]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$4$subexpression$1", "symbols": ["__", (lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$4", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "O_COLUMN_DEFINITION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$1", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$1", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "O_COLUMN_DEFINITION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "S_IDENTIFIER", "__", "O_DATATYPE", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1"], "postprocess":  d => {
          return {
            name: d[3],
            datatype: d[5],
            columnDefinition: d[6] || []
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1", "symbols": ["S_IDENTIFIER", "__", "O_DATATYPE", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$1", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1$ebnf$2"], "postprocess":  d => {
          return [
            {
              name: d[0],
              datatype: d[2],
              columnDefinition: d[3] || []
            }
          ].concat(d[4])
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$4", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$1", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            action: 'addColumns',
            columns: d[5]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$5$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$5", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$6$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$6", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$6$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$7", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$7$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$7", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$7", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$7$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$8", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$8$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$8", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$8", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$8$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$2", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$5", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$6", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$7", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$8"], "postprocess":  d => {
          return {
            action: 'addIndex',
            name: d[3],
            index: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1$ebnf$1", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1$ebnf$1", "__"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$10$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$10", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$10$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$10", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$11", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$11$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$11", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$11", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$11$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$12", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$12$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$12", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$12", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$12$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$9", (lexer.has("K_PRIMARY") ? {type: "K_PRIMARY"} : K_PRIMARY), "__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$10", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$11", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$12"], "postprocess":  d => {
          return {
            action: 'addPrimaryKey',
            name: d[2],
            index: d[6],
            columns: [d[10]].concat(d[11] || []),
            options: d[14]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1$ebnf$1", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1$ebnf$1", "__"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$14$subexpression$1", "symbols": ["__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$14$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$14", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$14$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$14", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$15$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$15", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$15$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$15", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$16$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$16", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$16$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$16", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$17", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$17$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$17", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$17", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$17$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$18", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$18$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$18", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$18", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$18$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$13", (lexer.has("K_UNIQUE") ? {type: "K_UNIQUE"} : K_UNIQUE), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$14", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$15", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$16", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$17", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$18"], "postprocess":  d => {
        
          /**
           * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
           */
        
          if (d[5] && ['index', 'key'].includes(d[5].toLowerCase())) {
            d[5] = null;
          }
        
          return {
            action: 'addUniqueKey',
              name: d[2],
              index: d[6],
              columns: [d[10]].concat(d[11] || []),
              options: d[14]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$19$subexpression$1", "symbols": ["__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$19$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$19", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$19$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$19", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$20$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$20", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$20$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$20", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$21", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$21$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$21", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$21", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$21$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$22", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$22$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$22", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$22", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$22$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", (lexer.has("K_FULLTEXT") ? {type: "K_FULLTEXT"} : K_FULLTEXT), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$19", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$20", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$21", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$22"], "postprocess":  d => {
        
          /**
           * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
           */
        
          if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
            d[4] = null;
          }
        
          return {
            action: 'addFulltextIndex',
            name: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$23$subexpression$1", "symbols": ["__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$23$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$23", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$23$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$23", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$24$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$24", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$24$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$24", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$25", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$25$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$25", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$25", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$25$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$26", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$26$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$26", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$26", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$26$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", (lexer.has("K_SPATIAL") ? {type: "K_SPATIAL"} : K_SPATIAL), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$23", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$24", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$25", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$26"], "postprocess":  d => {
        
          /**
           * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
           */
        
          if (d[4] && ['index', 'key'].includes(d[4].toLowerCase())) {
            d[4] = null;
          }
        
          return {
            action: 'addSpatialIndex',
            name: d[4],
            columns: [d[8]].concat(d[9] || []),
            options: d[12]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1$ebnf$1", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1$ebnf$1", "__"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$28$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$28", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$28$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$28", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$29", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$29$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$29", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$29", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$29$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$27", (lexer.has("K_FOREIGN") ? {type: "K_FOREIGN"} : K_FOREIGN), "__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY), "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$28", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$29", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "_", "P_COLUMN_REFERENCE"], "postprocess":  d => {
          return {
            action: 'addForeignKey',
            name: d[2],
            columns: [d[10]].concat(d[11] || []),
            reference: d[15]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$3", "symbols": ["__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$3", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$4", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$4", "symbols": [(lexer.has("K_INPLACE") ? {type: "K_INPLACE"} : K_INPLACE)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$4", "symbols": [(lexer.has("K_COPY") ? {type: "K_COPY"} : K_COPY)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ALGORITHM") ? {type: "K_ALGORITHM"} : K_ALGORITHM), "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$3", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$4"], "postprocess":  d => {
          return {
            action: 'changeAlgorithm',
            algorithm: d[2].value
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$30$subexpression$1", "symbols": [(lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$30", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$30$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$30", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ALTER") ? {type: "K_ALTER"} : K_ALTER), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$30", "S_IDENTIFIER", "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "__", (lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__", "O_DEFAULT_VALUE"], "postprocess":  d => {
          return {
            action: 'setDefaultColumnValue',
            column: d[3],
            value: d[9]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$31$subexpression$1", "symbols": [(lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$31", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$31$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$31", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ALTER") ? {type: "K_ALTER"} : K_ALTER), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$31", "S_IDENTIFIER", "__", (lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", (lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess":  d => {
          return {
            action: 'dropDefaultColumnValue',
            column: d[3]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$32$subexpression$1", "symbols": [(lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$32", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$32$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$32", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$33", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$33$subexpression$1", "symbols": ["__", "O_COLUMN_DEFINITION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$33", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$33", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$33$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$34$subexpression$1", "symbols": ["__", (lexer.has("K_FIRST") ? {type: "K_FIRST"} : K_FIRST)], "postprocess": d => { return { after: null }}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$34$subexpression$1", "symbols": ["__", (lexer.has("K_AFTER") ? {type: "K_AFTER"} : K_AFTER), "__", "S_IDENTIFIER"], "postprocess": d => { return { after: d[3] }}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$34", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$34$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$34", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_CHANGE") ? {type: "K_CHANGE"} : K_CHANGE), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$32", "S_IDENTIFIER", "__", "S_IDENTIFIER", "__", "O_DATATYPE", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$33", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$34"], "postprocess":  d => {
          return {
            action: 'changeColumn',
            column: d[3],
            newName: d[5],
            datatype: d[7],
            columnDefinition: d[8],
            position: d[9]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$35$subexpression$1", "symbols": [(lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$35", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$35$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$35", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$36", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$36$subexpression$1", "symbols": ["__", "O_COLUMN_DEFINITION"], "postprocess": d => d[1]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$36", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$36", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$36$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$37$subexpression$1", "symbols": ["__", (lexer.has("K_FIRST") ? {type: "K_FIRST"} : K_FIRST)], "postprocess": d => { return { after: null }}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$37$subexpression$1", "symbols": ["__", (lexer.has("K_AFTER") ? {type: "K_AFTER"} : K_AFTER), "__", "S_IDENTIFIER"], "postprocess": d => { return { after: d[3] }}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$37", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$37$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$37", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_MODIFY") ? {type: "K_MODIFY"} : K_MODIFY), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$35", "S_IDENTIFIER", "__", "O_DATATYPE", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$36", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$37"], "postprocess":  d => {
          return {
            action: 'changeColumn',
            column: d[3],
            newName: null,
            datatype: d[5],
            columnDefinition: d[6],
            position: d[7]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$5", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$5", "symbols": [(lexer.has("K_CHARSET") ? {type: "K_CHARSET"} : K_CHARSET)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$38$subexpression$1", "symbols": ["__", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "__", "O_COLLATION"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$38", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$38$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$38", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_CONVERT") ? {type: "K_CONVERT"} : K_CONVERT), "__", (lexer.has("K_TO") ? {type: "K_TO"} : K_TO), "__", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$5", "__", "O_CHARSET", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$38"], "postprocess":  d => {
          return {
            action: 'convertToCharacterSet',
            charset: d[6],
            collate: d[7]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ENABLE") ? {type: "K_ENABLE"} : K_ENABLE), "__", (lexer.has("K_KEYS") ? {type: "K_KEYS"} : K_KEYS)], "postprocess":  d => {
          return {
            action: 'enableKeys'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_DISABLE") ? {type: "K_DISABLE"} : K_DISABLE), "__", (lexer.has("K_KEYS") ? {type: "K_KEYS"} : K_KEYS)], "postprocess":  d => {
          return {
            action: 'disableKeys'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_DISCARD") ? {type: "K_DISCARD"} : K_DISCARD), "__", (lexer.has("K_TABLESPACE") ? {type: "K_TABLESPACE"} : K_TABLESPACE)], "postprocess":  d => {
          return {
            action: 'discardTablespace'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_IMPORT") ? {type: "K_IMPORT"} : K_IMPORT), "__", (lexer.has("K_TABLESPACE") ? {type: "K_TABLESPACE"} : K_TABLESPACE)], "postprocess":  d => {
          return {
            action: 'importTablespace'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$39$subexpression$1", "symbols": [(lexer.has("K_COLUMN") ? {type: "K_COLUMN"} : K_COLUMN), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$39", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$39$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$39", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$40$subexpression$1", "symbols": [(lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$40", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$40$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$40", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$39", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$40", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            action: 'dropColumn',
            column: d[4]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$6", "symbols": [(lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$6", "symbols": [(lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$6", "__", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            action: 'dropIndex',
            index: d[4]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", (lexer.has("K_PRIMARY") ? {type: "K_PRIMARY"} : K_PRIMARY), "__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)], "postprocess":  d => {
          return {
            action: 'dropPrimaryKey'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", (lexer.has("K_FOREIGN") ? {type: "K_FOREIGN"} : K_FOREIGN), "__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY), "__", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            action: 'dropForeignKey',
            key: d[6]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_FORCE") ? {type: "K_FORCE"} : K_FORCE)], "postprocess":  d => {
          return {
            action: 'force'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$7", "symbols": ["__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$7", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$8", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$8", "symbols": [(lexer.has("K_NONE") ? {type: "K_NONE"} : K_NONE)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$8", "symbols": [(lexer.has("K_SHARED") ? {type: "K_SHARED"} : K_SHARED)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$8", "symbols": [(lexer.has("K_EXCLUSIVE") ? {type: "K_EXCLUSIVE"} : K_EXCLUSIVE)], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_LOCK") ? {type: "K_LOCK"} : K_LOCK), "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$7", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$8"], "postprocess":  d => {
          return {
            action: 'changeLock',
            lock: d[2].value
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$41", "symbols": []},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$41$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "S_IDENTIFIER"], "postprocess": d => d[3]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$41", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$41", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$41$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ORDER") ? {type: "K_ORDER"} : K_ORDER), "__", (lexer.has("K_BY") ? {type: "K_BY"} : K_BY), "__", "S_IDENTIFIER", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$41"], "postprocess":  d => {
          return {
            action: 'orderBy',
            columns: [d[4]].concat(d[5] || [])
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$9", "symbols": [(lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$9", "symbols": [(lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_RENAME") ? {type: "K_RENAME"} : K_RENAME), "__", "O_ALTER_TABLE_SPEC$subexpression$1$subexpression$9", "__", "S_IDENTIFIER", "__", (lexer.has("K_TO") ? {type: "K_TO"} : K_TO), "__", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            action: 'renameIndex',
            index: d[4],
            newName: d[8]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$42$subexpression$1", "symbols": [(lexer.has("K_TO") ? {type: "K_TO"} : K_TO), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$42$subexpression$1", "symbols": [(lexer.has("K_AS") ? {type: "K_AS"} : K_AS), "__"]},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$42", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1$ebnf$42$subexpression$1"], "postprocess": id},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$42", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_RENAME") ? {type: "K_RENAME"} : K_RENAME), "__", "O_ALTER_TABLE_SPEC$subexpression$1$ebnf$42", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            action: 'rename',
            newName: d[3]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_WITH") ? {type: "K_WITH"} : K_WITH), "__", (lexer.has("K_VALIDATION") ? {type: "K_VALIDATION"} : K_VALIDATION)], "postprocess":  d => {
          return {
            action: 'withValidation'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_WITHOUT") ? {type: "K_WITHOUT"} : K_WITHOUT), "__", (lexer.has("K_VALIDATION") ? {type: "K_VALIDATION"} : K_VALIDATION)], "postprocess":  d => {
          return {
            action: 'withoutValidation'
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC$subexpression$1", "symbols": [(lexer.has("K_ADD") ? {type: "K_ADD"} : K_ADD), "__", (lexer.has("K_PERIOD") ? {type: "K_PERIOD"} : K_PERIOD), "__", (lexer.has("K_FOR") ? {type: "K_FOR"} : K_FOR), "__", (lexer.has("K_SYSTEM_TIME") ? {type: "K_SYSTEM_TIME"} : K_SYSTEM_TIME), "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "S_IDENTIFIER", "_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "S_IDENTIFIER", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            action: 'addPeriodForSystemTime',
            startColumnName: d[10],
            endColumnName: d[14]
          }
        }},
    {"name": "O_ALTER_TABLE_SPEC", "symbols": ["O_ALTER_TABLE_SPEC$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_ALTER_TABLE_SPEC',
            def: d[0]
          }
        }},
    {"name": "P_CREATE_DB$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_OR") ? {type: "K_OR"} : K_OR), "__", (lexer.has("K_REPLACE") ? {type: "K_REPLACE"} : K_REPLACE), "__"]},
    {"name": "P_CREATE_DB$ebnf$1", "symbols": ["P_CREATE_DB$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$subexpression$1", "symbols": [(lexer.has("K_DATABASE") ? {type: "K_DATABASE"} : K_DATABASE)]},
    {"name": "P_CREATE_DB$subexpression$1", "symbols": [(lexer.has("K_SCHEMA") ? {type: "K_SCHEMA"} : K_SCHEMA)]},
    {"name": "P_CREATE_DB$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT)]},
    {"name": "P_CREATE_DB$ebnf$2$subexpression$1$ebnf$1", "symbols": ["P_CREATE_DB$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "P_CREATE_DB$ebnf$2$subexpression$1$ebnf$1", "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_CREATE_DB$ebnf$2", "symbols": ["P_CREATE_DB$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_DB$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_DB$ebnf$3", "symbols": []},
    {"name": "P_CREATE_DB$ebnf$3$subexpression$1", "symbols": ["__", "O_CREATE_DB_SPEC"], "postprocess": d => d[1]},
    {"name": "P_CREATE_DB$ebnf$3", "symbols": ["P_CREATE_DB$ebnf$3", "P_CREATE_DB$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_DB", "symbols": [(lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "__", "P_CREATE_DB$ebnf$1", "P_CREATE_DB$subexpression$1", "P_CREATE_DB$ebnf$2", "__", "S_IDENTIFIER", "P_CREATE_DB$ebnf$3", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_CREATE_DB',
            def: {
              database: d[6],
              meta: d[7]
            }
          }
        }},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$ebnf$1", "symbols": ["O_CREATE_DB_SPEC$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET)]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHARSET") ? {type: "K_CHARSET"} : K_CHARSET)]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$subexpression$2", "symbols": ["__"]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$subexpression$2", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1", "symbols": ["O_CREATE_DB_SPEC$subexpression$1$ebnf$1", "O_CREATE_DB_SPEC$subexpression$1$subexpression$1", "O_CREATE_DB_SPEC$subexpression$1$subexpression$2", "O_CHARSET"], "postprocess":  d => {
          return {
            charset: d[3]
          }
        }},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$ebnf$2$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$ebnf$2", "symbols": ["O_CREATE_DB_SPEC$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$subexpression$3", "symbols": ["__"]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1$subexpression$3", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_DB_SPEC$subexpression$1", "symbols": ["O_CREATE_DB_SPEC$subexpression$1$ebnf$2", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "O_CREATE_DB_SPEC$subexpression$1$subexpression$3", "O_COLLATION"], "postprocess":  d => {
          return {
            collation: d[3]
          }
        }},
    {"name": "O_CREATE_DB_SPEC", "symbols": ["O_CREATE_DB_SPEC$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_CREATE_DB_SPEC',
            def: d[0]
          }
        }},
    {"name": "P_CREATE_INDEX$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_OR") ? {type: "K_OR"} : K_OR), "__", (lexer.has("K_REPLACE") ? {type: "K_REPLACE"} : K_REPLACE)]},
    {"name": "P_CREATE_INDEX$ebnf$1", "symbols": ["P_CREATE_INDEX$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_ONLINE") ? {type: "K_ONLINE"} : K_ONLINE)]},
    {"name": "P_CREATE_INDEX$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_OFFLINE") ? {type: "K_OFFLINE"} : K_OFFLINE)]},
    {"name": "P_CREATE_INDEX$ebnf$2", "symbols": ["P_CREATE_INDEX$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_UNIQUE") ? {type: "K_UNIQUE"} : K_UNIQUE)], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_FULLTEXT") ? {type: "K_FULLTEXT"} : K_FULLTEXT)], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_SPATIAL") ? {type: "K_SPATIAL"} : K_SPATIAL)], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$3", "symbols": ["P_CREATE_INDEX$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$4$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", (lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT), "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_CREATE_INDEX$ebnf$4", "symbols": ["P_CREATE_INDEX$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$5$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$5", "symbols": ["P_CREATE_INDEX$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$6$subexpression$1$ebnf$1", "symbols": []},
    {"name": "P_CREATE_INDEX$ebnf$6$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "P_CREATE_INDEX$ebnf$6$subexpression$1$ebnf$1", "symbols": ["P_CREATE_INDEX$ebnf$6$subexpression$1$ebnf$1", "P_CREATE_INDEX$ebnf$6$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_INDEX$ebnf$6$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "P_CREATE_INDEX$ebnf$6$subexpression$1$ebnf$1", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => [d[3]].concat(d[4] || [])},
    {"name": "P_CREATE_INDEX$ebnf$6", "symbols": ["P_CREATE_INDEX$ebnf$6$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$7$subexpression$1", "symbols": ["_", (lexer.has("K_WAIT") ? {type: "K_WAIT"} : K_WAIT), "__", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)]},
    {"name": "P_CREATE_INDEX$ebnf$7$subexpression$1", "symbols": ["_", (lexer.has("K_NOWAIT") ? {type: "K_NOWAIT"} : K_NOWAIT)]},
    {"name": "P_CREATE_INDEX$ebnf$7", "symbols": ["P_CREATE_INDEX$ebnf$7$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_INDEX$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_INDEX$ebnf$8", "symbols": []},
    {"name": "P_CREATE_INDEX$ebnf$8$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$8", "symbols": ["P_CREATE_INDEX$ebnf$8", "P_CREATE_INDEX$ebnf$8$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_INDEX$ebnf$9", "symbols": []},
    {"name": "P_CREATE_INDEX$ebnf$9$subexpression$1", "symbols": ["_", "P_INDEX_ALGORITHM_OPTION"], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$9$subexpression$1", "symbols": ["_", "P_LOCK_OPTION"], "postprocess": d => d[1]},
    {"name": "P_CREATE_INDEX$ebnf$9", "symbols": ["P_CREATE_INDEX$ebnf$9", "P_CREATE_INDEX$ebnf$9$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_INDEX", "symbols": [(lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "P_CREATE_INDEX$ebnf$1", "P_CREATE_INDEX$ebnf$2", "P_CREATE_INDEX$ebnf$3", "__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX), "P_CREATE_INDEX$ebnf$4", "__", "S_IDENTIFIER", "P_CREATE_INDEX$ebnf$5", "__", (lexer.has("K_ON") ? {type: "K_ON"} : K_ON), "__", "S_IDENTIFIER", "P_CREATE_INDEX$ebnf$6", "P_CREATE_INDEX$ebnf$7", "P_CREATE_INDEX$ebnf$8", "P_CREATE_INDEX$ebnf$9", "S_EOS"], "postprocess":  d => {
          let type = d[3] ? (d[3].value + ' ') : '';
          type = type + d[5].value;
        
          return {
            id: 'P_CREATE_INDEX',
            def: {
              name: d[8],
              type,
              index: d[9],
              table: d[13],
              columns: d[14],
              options: (d[16] || []).concat(d[17] || [])
            }
          }
        }},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3]},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$1", "symbols": ["P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("K_ASC") ? {type: "K_ASC"} : K_ASC)], "postprocess": d => d[1]},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("K_DESC") ? {type: "K_DESC"} : K_DESC)], "postprocess": d => d[1]},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$2", "symbols": ["P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_INDEX_COLUMN$ebnf$1$subexpression$1", "symbols": ["P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$1", "P_INDEX_COLUMN$ebnf$1$subexpression$1$ebnf$2"], "postprocess":  d => {
          return {
            length: d[0] ? d[0].value : null,
            sort: d[1] ? d[1].value : null
          }
        }},
    {"name": "P_INDEX_COLUMN$ebnf$1", "symbols": ["P_INDEX_COLUMN$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_INDEX_COLUMN$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_INDEX_COLUMN", "symbols": ["S_IDENTIFIER", "P_INDEX_COLUMN$ebnf$1"], "postprocess":  d => {
          return {
            id: 'P_INDEX_COLUMN',
            def: {
              column: d[0],
              length: d[1] && d[1].length ? d[1].length : null,
              sort: d[1] && d[1].sort ? d[1].sort : null
            }
          }
        }},
    {"name": "P_INDEX_TYPE$subexpression$1", "symbols": [(lexer.has("K_BTREE") ? {type: "K_BTREE"} : K_BTREE)], "postprocess": id},
    {"name": "P_INDEX_TYPE$subexpression$1", "symbols": [(lexer.has("K_HASH") ? {type: "K_HASH"} : K_HASH)], "postprocess": id},
    {"name": "P_INDEX_TYPE$subexpression$1", "symbols": [(lexer.has("K_RTREE") ? {type: "K_RTREE"} : K_RTREE)], "postprocess": id},
    {"name": "P_INDEX_TYPE", "symbols": [(lexer.has("K_USING") ? {type: "K_USING"} : K_USING), "__", "P_INDEX_TYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'P_INDEX_TYPE',
            def: d[2].value
          }
        }},
    {"name": "O_INDEX_OPTION$subexpression$1$subexpression$1", "symbols": ["__"]},
    {"name": "O_INDEX_OPTION$subexpression$1$subexpression$1", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_INDEX_OPTION$subexpression$1", "symbols": [(lexer.has("K_KEY_BLOCK_SIZE") ? {type: "K_KEY_BLOCK_SIZE"} : K_KEY_BLOCK_SIZE), "O_INDEX_OPTION$subexpression$1$subexpression$1", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return {
            keyBlockSize: d[2].value
          }
        }},
    {"name": "O_INDEX_OPTION$subexpression$1", "symbols": ["P_INDEX_TYPE"], "postprocess":  d => {
          return {
            indexType: d[0]
          }
        }},
    {"name": "O_INDEX_OPTION$subexpression$1", "symbols": [(lexer.has("K_WITH") ? {type: "K_WITH"} : K_WITH), "__", (lexer.has("K_PARSER") ? {type: "K_PARSER"} : K_PARSER), "__", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            parser: d[4]
          }
        }},
    {"name": "O_INDEX_OPTION$subexpression$1", "symbols": [(lexer.has("K_COMMENT") ? {type: "K_COMMENT"} : K_COMMENT), "__", "O_QUOTED_STRING"], "postprocess":  d => {
          return {
            comment: d[2]
          }
        }},
    {"name": "O_INDEX_OPTION", "symbols": ["O_INDEX_OPTION$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_INDEX_OPTION',
            def: d[0]
          }
        }},
    {"name": "P_INDEX_ALGORITHM_OPTION$subexpression$1", "symbols": ["__"]},
    {"name": "P_INDEX_ALGORITHM_OPTION$subexpression$1", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_INDEX_ALGORITHM_OPTION$subexpression$2", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "P_INDEX_ALGORITHM_OPTION$subexpression$2", "symbols": [(lexer.has("K_INPLACE") ? {type: "K_INPLACE"} : K_INPLACE)], "postprocess": id},
    {"name": "P_INDEX_ALGORITHM_OPTION$subexpression$2", "symbols": [(lexer.has("K_COPY") ? {type: "K_COPY"} : K_COPY)], "postprocess": id},
    {"name": "P_INDEX_ALGORITHM_OPTION", "symbols": [(lexer.has("K_ALGORITHM") ? {type: "K_ALGORITHM"} : K_ALGORITHM), "P_INDEX_ALGORITHM_OPTION$subexpression$1", "P_INDEX_ALGORITHM_OPTION$subexpression$2"], "postprocess":  d => {
          return {
            id: 'P_INDEX_ALGORITHM_OPTION',
            def: {
              algorithm: d[2].value
            }
          }
        }},
    {"name": "P_LOCK_OPTION$subexpression$1", "symbols": ["__"]},
    {"name": "P_LOCK_OPTION$subexpression$1", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_LOCK_OPTION$subexpression$2", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "P_LOCK_OPTION$subexpression$2", "symbols": [(lexer.has("K_NONE") ? {type: "K_NONE"} : K_NONE)], "postprocess": id},
    {"name": "P_LOCK_OPTION$subexpression$2", "symbols": [(lexer.has("K_SHARED") ? {type: "K_SHARED"} : K_SHARED)], "postprocess": id},
    {"name": "P_LOCK_OPTION$subexpression$2", "symbols": [(lexer.has("K_EXCLUSIVE") ? {type: "K_EXCLUSIVE"} : K_EXCLUSIVE)], "postprocess": id},
    {"name": "P_LOCK_OPTION", "symbols": [(lexer.has("K_LOCK") ? {type: "K_LOCK"} : K_LOCK), "P_LOCK_OPTION$subexpression$1", "P_LOCK_OPTION$subexpression$2"], "postprocess":  d => {
          return {
            id: 'P_LOCK_OPTION',
            def: {
              lock: d[2].value
            }
          }
        }},
    {"name": "P_CREATE_TABLE$subexpression$1", "symbols": ["P_CREATE_TABLE_COMMON"], "postprocess": id},
    {"name": "P_CREATE_TABLE", "symbols": ["P_CREATE_TABLE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'P_CREATE_TABLE',
            def: d[0]
          }
        }},
    {"name": "P_CREATE_TABLE_COMMON$ebnf$1$subexpression$1", "symbols": ["S_IDENTIFIER", (lexer.has("S_DOT") ? {type: "S_DOT"} : S_DOT)]},
    {"name": "P_CREATE_TABLE_COMMON$ebnf$1", "symbols": ["P_CREATE_TABLE_COMMON$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE_COMMON$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_COMMON$ebnf$2$subexpression$1", "symbols": ["_", "P_CREATE_TABLE_OPTIONS"], "postprocess": d => d[1]},
    {"name": "P_CREATE_TABLE_COMMON$ebnf$2", "symbols": ["P_CREATE_TABLE_COMMON$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE_COMMON$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_COMMON", "symbols": [(lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "__", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "__", "P_CREATE_TABLE_COMMON$ebnf$1", "S_IDENTIFIER", "_", "P_CREATE_TABLE_CREATE_DEFINITIONS", "P_CREATE_TABLE_COMMON$ebnf$2", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_CREATE_TABLE_COMMON',
            def: {
              table: d[7],
              columnsDef: d[9],
              tableOptions: d[10]
            }
          }
        }},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_OR") ? {type: "K_OR"} : K_OR), "__", (lexer.has("K_REPLACE") ? {type: "K_REPLACE"} : K_REPLACE)]},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$1", "symbols": ["P_CREATE_TABLE_LIKE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_TEMPORARY") ? {type: "K_TEMPORARY"} : K_TEMPORARY)]},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$2", "symbols": ["P_CREATE_TABLE_LIKE$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", (lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT), "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$3", "symbols": ["P_CREATE_TABLE_LIKE$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "P_CREATE_TABLE_LIKE$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_CREATE_TABLE_LIKE$subexpression$1", "symbols": ["__", (lexer.has("K_LIKE") ? {type: "K_LIKE"} : K_LIKE), "__", "S_IDENTIFIER"], "postprocess": d => d[3]},
    {"name": "P_CREATE_TABLE_LIKE$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("K_LIKE") ? {type: "K_LIKE"} : K_LIKE), "__", "S_IDENTIFIER", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[5]},
    {"name": "P_CREATE_TABLE_LIKE", "symbols": [(lexer.has("K_CREATE") ? {type: "K_CREATE"} : K_CREATE), "P_CREATE_TABLE_LIKE$ebnf$1", "P_CREATE_TABLE_LIKE$ebnf$2", "__", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "P_CREATE_TABLE_LIKE$ebnf$3", "__", "S_IDENTIFIER", "P_CREATE_TABLE_LIKE$subexpression$1", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_CREATE_TABLE_LIKE',
            def: {
              table: d[7],
              like: d[8]
            }
          }
        }},
    {"name": "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1$ebnf$1", "symbols": []},
    {"name": "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "O_CREATE_TABLE_CREATE_DEFINITION"], "postprocess": d => d[3]},
    {"name": "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1$ebnf$1", "symbols": ["P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1$ebnf$1", "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION", "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1$ebnf$1"], "postprocess": d => [d[0]].concat(d[1] || [])},
    {"name": "P_CREATE_TABLE_CREATE_DEFINITIONS", "symbols": [(lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_CREATE_TABLE_CREATE_DEFINITIONS$subexpression$1", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            id: 'P_CREATE_TABLE_CREATE_DEFINITIONS',
            def: d[2]
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "O_COLUMN_DEFINITION"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1$ebnf$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1$ebnf$1", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1", "symbols": ["O_DATATYPE", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1$ebnf$1"], "postprocess":  d => {
          return {
            datatype: d[0],
            columnDefinition: d[1] || []
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": ["S_IDENTIFIER", "_", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$1"], "postprocess":  d => {
          return {
            column: {
              name: d[0],
              def: d[2]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "__"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$2$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$2", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$3", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$3$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$3", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$3", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$4", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$4$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$4", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$4", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$1", (lexer.has("K_PRIMARY") ? {type: "K_PRIMARY"} : K_PRIMARY), "__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$2", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$3", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$4"], "postprocess":  d => {
          return {
            primaryKey: {
              name: d[0],
              index: d[4],
              columns: [d[8]].concat(d[9] || []),
              options: d[12]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$5$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$5", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$6$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$6", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$6$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$7", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$7$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$7", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$7", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$7$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$8", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$8$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$8", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$8", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$8$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$subexpression$2", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$5", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$6", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$7", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$8"], "postprocess":  d => {
          return {
            index: {
              name: d[1],
              index: d[2],
              columns: [d[6]].concat(d[7] || []),
              options: d[10]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1$ebnf$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1$ebnf$1", "__"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$10$subexpression$1", "symbols": ["__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$10$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$10", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$10$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$10", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$11$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$11", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$11$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$11", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$12$subexpression$1", "symbols": ["__", "P_INDEX_TYPE"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$12", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$12$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$12", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$13", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$13$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$13", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$13", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$13$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$14", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$14$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$14", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$14", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$14$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$9", (lexer.has("K_UNIQUE") ? {type: "K_UNIQUE"} : K_UNIQUE), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$10", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$11", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$12", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$13", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$14"], "postprocess":  d => {
        
          /**
           * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
           */
        
          if (d[3] && ['index', 'key'].includes(d[3].toLowerCase())) {
            d[3] = null;
          }
        
          return {
            uniqueKey: {
              name: d[3],
              index: d[4],
              columns: [d[8]].concat(d[9] || []),
              options: d[12]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$15$subexpression$1", "symbols": ["__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$15$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$15", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$15$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$15", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$16$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$16", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$16$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$16", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$17", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$17$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$17", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$17", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$17$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$18", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$18$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$18", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$18", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$18$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_FULLTEXT") ? {type: "K_FULLTEXT"} : K_FULLTEXT), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$15", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$16", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$17", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$18"], "postprocess":  d => {
        
          /**
           * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
           */
        
          if (d[2] && ['index', 'key'].includes(d[2].toLowerCase())) {
            d[2] = null;
          }
        
          return {
            fulltextIndex: {
              name: d[2],
              columns: [d[6]].concat(d[7] || []),
              options: d[10]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$19$subexpression$1", "symbols": ["__", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$19$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$19", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$19$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$19", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$20$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$20", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$20$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$20", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$21", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$21$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$21", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$21", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$21$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$22", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$22$subexpression$1", "symbols": ["_", "O_INDEX_OPTION"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$22", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$22", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$22$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_SPATIAL") ? {type: "K_SPATIAL"} : K_SPATIAL), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$19", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$20", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$21", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$22"], "postprocess":  d => {
        
          /**
           * Sometimes it parses the key name as 'INDEX' OR 'KEY', so we need this workaround below:
           */
        
          if (d[2] && ['index', 'key'].includes(d[2].toLowerCase())) {
            d[2] = null;
          }
        
          return {
            spatialIndex: {
              name: d[2],
              columns: [d[6]].concat(d[7] || []),
              options: d[10]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1$ebnf$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1", "symbols": [(lexer.has("K_CONSTRAINT") ? {type: "K_CONSTRAINT"} : K_CONSTRAINT), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1$ebnf$1", "__"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$24$subexpression$1", "symbols": ["__", "S_IDENTIFIER"], "postprocess": d => d[1]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$24", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$24$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$24", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$25", "symbols": []},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$25$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$25", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$25", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$25$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$23", (lexer.has("K_FOREIGN") ? {type: "K_FOREIGN"} : K_FOREIGN), "__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY), "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$24", "_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1$ebnf$25", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "_", "P_COLUMN_REFERENCE"], "postprocess":  d => {
          return {
            foreignKey: {
              name: d[0],
              columns: [d[8]].concat(d[9] || []),
              reference: d[13]
            }
          }
        }},
    {"name": "O_CREATE_TABLE_CREATE_DEFINITION", "symbols": ["O_CREATE_TABLE_CREATE_DEFINITION$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_CREATE_TABLE_CREATE_DEFINITION',
            def: d[0]
          }
        }},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_UNSIGNED") ? {type: "K_UNSIGNED"} : K_UNSIGNED)], "postprocess": d => { return { unsigned: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_ZEROFILL") ? {type: "K_ZEROFILL"} : K_ZEROFILL)], "postprocess": d => { return { zerofill: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_CHARSET") ? {type: "K_CHARSET"} : K_CHARSET), "__", "O_CHARSET"], "postprocess": d => { return { charset: d[2] }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "__", "O_CHARSET"], "postprocess": d => { return { charset: d[4] }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "__", "O_COLLATION"], "postprocess": d => { return { collation: d[2] }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_NOT") ? {type: "K_NOT"} : K_NOT), "__", (lexer.has("K_NULL") ? {type: "K_NULL"} : K_NULL)], "postprocess": d => { return { nullable: false }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_NULL") ? {type: "K_NULL"} : K_NULL)], "postprocess": d => { return { nullable: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__", "O_DEFAULT_VALUE"], "postprocess": d => { return { default: d[2] }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_AUTO_INCREMENT") ? {type: "K_AUTO_INCREMENT"} : K_AUTO_INCREMENT)], "postprocess": d => { return { autoincrement: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)]},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$ebnf$1", "symbols": ["O_COLUMN_DEFINITION$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_UNIQUE") ? {type: "K_UNIQUE"} : K_UNIQUE), "O_COLUMN_DEFINITION$subexpression$1$ebnf$1"], "postprocess": d => { return { unique: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$ebnf$2$subexpression$1", "symbols": [(lexer.has("K_PRIMARY") ? {type: "K_PRIMARY"} : K_PRIMARY), "__"]},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$ebnf$2", "symbols": ["O_COLUMN_DEFINITION$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": ["O_COLUMN_DEFINITION$subexpression$1$ebnf$2", (lexer.has("K_KEY") ? {type: "K_KEY"} : K_KEY)], "postprocess": d => { return { primary: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_COMMENT") ? {type: "K_COMMENT"} : K_COMMENT), "__", "O_QUOTED_STRING"], "postprocess": d => { return { comment: d[2] }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_INVISIBLE") ? {type: "K_INVISIBLE"} : K_INVISIBLE), "__", (lexer.has("K_WITH") ? {type: "K_WITH"} : K_WITH), "__", (lexer.has("K_SYSTEM") ? {type: "K_SYSTEM"} : K_SYSTEM), "__", (lexer.has("K_VERSIONING") ? {type: "K_VERSIONING"} : K_VERSIONING)], "postprocess": d => { return { invisibleWithSystemVersioning: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_INVISIBLE") ? {type: "K_INVISIBLE"} : K_INVISIBLE), "__", (lexer.has("K_WITHOUT") ? {type: "K_WITHOUT"} : K_WITHOUT), "__", (lexer.has("K_SYSTEM") ? {type: "K_SYSTEM"} : K_SYSTEM), "__", (lexer.has("K_VERSIONING") ? {type: "K_VERSIONING"} : K_VERSIONING)], "postprocess": d => { return { invisibleWithoutSystemVersioning: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_INVISIBLE") ? {type: "K_INVISIBLE"} : K_INVISIBLE)], "postprocess": d => { return { invisible: true }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_FIXED") ? {type: "K_FIXED"} : K_FIXED)], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DYNAMIC") ? {type: "K_DYNAMIC"} : K_DYNAMIC)], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_COLUMN_FORMAT") ? {type: "K_COLUMN_FORMAT"} : K_COLUMN_FORMAT), "__", "O_COLUMN_DEFINITION$subexpression$1$subexpression$1"], "postprocess": d => { return { format: d[2].value }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_DISK") ? {type: "K_DISK"} : K_DISK)], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_MEMORY") ? {type: "K_MEMORY"} : K_MEMORY)], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": [(lexer.has("K_STORAGE") ? {type: "K_STORAGE"} : K_STORAGE), "__", "O_COLUMN_DEFINITION$subexpression$1$subexpression$2"], "postprocess": d => { return { storage: d[2].value }}},
    {"name": "O_COLUMN_DEFINITION$subexpression$1", "symbols": ["P_COLUMN_REFERENCE"], "postprocess": d => { return { reference: d[0] }}},
    {"name": "O_COLUMN_DEFINITION", "symbols": ["O_COLUMN_DEFINITION$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_COLUMN_DEFINITION',
            def: d[0]
          }
        } },
    {"name": "P_COLUMN_REFERENCE$subexpression$1$ebnf$1", "symbols": []},
    {"name": "P_COLUMN_REFERENCE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "P_INDEX_COLUMN"], "postprocess": d => d[3]},
    {"name": "P_COLUMN_REFERENCE$subexpression$1$ebnf$1", "symbols": ["P_COLUMN_REFERENCE$subexpression$1$ebnf$1", "P_COLUMN_REFERENCE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_COLUMN_REFERENCE$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "P_INDEX_COLUMN", "P_COLUMN_REFERENCE$subexpression$1$ebnf$1", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => [d[3]].concat(d[4] || [])},
    {"name": "P_COLUMN_REFERENCE$ebnf$1$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_FULL") ? {type: "K_FULL"} : K_FULL)], "postprocess": id},
    {"name": "P_COLUMN_REFERENCE$ebnf$1$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_PARTIAL") ? {type: "K_PARTIAL"} : K_PARTIAL)], "postprocess": id},
    {"name": "P_COLUMN_REFERENCE$ebnf$1$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_SIMPLE") ? {type: "K_SIMPLE"} : K_SIMPLE)], "postprocess": id},
    {"name": "P_COLUMN_REFERENCE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("K_MATCH") ? {type: "K_MATCH"} : K_MATCH), "__", "P_COLUMN_REFERENCE$ebnf$1$subexpression$1$subexpression$1"], "postprocess": d => d[3].value},
    {"name": "P_COLUMN_REFERENCE$ebnf$1", "symbols": ["P_COLUMN_REFERENCE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_COLUMN_REFERENCE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_COLUMN_REFERENCE$ebnf$2", "symbols": []},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DELETE") ? {type: "K_DELETE"} : K_DELETE)], "postprocess": id},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_UPDATE") ? {type: "K_UPDATE"} : K_UPDATE)], "postprocess": id},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_RESTRICT") ? {type: "K_RESTRICT"} : K_RESTRICT)], "postprocess": d => d[0].value},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_CASCADE") ? {type: "K_CASCADE"} : K_CASCADE)], "postprocess": d => d[0].value},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "__", (lexer.has("K_NULL") ? {type: "K_NULL"} : K_NULL)], "postprocess": d => d[0].value + ' ' + d[2].value},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_NO") ? {type: "K_NO"} : K_NO), "__", (lexer.has("K_ACTION") ? {type: "K_ACTION"} : K_ACTION)], "postprocess": d => d[0].value + ' ' + d[2].value},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "__", (lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": d => d[0].value + ' ' + d[2].value},
    {"name": "P_COLUMN_REFERENCE$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("K_ON") ? {type: "K_ON"} : K_ON), "__", "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$1", "__", "P_COLUMN_REFERENCE$ebnf$2$subexpression$1$subexpression$2"], "postprocess": d => { return { trigger: d[3].value, action: d[5] }}},
    {"name": "P_COLUMN_REFERENCE$ebnf$2", "symbols": ["P_COLUMN_REFERENCE$ebnf$2", "P_COLUMN_REFERENCE$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_COLUMN_REFERENCE", "symbols": [(lexer.has("K_REFERENCES") ? {type: "K_REFERENCES"} : K_REFERENCES), "__", "S_IDENTIFIER", "P_COLUMN_REFERENCE$subexpression$1", "P_COLUMN_REFERENCE$ebnf$1", "P_COLUMN_REFERENCE$ebnf$2"], "postprocess":  d => {
          return {
            id: 'P_COLUMN_REFERENCE',
            def: {
              table: d[2],
              columns: d[3] || [],
              match: d[4],
              on: d[5] || []
            }
          }
        }},
    {"name": "P_CREATE_TABLE_OPTIONS$ebnf$1", "symbols": []},
    {"name": "P_CREATE_TABLE_OPTIONS$ebnf$1$subexpression$1$subexpression$1", "symbols": ["__"]},
    {"name": "P_CREATE_TABLE_OPTIONS$ebnf$1$subexpression$1$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_"]},
    {"name": "P_CREATE_TABLE_OPTIONS$ebnf$1$subexpression$1", "symbols": ["P_CREATE_TABLE_OPTIONS$ebnf$1$subexpression$1$subexpression$1", "O_CREATE_TABLE_OPTION"], "postprocess": d => d[1]},
    {"name": "P_CREATE_TABLE_OPTIONS$ebnf$1", "symbols": ["P_CREATE_TABLE_OPTIONS$ebnf$1", "P_CREATE_TABLE_OPTIONS$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_CREATE_TABLE_OPTIONS", "symbols": ["O_CREATE_TABLE_OPTION", "P_CREATE_TABLE_OPTIONS$ebnf$1"], "postprocess":  d => {
          return {
            id: 'P_CREATE_TABLE_OPTIONS',
            def: [d[0]].concat(d[1] || [])
          }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$1", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$1", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_AUTO_INCREMENT") ? {type: "K_AUTO_INCREMENT"} : K_AUTO_INCREMENT), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$1", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { autoincrement: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$2", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$2", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_AVG_ROW_LENGTH") ? {type: "K_AVG_ROW_LENGTH"} : K_AVG_ROW_LENGTH), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$2", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { avgRowLength: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$1", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$3", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_SET") ? {type: "K_SET"} : K_SET)]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$3", "symbols": [(lexer.has("K_CHARSET") ? {type: "K_CHARSET"} : K_CHARSET)]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$4", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$4", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$ebnf$1", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$3", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$4", "O_CHARSET"], "postprocess":  d => {
          return { charset: d[3] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$5", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$5", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_CHECKSUM") ? {type: "K_CHECKSUM"} : K_CHECKSUM), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$5", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { checksum: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$2$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT), "__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$2", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$6", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$6", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$ebnf$2", (lexer.has("K_COLLATE") ? {type: "K_COLLATE"} : K_COLLATE), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$6", "O_COLLATION"], "postprocess":  d => {
          return { collation: d[3] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$7", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$7", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_COMMENT") ? {type: "K_COMMENT"} : K_COMMENT), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$7", "O_QUOTED_STRING"], "postprocess":  d => {
          return { comment: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$8", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$8", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_COMPRESSION") ? {type: "K_COMPRESSION"} : K_COMPRESSION), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$8", "O_QUOTED_STRING"], "postprocess":  d => {
          return { compression: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$9", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$9", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_CONNECTION") ? {type: "K_CONNECTION"} : K_CONNECTION), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$9", "O_QUOTED_STRING"], "postprocess":  d => {
          return { connection: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$10", "symbols": [(lexer.has("K_DATA") ? {type: "K_DATA"} : K_DATA), "__"], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$10", "symbols": [(lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX), "__"], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$11", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$11", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$subexpression$10", (lexer.has("K_DIRECTORY") ? {type: "K_DIRECTORY"} : K_DIRECTORY), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$11", "O_QUOTED_STRING"], "postprocess":  d => {
          const key = d[0].value.toLowerCase() + 'Directory';
          return { [key]: d[3] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$12", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$12", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_DELAY_KEY_WRITE") ? {type: "K_DELAY_KEY_WRITE"} : K_DELAY_KEY_WRITE), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$12", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { delayKeyWrite: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$13", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$13", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_ENCRYPTION") ? {type: "K_ENCRYPTION"} : K_ENCRYPTION), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$13", "O_QUOTED_STRING"], "postprocess":  d => {
          return { encryption: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$14", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$14", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_ENCRYPTION_KEY_ID") ? {type: "K_ENCRYPTION_KEY_ID"} : K_ENCRYPTION_KEY_ID), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$14", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { encryptionKeyId: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$15", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$15", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$16", "symbols": [(lexer.has("K_YES") ? {type: "K_YES"} : K_YES)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$16", "symbols": [(lexer.has("K_NO") ? {type: "K_NO"} : K_NO)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_IETF_QUOTES") ? {type: "K_IETF_QUOTES"} : K_IETF_QUOTES), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$15", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$16"], "postprocess":  d => {
          return { ietfQuotes: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$17", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$17", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_ENGINE") ? {type: "K_ENGINE"} : K_ENGINE), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$17", "O_ENGINE"], "postprocess":  d => {
          return { engine: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$18", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$18", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$19", "symbols": [(lexer.has("K_NO") ? {type: "K_NO"} : K_NO)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$19", "symbols": [(lexer.has("K_FIRST") ? {type: "K_FIRST"} : K_FIRST)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$19", "symbols": [(lexer.has("K_LAST") ? {type: "K_LAST"} : K_LAST)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_INSERT_METHOD") ? {type: "K_INSERT_METHOD"} : K_INSERT_METHOD), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$18", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$19"], "postprocess":  d => {
          return { insertMethod: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$20", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$20", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_KEY_BLOCK_SIZE") ? {type: "K_KEY_BLOCK_SIZE"} : K_KEY_BLOCK_SIZE), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$20", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { keyBlockSize: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$21", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$21", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_MAX_ROWS") ? {type: "K_MAX_ROWS"} : K_MAX_ROWS), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$21", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { maxRows: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$22", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$22", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_MIN_ROWS") ? {type: "K_MIN_ROWS"} : K_MIN_ROWS), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$22", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { minRows: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$23", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$23", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$24", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$24", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_PACK_KEYS") ? {type: "K_PACK_KEYS"} : K_PACK_KEYS), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$23", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$24"], "postprocess":  d => {
          return { packKeys: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$25", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$25", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_PAGE_CHECKSUM") ? {type: "K_PAGE_CHECKSUM"} : K_PAGE_CHECKSUM), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$25", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { pageChecksum: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$26", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$26", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_PASSWORD") ? {type: "K_PASSWORD"} : K_PASSWORD), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$26", "O_QUOTED_STRING"], "postprocess":  d => {
          return { password: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$27", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$27", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_DYNAMIC") ? {type: "K_DYNAMIC"} : K_DYNAMIC)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_FIXED") ? {type: "K_FIXED"} : K_FIXED)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_COMPRESSED") ? {type: "K_COMPRESSED"} : K_COMPRESSED)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_REDUNDANT") ? {type: "K_REDUNDANT"} : K_REDUNDANT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_COMPACT") ? {type: "K_COMPACT"} : K_COMPACT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28", "symbols": [(lexer.has("K_PAGE") ? {type: "K_PAGE"} : K_PAGE)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_ROW_FORMAT") ? {type: "K_ROW_FORMAT"} : K_ROW_FORMAT), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$27", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$28"], "postprocess":  d => {
          return { rowFormat: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$29", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$29", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$30", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$30", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_STATS_AUTO_RECALC") ? {type: "K_STATS_AUTO_RECALC"} : K_STATS_AUTO_RECALC), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$29", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$30"], "postprocess":  d => {
          return { statsAutoRecalc: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$31", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$31", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$32", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$32", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_STATS_PERSISTENT") ? {type: "K_STATS_PERSISTENT"} : K_STATS_PERSISTENT), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$31", "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$32"], "postprocess":  d => {
          return { statsPersistent: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$33", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$33", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_STATS_SAMPLE_PAGES") ? {type: "K_STATS_SAMPLE_PAGES"} : K_STATS_SAMPLE_PAGES), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$33", "O_TABLE_OPTION_VALUE"], "postprocess":  d => {
          return { statsSamplePages: d[2] }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$34", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$34", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_TRANSACTIONAL") ? {type: "K_TRANSACTIONAL"} : K_TRANSACTIONAL), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$34", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)], "postprocess":  d => {
          return { transactional: d[2].value }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_WITH") ? {type: "K_WITH"} : K_WITH), "__", (lexer.has("K_SYSTEM") ? {type: "K_SYSTEM"} : K_SYSTEM), "__", (lexer.has("K_VERSIONING") ? {type: "K_VERSIONING"} : K_VERSIONING)], "postprocess":  d => {
          return { withSystemVersioning: true }
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DISK") ? {type: "K_DISK"} : K_DISK)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_MEMORY") ? {type: "K_MEMORY"} : K_MEMORY)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_DEFAULT") ? {type: "K_DEFAULT"} : K_DEFAULT)], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_STORAGE") ? {type: "K_STORAGE"} : K_STORAGE), "__", "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3$subexpression$1$subexpression$1"], "postprocess": d => d[3].value},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_TABLESPACE") ? {type: "K_TABLESPACE"} : K_TABLESPACE), "__", "S_IDENTIFIER", "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$3"], "postprocess":  d => {
          const obj = { tablespaceName: d[2] };
        
          if (d[3]) {
            obj.tablespaceStorage = d[3];
          }
        
          return obj;
        }},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$35", "symbols": ["__"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$35", "symbols": ["_", (lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$4", "symbols": []},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$4$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "S_IDENTIFIER"], "postprocess": d => d[3]},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$4", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1$ebnf$4", "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_CREATE_TABLE_OPTION$subexpression$1", "symbols": [(lexer.has("K_UNION") ? {type: "K_UNION"} : K_UNION), "O_CREATE_TABLE_OPTION$subexpression$1$subexpression$35", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", "S_IDENTIFIER", "O_CREATE_TABLE_OPTION$subexpression$1$ebnf$4", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return { union: [d[4]].concat(d[5] || []) }
        }},
    {"name": "O_CREATE_TABLE_OPTION", "symbols": ["O_CREATE_TABLE_OPTION$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_CREATE_TABLE_OPTION',
            def: d[0]
          }
        }},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_INTEGER_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_FIXED_POINT_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_FLOATING_POINT_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_BIT_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_BOOLEAN_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_DATETIME_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_YEAR_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_VARIABLE_STRING_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_FIXED_STRING_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_ENUM_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_SET_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_SPATIAL_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE$subexpression$1", "symbols": ["O_JSON_DATATYPE"], "postprocess": id},
    {"name": "O_DATATYPE", "symbols": ["O_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_DATATYPE',
            def: d[0]
          }
        }},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_INT") ? {type: "K_INT"} : K_INT)], "postprocess": d => { return { datatype: d[0].value, width: 4 }}},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_INTEGER") ? {type: "K_INTEGER"} : K_INTEGER)], "postprocess": d => { return { datatype: d[0].value, width: 4 }}},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TINYINT") ? {type: "K_TINYINT"} : K_TINYINT)], "postprocess": d => { return { datatype: d[0].value, width: 1 }}},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_SMALLINT") ? {type: "K_SMALLINT"} : K_SMALLINT)], "postprocess": d => { return { datatype: d[0].value, width: 2 }}},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MEDIUMINT") ? {type: "K_MEDIUMINT"} : K_MEDIUMINT)], "postprocess": d => { return { datatype: d[0].value, width: 3 }}},
    {"name": "O_INTEGER_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_BIGINT") ? {type: "K_BIGINT"} : K_BIGINT)], "postprocess": d => { return { datatype: d[0].value, width: 8 }}},
    {"name": "O_INTEGER_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3].value},
    {"name": "O_INTEGER_DATATYPE$ebnf$1", "symbols": ["O_INTEGER_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_INTEGER_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_INTEGER_DATATYPE", "symbols": ["O_INTEGER_DATATYPE$subexpression$1", "O_INTEGER_DATATYPE$ebnf$1"], "postprocess":  d => {
          return {
            id: 'O_INTEGER_DATATYPE',
            def: {
              datatype: d[0].datatype,
              width: d[1] ? d[1] : d[0].width
            }
          }
        }},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_DECIMAL") ? {type: "K_DECIMAL"} : K_DECIMAL)], "postprocess": id},
    {"name": "O_FIXED_POINT_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_NUMERIC") ? {type: "K_NUMERIC"} : K_NUMERIC)], "postprocess": id},
    {"name": "O_FIXED_POINT_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            digits: d[3].value,
            decimals: d[7].value
          }
        }},
    {"name": "O_FIXED_POINT_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            digits: d[3].value,
            decimals: 0
          }
        }},
    {"name": "O_FIXED_POINT_DATATYPE$ebnf$1", "symbols": ["O_FIXED_POINT_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_FIXED_POINT_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_FIXED_POINT_DATATYPE", "symbols": ["O_FIXED_POINT_DATATYPE$subexpression$1", "O_FIXED_POINT_DATATYPE$ebnf$1"], "postprocess":  d => {
          const obj = {
            id: 'O_FIXED_POINT_DATATYPE',
            def: {
              datatype: d[0].value
            }
          }
        
          if (d[1]) {
            obj.def.digits = d[1].digits
            obj.def.decimals = d[1].decimals
          } else {
            obj.def.digits = 10
            obj.def.decimals = 0
          }
        
          return obj
        }},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_FLOAT") ? {type: "K_FLOAT"} : K_FLOAT)], "postprocess": id},
    {"name": "O_FLOATING_POINT_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_DOUBLE") ? {type: "K_DOUBLE"} : K_DOUBLE)], "postprocess": id},
    {"name": "O_FLOATING_POINT_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess":  d => {
          return {
            digits: d[3].value,
            decimals: d[7].value
          }
        }},
    {"name": "O_FLOATING_POINT_DATATYPE$ebnf$1", "symbols": ["O_FLOATING_POINT_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_FLOATING_POINT_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_FLOATING_POINT_DATATYPE", "symbols": ["O_FLOATING_POINT_DATATYPE$subexpression$1", "O_FLOATING_POINT_DATATYPE$ebnf$1"], "postprocess":  d => {
          const obj = {
            id: 'O_FLOATING_POINT_DATATYPE',
            def: {
              datatype: d[0].value
            }
          }
        
          if (d[1]) {
            obj.def.digits = d[1].digits
            obj.def.decimals = d[1].decimals
          }
        
          return obj
        }},
    {"name": "O_BIT_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS), "_"], "postprocess": d => d[3].value},
    {"name": "O_BIT_DATATYPE$ebnf$1", "symbols": ["O_BIT_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_BIT_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_BIT_DATATYPE", "symbols": [(lexer.has("K_BIT") ? {type: "K_BIT"} : K_BIT), "O_BIT_DATATYPE$ebnf$1"], "postprocess":  d => {
          return {
            id: 'O_BIT_DATATYPE',
            def: {
              datatype: d[0].value,
              length: d[1] || 1
            }
          }
        }},
    {"name": "O_BOOLEAN_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_BOOLEAN") ? {type: "K_BOOLEAN"} : K_BOOLEAN)], "postprocess": id},
    {"name": "O_BOOLEAN_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_BOOL") ? {type: "K_BOOL"} : K_BOOL)], "postprocess": id},
    {"name": "O_BOOLEAN_DATATYPE", "symbols": ["O_BOOLEAN_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_BOOLEAN_DATATYPE',
            def: {
              datatype: d[0].value
            }
          }
        }},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_DATE") ? {type: "K_DATE"} : K_DATE)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TIME") ? {type: "K_TIME"} : K_TIME)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_DATETIME") ? {type: "K_DATETIME"} : K_DATETIME)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TIMESTAMP") ? {type: "K_TIMESTAMP"} : K_TIMESTAMP), "_", (lexer.has("K_WITH") ? {type: "K_WITH"} : K_WITH), "_", (lexer.has("K_TIME") ? {type: "K_TIME"} : K_TIME), "_", (lexer.has("K_ZONE") ? {type: "K_ZONE"} : K_ZONE)], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3].value},
    {"name": "O_DATETIME_DATATYPE$ebnf$1", "symbols": ["O_DATETIME_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_DATETIME_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_DATETIME_DATATYPE", "symbols": ["O_DATETIME_DATATYPE$subexpression$1", "O_DATETIME_DATATYPE$ebnf$1"], "postprocess":  d => {
          return {
            id: 'O_DATETIME_DATATYPE',
            def: {
              datatype: d[0].value,
              fractional: d[1] || 0
            }
          }
        }},
    {"name": "O_YEAR_DATATYPE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3].value},
    {"name": "O_YEAR_DATATYPE$ebnf$1", "symbols": ["O_YEAR_DATATYPE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_YEAR_DATATYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_YEAR_DATATYPE", "symbols": [(lexer.has("K_YEAR") ? {type: "K_YEAR"} : K_YEAR), "O_YEAR_DATATYPE$ebnf$1"], "postprocess":  d => {
          return {
            id: 'O_YEAR_DATATYPE',
            def: {
              datatype: d[0].value,
              digits: d[1] || 4
            }
          }
        }},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_NCHAR") ? {type: "K_NCHAR"} : K_NCHAR)], "postprocess": d => d[0].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_NATIONAL") ? {type: "K_NATIONAL"} : K_NATIONAL), "__", (lexer.has("K_CHAR") ? {type: "K_CHAR"} : K_CHAR)], "postprocess": d => d[0].value + ' ' + d[2].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER), "__", (lexer.has("K_VARYING") ? {type: "K_VARYING"} : K_VARYING)], "postprocess": d => d[0].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHARACTER") ? {type: "K_CHARACTER"} : K_CHARACTER)], "postprocess": d => d[0].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_CHAR") ? {type: "K_CHAR"} : K_CHAR)], "postprocess": d => d[0].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_BINARY") ? {type: "K_BINARY"} : K_BINARY)], "postprocess": d => d[0].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_VARIABLE_STRING_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1", "symbols": ["O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$1", "O_VARIABLE_STRING_DATATYPE$subexpression$1$ebnf$1"], "postprocess":  d => {
          return {
            datatype: d[0],
            length: d[1] || 1
          }
        }},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_VARCHAR") ? {type: "K_VARCHAR"} : K_VARCHAR)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_VARYING") ? {type: "K_VARYING"} : K_VARYING)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$2", "symbols": [(lexer.has("K_VARBINARY") ? {type: "K_VARBINARY"} : K_VARBINARY)], "postprocess": id},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$3", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3].value},
    {"name": "O_VARIABLE_STRING_DATATYPE$subexpression$1", "symbols": ["O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$2", "O_VARIABLE_STRING_DATATYPE$subexpression$1$subexpression$3"], "postprocess":  d => {
          return {
            datatype: d[0].value,
            length: d[1]
          }
        }},
    {"name": "O_VARIABLE_STRING_DATATYPE", "symbols": ["O_VARIABLE_STRING_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_VARIABLE_STRING_DATATYPE',
            def: d[0]
          }
        }},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_BLOB") ? {type: "K_BLOB"} : K_BLOB)], "postprocess": id},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1$subexpression$1", "symbols": [(lexer.has("K_TEXT") ? {type: "K_TEXT"} : K_TEXT)], "postprocess": id},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER), "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => d[3].value},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_FIXED_STRING_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": ["O_FIXED_STRING_DATATYPE$subexpression$1$subexpression$1", "O_FIXED_STRING_DATATYPE$subexpression$1$ebnf$1"], "postprocess":  d => {
          return {
            datatype: d[0].value,
            length: d[1] || 65535
          }
        }},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TINYBLOB") ? {type: "K_TINYBLOB"} : K_TINYBLOB)], "postprocess": d => { return { datatype: d[0].value, length: 255 }}},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MEDIUMBLOB") ? {type: "K_MEDIUMBLOB"} : K_MEDIUMBLOB)], "postprocess": d => { return { datatype: d[0].value, length: 16777215 }}},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_LONGBLOB") ? {type: "K_LONGBLOB"} : K_LONGBLOB)], "postprocess": d => { return { datatype: d[0].value, length: 4294967295 }}},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_TINYTEXT") ? {type: "K_TINYTEXT"} : K_TINYTEXT)], "postprocess": d => { return { datatype: d[0].value, length: 255 }}},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MEDIUMTEXT") ? {type: "K_MEDIUMTEXT"} : K_MEDIUMTEXT)], "postprocess": d => { return { datatype: d[0].value, length: 16777215 }}},
    {"name": "O_FIXED_STRING_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_LONGTEXT") ? {type: "K_LONGTEXT"} : K_LONGTEXT)], "postprocess": d => { return { datatype: d[0].value, length: 4294967295 }}},
    {"name": "O_FIXED_STRING_DATATYPE", "symbols": ["O_FIXED_STRING_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_FIXED_STRING_DATATYPE',
            def: d[0]
          }
        }},
    {"name": "O_ENUM_DATATYPE$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_ENUM_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING)], "postprocess": d => d[3].value},
    {"name": "O_ENUM_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_ENUM_DATATYPE$subexpression$1$ebnf$1", "O_ENUM_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_ENUM_DATATYPE$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "O_ENUM_DATATYPE$subexpression$1$ebnf$1", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => [d[3].value].concat(d[4])},
    {"name": "O_ENUM_DATATYPE", "symbols": [(lexer.has("K_ENUM") ? {type: "K_ENUM"} : K_ENUM), "O_ENUM_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_ENUM_DATATYPE',
            def: {
              datatype: d[0].value,
              values: d[1],
            }
          }
        }},
    {"name": "O_SET_DATATYPE$subexpression$1$ebnf$1", "symbols": []},
    {"name": "O_SET_DATATYPE$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING)], "postprocess": d => d[3].value},
    {"name": "O_SET_DATATYPE$subexpression$1$ebnf$1", "symbols": ["O_SET_DATATYPE$subexpression$1$ebnf$1", "O_SET_DATATYPE$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "O_SET_DATATYPE$subexpression$1", "symbols": ["_", (lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS), "_", (lexer.has("S_SQUOTE_STRING") ? {type: "S_SQUOTE_STRING"} : S_SQUOTE_STRING), "O_SET_DATATYPE$subexpression$1$ebnf$1", "_", (lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)], "postprocess": d => [d[3].value].concat(d[4])},
    {"name": "O_SET_DATATYPE", "symbols": [(lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "O_SET_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_SET_DATATYPE',
            def: {
              datatype: d[0].value,
              values: d[1],
            }
          }
        }},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_GEOMETRY") ? {type: "K_GEOMETRY"} : K_GEOMETRY)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_POINT") ? {type: "K_POINT"} : K_POINT)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_LINESTRING") ? {type: "K_LINESTRING"} : K_LINESTRING)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_POLYGON") ? {type: "K_POLYGON"} : K_POLYGON)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MULTIPOINT") ? {type: "K_MULTIPOINT"} : K_MULTIPOINT)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MULTILINESTRING") ? {type: "K_MULTILINESTRING"} : K_MULTILINESTRING)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_MULTIPOLYGON") ? {type: "K_MULTIPOLYGON"} : K_MULTIPOLYGON)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE$subexpression$1", "symbols": [(lexer.has("K_GEOMETRYCOLLECTION") ? {type: "K_GEOMETRYCOLLECTION"} : K_GEOMETRYCOLLECTION)], "postprocess": id},
    {"name": "O_SPATIAL_DATATYPE", "symbols": ["O_SPATIAL_DATATYPE$subexpression$1"], "postprocess":  d => {
          return {
            id: 'O_SPATIAL_DATATYPE',
            def: {
              datatype: d[0].value,
            }
          }
        }},
    {"name": "O_JSON_DATATYPE", "symbols": [(lexer.has("K_JSON") ? {type: "K_JSON"} : K_JSON)], "postprocess":  d => {
          return {
            id: 'O_JSON_DATATYPE',
            def: {
              datatype: d[0].value,
            }
          }
        }},
    {"name": "P_DROP_DB$subexpression$1", "symbols": [(lexer.has("K_DATABASE") ? {type: "K_DATABASE"} : K_DATABASE)]},
    {"name": "P_DROP_DB$subexpression$1", "symbols": [(lexer.has("K_SCHEMA") ? {type: "K_SCHEMA"} : K_SCHEMA)]},
    {"name": "P_DROP_DB$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_DROP_DB$ebnf$1", "symbols": ["P_DROP_DB$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_DB$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_DB", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", "P_DROP_DB$subexpression$1", "P_DROP_DB$ebnf$1", "__", "S_IDENTIFIER", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_DROP_DB',
            def: d[5]
          }
        }},
    {"name": "P_DROP_INDEX$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_ONLINE") ? {type: "K_ONLINE"} : K_ONLINE), "__"]},
    {"name": "P_DROP_INDEX$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_OFFLINE") ? {type: "K_OFFLINE"} : K_OFFLINE), "__"]},
    {"name": "P_DROP_INDEX$ebnf$1", "symbols": ["P_DROP_INDEX$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_INDEX$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_INDEX$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_DROP_INDEX$ebnf$2", "symbols": ["P_DROP_INDEX$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_INDEX$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_INDEX$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_WAIT") ? {type: "K_WAIT"} : K_WAIT), "__", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)]},
    {"name": "P_DROP_INDEX$ebnf$3$subexpression$1", "symbols": ["__", (lexer.has("K_NOWAIT") ? {type: "K_NOWAIT"} : K_NOWAIT)]},
    {"name": "P_DROP_INDEX$ebnf$3", "symbols": ["P_DROP_INDEX$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_INDEX$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_INDEX$ebnf$4", "symbols": []},
    {"name": "P_DROP_INDEX$ebnf$4$subexpression$1", "symbols": ["__", "P_INDEX_ALGORITHM_OPTION"], "postprocess": d => d[1]},
    {"name": "P_DROP_INDEX$ebnf$4$subexpression$1", "symbols": ["__", "P_LOCK_OPTION"], "postprocess": d => d[1]},
    {"name": "P_DROP_INDEX$ebnf$4", "symbols": ["P_DROP_INDEX$ebnf$4", "P_DROP_INDEX$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_DROP_INDEX", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", "P_DROP_INDEX$ebnf$1", (lexer.has("K_INDEX") ? {type: "K_INDEX"} : K_INDEX), "P_DROP_INDEX$ebnf$2", "__", "S_IDENTIFIER", "__", (lexer.has("K_ON") ? {type: "K_ON"} : K_ON), "__", "S_IDENTIFIER", "P_DROP_INDEX$ebnf$3", "P_DROP_INDEX$ebnf$4", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_DROP_INDEX',
            def: {
              index: d[6],
              table: d[10],
              options: d[12] ? d[12] : []
            }
          }
        }},
    {"name": "P_DROP_TABLE$ebnf$1$subexpression$1", "symbols": [(lexer.has("K_TEMPORARY") ? {type: "K_TEMPORARY"} : K_TEMPORARY), "__"]},
    {"name": "P_DROP_TABLE$ebnf$1", "symbols": ["P_DROP_TABLE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_TABLE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_TABLE$ebnf$2$subexpression$1", "symbols": ["__", (lexer.has("K_IF") ? {type: "K_IF"} : K_IF), "__", (lexer.has("K_EXISTS") ? {type: "K_EXISTS"} : K_EXISTS)]},
    {"name": "P_DROP_TABLE$ebnf$2", "symbols": ["P_DROP_TABLE$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_TABLE$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_TABLE$ebnf$3", "symbols": []},
    {"name": "P_DROP_TABLE$ebnf$3$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "S_IDENTIFIER"], "postprocess": d => d[3]},
    {"name": "P_DROP_TABLE$ebnf$3", "symbols": ["P_DROP_TABLE$ebnf$3", "P_DROP_TABLE$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_DROP_TABLE$ebnf$4$subexpression$1", "symbols": ["__", (lexer.has("K_WAIT") ? {type: "K_WAIT"} : K_WAIT), "__", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)]},
    {"name": "P_DROP_TABLE$ebnf$4$subexpression$1", "symbols": ["__", (lexer.has("K_NOWAIT") ? {type: "K_NOWAIT"} : K_NOWAIT)]},
    {"name": "P_DROP_TABLE$ebnf$4", "symbols": ["P_DROP_TABLE$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_TABLE$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_TABLE$ebnf$5$subexpression$1", "symbols": ["__", (lexer.has("K_RESTRICT") ? {type: "K_RESTRICT"} : K_RESTRICT)]},
    {"name": "P_DROP_TABLE$ebnf$5$subexpression$1", "symbols": ["__", (lexer.has("K_CASCADE") ? {type: "K_CASCADE"} : K_CASCADE)]},
    {"name": "P_DROP_TABLE$ebnf$5", "symbols": ["P_DROP_TABLE$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "P_DROP_TABLE$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_DROP_TABLE", "symbols": [(lexer.has("K_DROP") ? {type: "K_DROP"} : K_DROP), "__", "P_DROP_TABLE$ebnf$1", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "P_DROP_TABLE$ebnf$2", "__", "S_IDENTIFIER", "P_DROP_TABLE$ebnf$3", "P_DROP_TABLE$ebnf$4", "P_DROP_TABLE$ebnf$5", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_DROP_TABLE',
            def: [d[6]].concat(d[7] || [])
          }
        }},
    {"name": "P_RENAME_TABLE$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_WAIT") ? {type: "K_WAIT"} : K_WAIT), "__", (lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)]},
    {"name": "P_RENAME_TABLE$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("K_NOWAIT") ? {type: "K_NOWAIT"} : K_NOWAIT)]},
    {"name": "P_RENAME_TABLE$ebnf$1", "symbols": ["P_RENAME_TABLE$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "P_RENAME_TABLE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "P_RENAME_TABLE$ebnf$2", "symbols": []},
    {"name": "P_RENAME_TABLE$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA), "_", "S_IDENTIFIER", "__", (lexer.has("K_TO") ? {type: "K_TO"} : K_TO), "__", "S_IDENTIFIER"], "postprocess":  d => {
          return {
            table: d[3],
            newName: d[7]
          }
        }},
    {"name": "P_RENAME_TABLE$ebnf$2", "symbols": ["P_RENAME_TABLE$ebnf$2", "P_RENAME_TABLE$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_RENAME_TABLE", "symbols": [(lexer.has("K_RENAME") ? {type: "K_RENAME"} : K_RENAME), "__", (lexer.has("K_TABLE") ? {type: "K_TABLE"} : K_TABLE), "__", "S_IDENTIFIER", "P_RENAME_TABLE$ebnf$1", "__", (lexer.has("K_TO") ? {type: "K_TO"} : K_TO), "__", "S_IDENTIFIER", "P_RENAME_TABLE$ebnf$2", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_RENAME_TABLE',
            def: [{
              table: d[4],
              newName: d[9]
            }].concat(d[10] || [])
          }
        }},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_UNKNOWN") ? {type: "S_UNKNOWN"} : S_UNKNOWN)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": ["S_IDENTIFIER", "_"]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_SEMICOLON") ? {type: "S_SEMICOLON"} : S_SEMICOLON)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_BIT_FORMAT") ? {type: "S_BIT_FORMAT"} : S_BIT_FORMAT)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_HEXA_FORMAT") ? {type: "S_HEXA_FORMAT"} : S_HEXA_FORMAT)]},
    {"name": "P_SET$ebnf$1$subexpression$1", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)]},
    {"name": "P_SET$ebnf$1", "symbols": ["P_SET$ebnf$1$subexpression$1"]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_UNKNOWN") ? {type: "S_UNKNOWN"} : S_UNKNOWN)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": ["S_IDENTIFIER", "_"]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_EQUAL") ? {type: "S_EQUAL"} : S_EQUAL), "_"]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_LPARENS") ? {type: "S_LPARENS"} : S_LPARENS)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_RPARENS") ? {type: "S_RPARENS"} : S_RPARENS)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_COMMA") ? {type: "S_COMMA"} : S_COMMA)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_SEMICOLON") ? {type: "S_SEMICOLON"} : S_SEMICOLON)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_BIT_FORMAT") ? {type: "S_BIT_FORMAT"} : S_BIT_FORMAT)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_HEXA_FORMAT") ? {type: "S_HEXA_FORMAT"} : S_HEXA_FORMAT)]},
    {"name": "P_SET$ebnf$1$subexpression$2", "symbols": [(lexer.has("S_NUMBER") ? {type: "S_NUMBER"} : S_NUMBER)]},
    {"name": "P_SET$ebnf$1", "symbols": ["P_SET$ebnf$1", "P_SET$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "P_SET", "symbols": [(lexer.has("K_SET") ? {type: "K_SET"} : K_SET), "_", "P_SET$ebnf$1", "S_EOS"], "postprocess":  d => {
          return {
            id: 'P_SET',
            def: null
          }
        }}
]
  , ParserStart: "P_DDS"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

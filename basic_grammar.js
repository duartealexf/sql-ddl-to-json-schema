// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression$string$1", "symbols": [{"literal":"1"}, {"literal":"+"}, {"literal":"2"}, {"literal":"+"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "expression", "symbols": ["expression$string$1"]}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

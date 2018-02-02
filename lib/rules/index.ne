# =============================================================
# Lexer and rules loader

@{%
const moo = require('moo');

const keywords = require('./dictionary/keywords');
const symbols = require('./dictionary/symbols');

const rules = {
  ...keywords,
  ...symbols
}

const lexer = moo.compile(rules);

%}

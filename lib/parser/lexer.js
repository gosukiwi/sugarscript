const Lexer = require('lex')
const indent = [0]
let col = 0
let row = 1

Lexer.prototype.getLocation = function () {
  return { col, row }
}

Lexer.prototype.resetLocation = function () {
  col = 0
  row = 1
}

const lexer = new Lexer(function (char) {
  throw new Error(`Unexpected character '${char}' at line ${row}, column ${col}`)
})

lexer.addRule(/(?:\r?\n)+/, function (lexeme) {
  col = 0
  row += lexeme.length

  return 'NEWLINE'
})

lexer.addRule(/^ */gm, function (lexeme) {
  const indentation = lexeme.length
  col += indentation

  if (indentation > indent[0]) {
    indent.unshift(indentation)
    return 'INDENT'
  }

  const tokens = []
  while (indentation < indent[0]) {
    tokens.push('DEDENT')
    indent.shift()
  }

  if (tokens.length) return tokens
})

lexer.addRule(/ +/, function (lexeme) {
  col += lexeme.length
})

lexer.addRule(/$/, function () {
  return 'EOF'
})

// LITERAL TOKENS
// =============================================================================
lexer.addRule(/def/, function () {
  col += 3
  return 'DEF'
})

lexer.addRule(/let/, function () {
  col += 3
  return 'LET'
})

lexer.addRule(/return/, function () {
  col += 6
  return 'RETURN'
})

lexer.addRule(/integer/, function (lexeme) {
  col += 7
  return 'INTEGER'
})

lexer.addRule(/float/, function (lexeme) {
  col += 5
  return 'FLOAT'
})

lexer.addRule(/string/, function (lexeme) {
  col += 6
  return 'STRING'
})

lexer.addRule(/ref/, function (lexeme) {
  col += 3
  return 'REF'
})

lexer.addRule(/type/, function () {
  col += 4
  return 'TYPE'
})

lexer.addRule(/\./, function () {
  col++
  return '.'
})

lexer.addRule(/,/, function () {
  col++
  return ','
})

lexer.addRule(/::/, function () {
  col += 2
  return '::'
})

lexer.addRule(/:/, function () {
  col++
  return ':'
})

lexer.addRule(/==/, function () {
  col++
  return '=='
})

lexer.addRule(/=/, function () {
  col++
  return '='
})

lexer.addRule(/\[/, function () {
  col++
  return '['
})

lexer.addRule(/\]/, function () {
  col++
  return ']'
})

lexer.addRule(/\(/, function () {
  col++
  return '('
})

lexer.addRule(/\)/, function () {
  col++
  return ')'
})

lexer.addRule(/\+/, function () {
  col++
  return '+'
})

lexer.addRule(/-/, function () {
  col++
  return '-'
})

lexer.addRule(/\*/, function () {
  col++
  return '*'
})

lexer.addRule(/\//, function () {
  col++
  return '/'
})

lexer.addRule(/%/, function () {
  col++
  return '%'
})

lexer.addRule(/</, function () {
  col++
  return '<'
})

lexer.addRule(/>/, function () {
  col++
  return '>'
})

lexer.addRule(/<=/, function () {
  col += 2
  return '<='
})

lexer.addRule(/>=/, function () {
  col += 2
  return '>='
})

// Other
lexer.addRule(/[a-zA-Z][a-zA-Z0-9-_#$]*/gm, function (lexeme) {
  col += lexeme.length
  this.yytext = lexeme
  return 'IDENTIFIER'
})

lexer.addRule(/[-+]?\d+(?:\.\d+)?/, function (lexeme) {
  col += lexeme.length
  this.yytext = +lexeme
  return 'NUMBER'
})

lexer.addRule(/"(?:\\"|[^"])*?"/, function (lexeme) {
  const len = lexeme.length
  col += len
  this.yytext = lexeme.substr(1, len - 2)
  return 'STRING'
})

module.exports = lexer

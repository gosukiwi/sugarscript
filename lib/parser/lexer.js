const Lexer = require('lex')
const indent = [0]
let col = 1
let row = 1

const lexer = new Lexer(function (char) {
  throw new Error(`Unexpected character '${char}' at line ${row}, column ${col}`)
})

lexer.addRule(/(?:\r?\n)+/, function (lexeme) {
  col = 1
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

lexer.addRule(/integer/, function (lexeme) {
  col += lexeme.length
  return 'INTEGER'
})

lexer.addRule(/float/, function (lexeme) {
  col += lexeme.length
  return 'FLOAT'
})

lexer.addRule(/string/, function (lexeme) {
  col += lexeme.length
  return 'STRING'
})

lexer.addRule(/,/, function () {
  col++
  return ','
})

lexer.addRule(/:/, function () {
  col++
  return ':'
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

lexer.addRule(/==/, function () {
  col += 2
  return '=='
})

// Other
lexer.addRule(/[a-zA-Z][a-zA-Z0-9-_#$]*/gm, function (lexeme) {
  col += lexeme.length
  this.yytext = lexeme
  return 'IDENTIFIER'
})

module.exports = lexer
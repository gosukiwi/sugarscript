const expect = require('chai').expect
const lexer = require('../../lib/parser/lexer')

describe('parser/lexer', function () {
  it('works', function () {
    // const lexer = new Lexer()
    lexer.setInput(`
let a = 1
if 1
  foo()
  if 1
    bar()
let a = 1
    `.trim())

    let token = null
    const tokens = []
    while ((token = lexer.lex()) !== 'EOF') {
      tokens.push(token)
    }
    tokens.push(token)

    expect(tokens).to.eql([
      'LET', 'IDENTIFIER', '=', 'NUMBER', 'NEWLINE', 'IF', 'NUMBER', 'NEWLINE',
      'INDENT', 'IDENTIFIER', '(', ')', 'NEWLINE', 'IF', 'NUMBER', 'NEWLINE',
      'INDENT', 'IDENTIFIER', '(', ')', 'NEWLINE', 'DEDENT', 'DEDENT', 'LET',
      'IDENTIFIER', '=', 'NUMBER', 'EOF'
    ])
  })
})

class CharToken {
  constructor ({ match, name }) {
    this.match = match
    this.name = name || match
  }

  run (input) {
    return input[0] === this.match ? this.match : null
  }
}

class StringToken {
  constructor ({ match, name }) {
    this.match = match
    this.name = name
  }

  run (input) {
    return input.substring(0, this.match.length) === this.match ? this.match : null
  }
}

class RegexToken {
  constructor ({ match, name, transform }) {
    this.match = match
    this.name = name
  }

  run (input) {
    const matched = this.match.exec(input)
    return matched === null ? null : matched[0]
  }
}

const TOKENS = [
  new StringToken({ name: 'LET', match: 'let' }),
  new StringToken({ name: 'DEF', match: 'def' }),
  new StringToken({ name: 'IF', match: 'if' }),
  new StringToken({ name: 'ELIF', match: 'elif' }),
  new StringToken({ name: 'ELSE', match: 'else' }),
  new StringToken({ name: 'TYPE', match: 'type' }),
  new StringToken({ name: 'RETURN', match: 'return' }),
  new StringToken({ name: 'INTEGER', match: 'integer' }),
  new StringToken({ name: 'FLOAT', match: 'float' }),
  new StringToken({ name: 'STRING', match: 'string' }),
  new StringToken({ name: 'GLOBAL', match: 'global' }),
  new StringToken({ name: '::', match: '::' }),
  new CharToken({ match: '=' }),
  new CharToken({ match: '*' }),
  new CharToken({ match: ':' }),
  new CharToken({ match: ',' }),
  new CharToken({ match: '.' }),
  new CharToken({ match: '(' }),
  new CharToken({ match: ')' }),
  new CharToken({ match: '[' }),
  new CharToken({ match: ']' }),
  new RegexToken({ name: 'IDENTIFIER', match: /^[a-zA-Z][a-zA-Z0-9-_#$]*/ })
]

class Lexer {
  constructor () {
    this.input = ''
    this.indent = [0]
    this.shouldMatchIndentation = true
    this.yytext = ''
    this.resetPosition()
  }

  resetPosition () {
    this.row = 1
    this.col = 0
  }

  setInput (input) {
    this.input = input
    this.resetPosition()
  }

  setMatched (text) {
    this.yytext = text
    this.updatePosition()
  }

  * lex () {
    while (this.input !== '') {
      const result = this.lexOne()
      for (let i = 0, len = result.length; i < len; i++) {
        yield result[i]
      }
    }

    while (this.indent[0] > 0) {
      this.indent.shift() // remove first
      yield 'DEDENT'
    }

    yield 'EOF'
  }

  lexOne () {
    let match = null

    // Try indent-whitespace
    if (this.shouldMatchIndentation) {
      this.shouldMatchIndentation = false
      const result = this.matchIndentation()
      if (result.length > 0) return result
    }

    match = /^\n+/.exec(this.input)
    if (match) {
      this.shouldMatchIndentation = true
      this.input = this.input.substring(match[0].length)
      this.setMatched(match[0])
      return ['NEWLINE']
    }

    match = /^[ \t\r]+/.exec(this.input)
    if (match) { // ignore whitespace
      this.input = this.input.substring(match[0].length)
      this.setMatched(match[0])
      return []
    }

    // Strings
    match = /^"(?:\\"|[^"])*?"/.exec(this.input)
    if (match) {
      const len = match[0].length
      this.input = this.input.substring(len)
      this.setMatched(match[0].substring(1, len - 1))
      return ['STRING']
    }

    // Number
    match = /^[-+]?\d+(?:\.\d+)?/.exec(this.input)
    if (match) {
      const len = match[0].length
      this.input = this.input.substring(len)
      this.setMatched(+match[0])
      return ['NUMBER']
    }

    for (let i = 0, len = TOKENS.length; i < len; i++) {
      const token = TOKENS[i]
      const match = token.run(this.input)
      if (match !== null) {
        this.input = this.input.substring(match.length)
        this.setMatched(match)
        return [token.name]
      }
    }

    throw new Error(`Syntax error: Invalid token '${this.input[0]}' in line ${this.row}, column ${this.col + 1}`)
  }

  matchIndentation () {
    const lexeme = /^ */.exec(this.input)[0] // TODO: transform tabs to 2 spaces
    const indentation = lexeme.length

    if (indentation > this.indent[0]) {
      this.indent.unshift(indentation) // add at the beginning
      this.input = this.input.substring(lexeme.length)
      this.setMatched(lexeme)
      return ['INDENT']
    }

    const tokens = []
    while (indentation < this.indent[0]) {
      tokens.push('DEDENT')
      this.indent.shift() // remove first
    }

    return tokens
  }

  updatePosition () {
    for (let i = 0, len = this.yytext.length; i < len; i++) {
      if (this.yytext[i] === '\n') {
        this.row += 1
        this.col = 0
      } else {
        this.col += 1
      }
    }
  }
}

const lexer = new Lexer()

module.exports = {
  get yytext () {
    return lexer.yytext
  },

  get position () {
    return { row: lexer.row, col: lexer.col }
  },

  setInput (input) {
    lexer.setInput(input)
    this.generator = lexer.lex()
  },

  lex () {
    if (!this.generator) throw new Error("Call 'setInput' first")

    const next = this.generator.next()
    if (next.done) throw new Error('No more tokens')

    return next.value
  }
}

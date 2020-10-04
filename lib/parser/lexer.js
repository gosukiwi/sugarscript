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
  new RegexToken({ name: 'IMPORT_PLUGIN', match: /^import_plugin\b/ }),
  new RegexToken({ name: 'BINARY', match: /^0b[01]+\b/ }),
  new RegexToken({ name: 'OCTAL', match: /^0c[0-7]+\b/ }),
  new RegexToken({ name: 'HEX', match: /^0x[0-9A-F]+\b/ }),
  new RegexToken({ name: 'LET', match: /^let\b/ }),
  new RegexToken({ name: 'DEF', match: /^def\b/ }),
  new RegexToken({ name: 'IF', match: /^if\b/ }),
  new RegexToken({ name: 'ELIF', match: /^elif\b/ }),
  new RegexToken({ name: 'ELSE', match: /^else\b/ }),
  new RegexToken({ name: 'TYPE', match: /^type\b/ }),
  new RegexToken({ name: 'RETURN', match: /^return\b/ }),
  new RegexToken({ name: 'INTEGER', match: /^integer\b/ }),
  new RegexToken({ name: 'FLOAT', match: /^float\b/ }),
  new RegexToken({ name: 'STRING_TYPEHINT', match: /^string\b/ }),
  new RegexToken({ name: 'GLOBAL', match: /^global\b/ }),
  new RegexToken({ name: 'NOT', match: /^not\b/ }),
  new RegexToken({ name: 'AND', match: /^and\b/ }),
  new RegexToken({ name: 'OR', match: /^or\b/ }),
  new RegexToken({ name: 'WHILE', match: /^while\b/ }),
  new RegexToken({ name: 'FOR', match: /^for\b/ }),
  new RegexToken({ name: 'TO', match: /^to\b/ }),
  new RegexToken({ name: 'AS', match: /^as\b/ }),
  new RegexToken({ name: 'DO', match: /^do\b/ }),
  new RegexToken({ name: 'STEP', match: /^step\b/ }),
  new RegexToken({ name: 'BREAK', match: /^break\b/ }),
  new RegexToken({ name: 'CONTINUE', match: /^continue\b/ }),
  new RegexToken({ name: 'IN', match: /^in\b/ }),
  new RegexToken({ name: 'REQUIRE', match: /^require\b/ }),
  new RegexToken({ name: 'CALL', match: /^call\b/ }),
  new RegexToken({ name: 'TRUE', match: /^(?:true|yes|on)\b/ }),
  new RegexToken({ name: 'FALSE', match: /^(?:false|no|off)\b/ }),
  new RegexToken({ name: 'WITH', match: /^with\b/ }),
  new RegexToken({ name: 'WHEN', match: /^when\b/ }),
  new RegexToken({ name: 'THEN', match: /^then\b/ }),
  new StringToken({ name: '::', match: '::' }),
  new StringToken({ name: '->', match: '->' }),
  new RegexToken({ name: '!=', match: /^(?:!=|isnt)/ }),
  new RegexToken({ name: '==', match: /^(?:==|is)/ }),
  new StringToken({ name: '>=', match: '>=' }),
  new StringToken({ name: '<=', match: '<=' }),
  new CharToken({ match: '=' }),
  new CharToken({ match: '*' }),
  new CharToken({ match: ':' }),
  new CharToken({ match: ',' }),
  new CharToken({ match: '.' }),
  new CharToken({ match: '+' }),
  new CharToken({ match: '%' }),
  new CharToken({ match: '-' }),
  new CharToken({ match: '/' }),
  new CharToken({ match: '(' }),
  new CharToken({ match: ')' }),
  new CharToken({ match: '[' }),
  new CharToken({ match: ']' }),
  new CharToken({ match: '{' }),
  new CharToken({ match: '}' }),
  new CharToken({ match: '>' }),
  new CharToken({ match: '<' }),
  new CharToken({ match: '|' }),
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

    match = /^(?:\r?\n)+/.exec(this.input)
    if (match) {
      this.shouldMatchIndentation = true
      this.input = this.input.substring(match[0].length)
      this.setMatched(match[0])
      return ['NEWLINE']
    }

    // IGNORE
    match = /^[ \t\r]+/.exec(this.input)
    if (match) { // ignore whitespace
      this.input = this.input.substring(match[0].length)
      this.setMatched(match[0])
      return []
    }

    match = /^#.*?\n/.exec(this.input)
    if (match) { // comments count as newlines
      this.input = this.input.substring(match[0].length)
      this.setMatched(match[0])
      return ['NEWLINE']
    }

    // Strings
    match = /^"(?:\\"|[^"])*?"/.exec(this.input)
    if (match) {
      const len = match[0].length
      this.input = this.input.substring(len)
      this.setMatched(match[0].substring(1, len - 1))
      return ['STRING']
    }

    match = /^'(?:\\'|[^'])*?'/.exec(this.input)
    if (match) {
      const len = match[0].length
      this.input = this.input.substring(len)
      this.setMatched(match[0].substring(1, len - 1))
      return ['SQSTRING']
    }

    // Number
    match = /^[-+]?\d+(?:\.\d+)?\b/.exec(this.input)
    if (match) {
      const len = match[0].length
      this.input = this.input.substring(len)
      this.setMatched(+match[0])
      return ['NUMBER']
    }

    // Remaining tokens
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

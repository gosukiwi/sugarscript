class Codegen {
  call (ast) {
    return ast.map((expression) => this.generate(expression)).join('')
  }

  generate (expression) {
    switch (expression.type) {
      case 'DEF':
        return 'Hello'
      default:
        throw new Error(`Invalid type: ${expression.type}`)
    }
  }
}

module.exports = Codegen

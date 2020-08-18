class Definitions {
  constructor () {
    this.functions = {}
  }

  add (definition) {
    switch (definition.name) {
      case 'FUNCTION_DEFINITION':
        this.functions[definition.functionName] = definition
        break
      default:
        throw new Error(`Invalid definition: ${definition.name}`)
    }
  }
}

module.exports = Definitions

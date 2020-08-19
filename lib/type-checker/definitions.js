class Definitions {
  constructor () {
    this.functions = {}
    this.calls = {}
    this.variables = {}
    this.parameters = {}
    this.returns = []
  }

  add (definition) {
    switch (definition.name) {
      case 'FUNCTION_DEFINITION':
        this.functions[definition.functionName] = definition
        break
      case 'FUNCTION_CALL':
        this.calls[definition.functionName] = definition
        break
      case 'ASSIGNMENT':
        this.variables[definition.identifier] = definition
        break
      case 'PARAMETER':
        this.parameters[definition.value] = definition
        break
      case 'RETURN':
        this.returns.push(definition)
        break
      case 'INTEGER':
        // Do nothing
        break
      default:
        throw new Error(`[TYPECHECK] Definition not registered: ${definition.name}`)
    }
  }
}

module.exports = Definitions

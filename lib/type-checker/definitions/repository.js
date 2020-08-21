class Repository {
  constructor (parent) {
    this.parent = parent || null
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
      case 'IDENTIFIER':
        this.variables[definition.identifier] = definition
        break
      case 'PARAMETER':
        this.parameters[definition.identifier] = definition
        break
      case 'RETURN':
        this.returns.push(definition)
        break
      default:
        throw new Error(`[TYPECHECK] Definition not registered: ${definition.name}`)
    }
  }

  getFunction (name) {
    const func = this.functions[name]
    if (func) return func
    if (this.parent !== null) return this.parent.getFunction(name)
    return null
  }

  getIdentifier (name) {
    // TODO: Consider global variables
    const variable = this.variables[name] || this.parameters[name]
    if (variable) return variable
    if (this.parent !== null) return this.parent.getIdentifier(name)
    return null
  }
}

module.exports = Repository

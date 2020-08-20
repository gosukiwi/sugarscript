class Definitions {
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
        this.calls[definition.func] = definition
        break
      case 'ASSIGNMENT':
      case 'LET':
        this.variables[definition.identifier] = definition
        break
      case 'PARAMETER':
        this.parameters[definition.value] = definition
        break
      case 'RETURN':
        this.returns.push(definition)
        break
      case 'LITERAL':
        // Do nothing
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

  getVariable (name) {
    const variable = this.variables[name]
    if (variable) return variable
    if (this.parent !== null) return this.parent.getVariable(name)
    return null
  }
}

module.exports = Definitions

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

  getVariable (name, local) {
    local = local || false
    // TODO: Consider global variables
    const variable = this.variables[name] || this.parameters[name]
    if (variable) return variable
    if (this.parent !== null && !local) return this.parent.getVariable(name)
    return null
  }

  getQuery (parts, accu) {
    if (parts === 0) return accu || null
    if (accu) {
      throw new Error('Types not implemented!')
    }

    const value = parts[0].type === 'IDENTIFIER' ? this.getVariable(parts[0].value) : this.getVariable(parts[0].identifier)
    if (parts.length === 1) return value
    return this.getQuery(parts.slice(1), value)
  }
}

module.exports = Repository

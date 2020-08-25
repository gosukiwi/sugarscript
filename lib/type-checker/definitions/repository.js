class Repository {
  constructor (parent) {
    this.parent = parent || null
    this.types = {}
    this.functions = {}
    this.calls = {}
    this.variables = {}
    this.parameters = {}
    this.returns = []
  }

  hasType (name) {
    if (this.types[name]) return true
    if (this.parent !== null) return this.parent.hasType(name)
    return false
  }

  getType (name) {
    if (this.types[name]) return this.types[name]
    if (this.parent !== null) return this.parent.getType(name)
    return null
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

  getQueryType (parts, accu) {
    if (parts.length === 0) return accu || null

    const name = parts[0].type === 'IDENTIFIER' ? parts[0].value : parts[0].identifier
    if (accu) {
      if (!accu.is('UDT')) throw new Error(`Cannot access field '${name}' for type ${accu}`)

      const typedefinition = this.getType(accu.value)
      if (typedefinition === null) throw new Error(`Could not find type: '${accu.value}'`)

      let type = this.getType(accu.value).getField(name)
      if (parts[0].type === 'ARRAY_ACCESS') type = type.value
      return this.getQueryType(parts.slice(1), type)
    }

    const definition = this.getVariable(name)
    if (definition === null) throw new Error(`Could not find variable '${name}'. Was it defined?`)

    const type = parts[0].type === 'IDENTIFIER' ? definition.type : definition.type.value
    return this.getQueryType(parts.slice(1), type)
  }
}

module.exports = Repository

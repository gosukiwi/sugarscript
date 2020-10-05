const builtin = require('./built-in')

class Context {
  constructor (parent) {
    this.parent = parent || null
    this.types = {}
    this.functions = {}
    this._lambdas = []
    this.calls = {}
    this.variables = {}
    this.parameters = {}
    this.returns = []
    this.plugins = {} // PLUGIN NAME IS CASE SENSITIVE
  }

  get builtin () {
    return builtin
  }

  get lambdas () {
    if (this.parent !== null) return this.parent.lambdas
    return this._lambdas
  }

  root () {
    if (this.parent === null) return this
    return this.parent.root()
  }

  hasType (name) {
    name = name.toLowerCase()
    if (this.types[name]) return true
    if (this.parent !== null) return this.parent.hasType(name)
    return false
  }

  getType (name) {
    name = name.toLowerCase()
    if (this.types[name]) return this.types[name]
    if (this.parent !== null) return this.parent.getType(name)
    return null
  }

  addType (definition) {
    this.types[definition.name.toLowerCase()] = definition
  }

  add (definition) {
    switch (definition.name) {
      case 'FUNCTION_DEFINITION':
        this.functions[definition.functionName.toLowerCase()] = definition
        break
      case 'LAMBDA_DEFINITION':
        definition.id = this.lambdas.length
        this.lambdas.push(definition)
        break
      case 'FUNCTION_CALL':
        this.calls[definition.functionName.toLowerCase()] = definition
        break
      case 'IDENTIFIER':
        this.variables[definition.identifier.toLowerCase()] = definition
        break
      case 'PARAMETER':
        this.parameters[definition.identifier.toLowerCase()] = definition
        break
      case 'RETURN':
        this.returns.push(definition)
        break
      default:
        throw new Error(`[TYPECHECK] Definition not registered: ${definition.name}`)
    }
  }

  getFunction (name) {
    const func = this.functions[name.toLowerCase()]
    if (func) return func
    if (this.parent !== null) return this.parent.getFunction(name)
    return null
  }

  getBuiltInFunction (name) {
    return builtin[name.toLowerCase()] || null
  }

  getVariable (name, type = 'all') {
    name = name.toLowerCase()
    const variable = this.variables[name] || this.parameters[name]

    if (variable) {
      if (type === 'all') return variable
      if (type === 'global' && variable.global) return variable
      if (type === 'local' && !variable.global) return variable
    }

    // nothing found in this scope by now, try in the parent scope unless we are
    // only looking for local variables, also, only match the globals in the
    // parent scope, because that's the way it works in AGK's Tier 1
    if (this.parent !== null && type !== 'local') return this.parent.getVariable(name, 'global')

    return null
  }

  removeVariable (name) {
    delete this.variables[name.toLowerCase()]
  }

  getPlugin (name) {
    return this.plugins[name] || null
  }

  addPlugin (definition) {
    this.plugins[definition.name] = definition
  }
}

module.exports = Context

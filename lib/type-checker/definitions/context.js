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
      case 'LAMBDA_DEFINITION':
        definition.id = this.lambdas.length
        this.lambdas.push(definition)
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

  getBuiltInFunction (name) {
    return builtin[name] || null
  }

  getVariable (name, type = 'all') {
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

  getQueryType (parts, accu) {
    if (parts.length === 0) return accu || null

    const head = parts[0]
    const name = head.type === 'IDENTIFIER' ? head.value : head.identifier

    if (accu) { // second+ call
      if (!accu.is('UDT')) throw new Error(`Cannot access field '${name}' for type ${accu}`)

      const typedefinition = this.getType(accu.value)
      if (typedefinition === null) throw new Error(`Could not find type: '${accu.value}'`)

      let type = this.getType(accu.value).getField(name)
      if (head.type === 'ARRAY_ACCESS') {
        head.index.forEach((index) => {
          // TODO
          // if (index.type.isnt('NUMBER')) throw new Error(`Array access must be integer, '${index.type}' given`)
          type = type.value
        })
      }
      return this.getQueryType(parts.slice(1), type)
    }

    // first call
    const definition = this.getVariable(name)
    if (definition === null) throw new Error(`Could not find variable '${name}'. Was it defined?`)

    let type = definition.type
    if (head.type === 'ARRAY_ACCESS') {
      head.index.forEach((index) => {
        // TODO
        // if (index.type.isnt('NUMBER')) throw new Error(`Array access must be integer, '${index.type}' given`)
        type = type.value
      })
    }
    return this.getQueryType(parts.slice(1), type)
  }
}

module.exports = Context

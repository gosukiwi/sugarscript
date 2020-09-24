const FunctionCallDefinition = require('../definitions/function-call')
const Type = require('../types/type')

class FunctionCallChecker {
  check ({ node, checker, definitions }) {
    const builtin = this.checkBuiltIn({ node, checker, definitions })
    if (builtin !== null) return builtin

    const primitive = this.checkPrimitive({ node, checker, definitions })
    if (primitive !== null) return primitive

    return this.checkUserDefinedFunction({ node, checker, definitions })
  }

  // private

  checkUserDefinedFunction ({ node, checker, definitions }) {
    const func = definitions.getFunction(node.name)
    if (func === null) throw new Error(`Tried to call ${node.name} but function was not yet defined (${checker.file} at line ${node.position.row - 1})`)

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))
    const defaults = []
    const types = []
    const params = func.definitions.parameters
    Object.keys(params).forEach((key, index) => {
      if (!args[index]) { // arg not given
        if (params[key].default === null) { // complain if it has no default
          throw new Error(`Function '${func.functionName}' expects to receive an argument '${key}: ${params[key].type}' at position ${index + 1} (${checker.file} at line ${node.position.row - 1})`)
        }
      } else if (!params[key].type.equals(args[index])) { // argument given, but type doesn't match
        throw new Error(`Function '${func.functionName}' expects to receive an argument '${key}: ${params[key].type}' at position ${index + 1}, instead got ${args[index]} (${checker.file} at line ${node.position.row - 1})`)
      }

      defaults.push(params[key].default)
      types.push(params[key].type)
    })

    node.args = { nodes: node.args, types, defaults }
    definitions.add(new FunctionCallDefinition({
      functionName: node.name,
      type: func.type,
      args
    }))

    return func.type
  }

  checkPrimitive ({ node, checker, definitions }) {
    const validator = PRIMITIVE_CHECKER[node.name]
    if (validator === undefined) return null
    if (node.statement && !validator.statement) throw new Error(`'${node.name}' cannot be called as statement, at line ${node.position.row - 1}`)
    if (validator.params !== node.args.length) throw new Error(`Invalid number of arguments for '${node.name}', expected ${validator.params} got ${node.args.length}, at line ${node.position.row - 1}`)

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))
    if (args.length !== validator.params) throw new Error('TODO')

    const validate = validator.validate.bind({ node, checker, definitions })
    const type = validate(...args)
    if (type === null) throw new Error(`Invalid arguments to '${node.name}' (${args.join(', ')})`)

    node.args = { nodes: node.args, types: args, defaults: [] }
    return type
  }

  checkBuiltIn ({ node, checker, definitions }) {
    const func = definitions.getBuiltInFunction(node.name)
    if (func === null) return null

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))
    for (let i = 0, len = func.length; i < len; i++) {
      const definition = func[i]
      if (this.satisfies(args, definition.params)) {
        node.args = { nodes: node.args, types: args, defaults: [] }
        return definition.type
      }
    }

    throw new Error(`Invalid arguments to ${node.name} (${checker.file} at line ${node.position.row - 1})`)
  }

  satisfies (args, params) {
    if (args.length !== params.length) return false

    for (let i = 0, len = args.length; i < len; i++) {
      if (!params[i].equals(args[i])) return false
    }

    return true
  }
}

const PRIMITIVE_CHECKER = {
  array_length: {
    params: 1,
    statement: false,
    validate: function (p1) {
      if (p1.is('ARRAY')) return new Type('INTEGER')
      return null
    }
  },
  array_insert: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.equals(p1.value)) return new Type('VOID')
      return null
    }
  },
  array_insert_at: { // array_insert_at(arr, index, value)
    params: 3,
    statement: true,
    validate: function (p1, p2, p3) {
      if (p1.is('ARRAY') && p2.is('INTEGER') && p3.equals(p1.value)) return new Type('VOID')
      return null
    }
  },
  array_insert_sorted: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.equals(p1.value)) return new Type('VOID')
      return null
    }
  },
  array_remove: {
    params: 1,
    statement: true,
    validate: function (p1) {
      if (p1.is('ARRAY')) return new Type('VOID')
      return null
    }
  },
  array_remove_at: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.is('INTEGER')) return new Type('VOID')
      return null
    }
  },
  array_sort: {
    params: 1,
    statement: true,
    validate: function (p1) {
      if (p1.is('ARRAY')) return new Type('VOID')
      return null
    }
  },
  array_find: {
    params: 2,
    statement: false,
    validate: function (p1, p2) {
      if (p1.isnt('ARRAY')) throw new Error(`First argument for 'array_find' must be an array (line ${this.node.args[0].position.row})`)
      if (p1.value.isnt('UDT')) {
        if (p1.value.equals(p2)) return new Type('INTEGER')
        throw new Error(`Expected ${p2} as second argument to 'array_find' (line ${this.node.args[0].position.row})`)
      }

      // `p1.value` is UDT
      const type = this.definitions.getType(p1.value.value)
      const firstField = type.fields[Object.keys(type.fields)[0]]
      if (!p2.equals(firstField)) throw new Error(`Expected ${firstField} as second argument to 'array_find' (line ${this.node.args[0].position.row})`)

      return new Type('INTEGER')
    }
  }
}

module.exports = FunctionCallChecker

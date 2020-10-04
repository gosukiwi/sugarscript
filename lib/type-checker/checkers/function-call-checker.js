const FunctionCallDefinition = require('../definitions/function-call')
const PRIMITIVES = require('../primitives')

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
    const validator = PRIMITIVES[node.name]
    if (validator === undefined) return null
    if (node.statement && !validator.statement) throw new Error(`'${node.name}' cannot be called as statement, at line ${node.position.row - 1}`)
    if (validator.params !== node.args.length) throw new Error(`Invalid number of arguments for '${node.name}', expected ${validator.params.length} got ${node.args.length}, at line ${node.position.row - 1}`)

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))
    if (args.length !== validator.params) throw new Error(`Invalid number of arguments for '${node.name}', expected ${validator.params.length} got ${node.args.length}, at line ${node.position.row - 1}`)

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

module.exports = FunctionCallChecker

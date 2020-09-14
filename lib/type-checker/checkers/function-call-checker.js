const FunctionCallDefinition = require('../definitions/function-call')

class FunctionCallChecker {
  check ({ node, checker, definitions }) {
    const builtin = this.checkBuiltIn({ node, checker, definitions })
    if (builtin !== null) return builtin

    const func = definitions.getFunction(node.name)
    if (func === null) throw new Error(`Tried to call ${node.name} but function was not yet defined.`)

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))
    const defaults = []
    const types = []
    const params = func.definitions.parameters
    Object.keys(params).forEach((key, index) => {
      if (!args[index]) { // arg not given
        if (params[key].default === null) { // complain if it has no default
          throw new Error(`Function '${func.functionName}' expects to receive an argument '${key}: ${params[key].type}' at position ${index + 1}`)
        }
      } else if (!args[index].equals(params[key].type)) { // argument given, but type doesn't match
        throw new Error(`Function '${func.functionName}' expects to receive an argument '${key}: ${params[key].type}' at position ${index + 1}, instead got ${args[index]}`)
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

  // private

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

    throw new Error(`Invalid arguments to ${node.name}`)
  }

  satisfies (args, params) {
    if (args.length !== params.length) return false

    for (let i = 0, len = args.length; i < len; i++) {
      if (!args[i].equals(params[i])) return false
    }

    return true
  }
}

module.exports = FunctionCallChecker

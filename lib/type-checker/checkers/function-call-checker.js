const FunctionCallDefinition = require('../definitions/function-call')

class FunctionCallChecker {
  check ({ node, checker, definitions }) {
    const func = definitions.getFunction(node.name)
    if (func === null) throw new Error(`Tried to call ${node.name} but function was not yet defined.`)

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))

    const params = func.definitions.parameters
    Object.keys(params).forEach((key, index) => {
      if (!args[index]) { // arg not given
        if (params[key].default === null) { // complain if it has no default
          throw new Error(`Function '${func.functionName}' expects to receive an argument '${key}: ${params[key].type}' at position ${index + 1}`)
        }
      } else if (!args[index].equals(params[key].type)) { // argument given, but type doesn't match
        throw new Error(`Function '${func.functionName}' expects to receive an argument '${key}: ${params[key].type}' at position ${index + 1}, instead got ${args[index]}`)
      }
    })

    definitions.add(new FunctionCallDefinition({
      functionName: node.name,
      type: func.type,
      args
    }))

    return func.type
  }
}

module.exports = FunctionCallChecker

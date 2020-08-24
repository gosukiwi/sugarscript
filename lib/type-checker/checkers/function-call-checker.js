const FunctionCallDefinition = require('../definitions/function-call')

class FunctionCallChecker {
  check ({ node, checker, definitions }) {
    const func = definitions.getFunction(node.name)
    if (func === null) throw new Error(`Tried to call ${node.name} but function was not yet defined.`)

    const args = node.args.map((node) => checker.checkOne({ node, definitions }))

    // TODO: Validate args

    definitions.add(new FunctionCallDefinition({
      functionName: node.name,
      type: func.type,
      args
    }))

    return func.type
  }
}

module.exports = FunctionCallChecker

class FunctionCallChecker {
  check (node, checker, definitions) {
    // TODO: Is this needed? If the typechecker implements a `.validate` method
    // to run once everything is scanned, this is pointless and we can give the
    // user more flexibility, allow her to define functions in any order.
    const func = definitions.functions[node.name]
    if (func === undefined) throw new Error(`Tried to call ${node.name} but function was not yet defined.`)

    let args = []
    if (node.args !== null) {
      args = node.args.args.map((node) => checker.checkOne(node, definitions))
    }

    return {
      name: 'FUNCTION_CALL',
      functionname: node.name,
      type: func.type,
      args
    }
  }
}

module.exports = FunctionCallChecker

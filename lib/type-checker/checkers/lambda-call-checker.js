class LambdaCallChecker {
  check ({ node, checker, definitions }) {
    const func = definitions.getVariable(node.name)
    if (func === null) throw new Error(`Tried to call ${node.name} but variable was not yet defined.`)
    if (!func.type.is('INTEGER')) throw new Error(`Tried to call ${node.name} but variable was not INTEGER.`)

    node.args.map((node) => {
      const type = checker.checkOne({ node, definitions })
      node.typehint = type
    })

    return node.typehint
  }
}

module.exports = LambdaCallChecker

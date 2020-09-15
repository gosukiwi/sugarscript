class LambdaCallChecker {
  check ({ node, checker, definitions }) {
    if (!definitions.getQueryType(node.name.parts).is('INTEGER')) throw new Error(`Tried to call ${node.name} but variable was not INTEGER.`)

    node.args.map((node) => {
      const type = checker.checkOne({ node, definitions })
      node.typehint = type
    })

    return node.typehint
  }
}

module.exports = LambdaCallChecker

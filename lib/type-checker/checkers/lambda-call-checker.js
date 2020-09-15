class LambdaCallChecker {
  check ({ node, checker, definitions }) {
    const checkOne = (node) => checker.checkOne({ node, definitions })
    if (!definitions.getQueryType(node.name.parts, checkOne).is('INTEGER')) throw new Error(`Tried to call ${node.name} but variable was not INTEGER.`)

    node.args.map((node) => {
      const type = checker.checkOne({ node, definitions })
      node.typehint = type
    })

    return node.typehint
  }
}

module.exports = LambdaCallChecker

class LambdaCallChecker {
  check ({ node, checker, definitions }) {
    if (!checker.checkOne({ node: node.name, definitions }).is('INTEGER')) throw new Error(`Tried to call ${node.name} but variable was not INTEGER (${checker.file} at line ${node.name.position.row})`)

    node.args.map((node) => {
      const type = checker.checkOne({ node, definitions })
      node.typehint = type
    })

    return node.typehint
  }
}

module.exports = LambdaCallChecker

const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const checkOne = (node) => checker.checkOne({ node, definitions })
    const rhs = checker.checkOne({ node: node.rhs, definitions })
    const type = definitions.getQueryType(node.lhs.parts, checkOne)
    if (!type.equals(rhs)) throw new Error(`Cannot assign ${rhs} to ${type}`)

    return builder.void()
  }
}

module.exports = AssignmentChecker

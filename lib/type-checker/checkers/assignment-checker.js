const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const rhs = checker.checkOne({ node: node.rhs, definitions })
    const lhs = checker.checkOne({ node: node.lhs, definitions })
    if (!lhs.equals(rhs)) throw new Error(`Cannot assign ${rhs} to ${lhs}`)

    return builder.void()
  }
}

module.exports = AssignmentChecker

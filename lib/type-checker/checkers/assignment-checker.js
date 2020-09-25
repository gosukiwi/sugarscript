const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const rhs = checker.checkOne({ node: node.rhs, definitions })
    const lhs = checker.checkOne({ node: node.lhs, definitions })

    if (!this.assignable(lhs, rhs, definitions)) throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
    return builder.void()
  }

  // private

  assignable (lhs, rhs, definitions) {
    if (lhs.is('UDT') && rhs.is('UDT')) return lhs.assignable(rhs, definitions)
    return lhs.equals(rhs)
  }
}

module.exports = AssignmentChecker

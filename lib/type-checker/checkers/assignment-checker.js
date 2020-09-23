const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const rhs = checker.checkOne({ node: node.rhs, definitions })
    const lhs = checker.checkOne({ node: node.lhs, definitions })

    if (lhs.is('UNION') && rhs.is('UDT')) {
      if (!lhs.includes(rhs)) throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
    } else if (!lhs.equals(rhs)) {
      throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
    }

    return builder.void()
  }
}

module.exports = AssignmentChecker

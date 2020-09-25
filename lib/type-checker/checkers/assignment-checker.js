const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const rhs = checker.checkOne({ node: node.rhs, definitions })
    const lhs = checker.checkOne({ node: node.lhs, definitions })

    if (lhs.is('UDT') && rhs.is('UDT')) {
      const lhsDefinition = definitions.getType(lhs.value)
      const rhsDefinition = definitions.getType(rhs.value)

      const bothAreUnions = lhsDefinition.isUnion() && rhsDefinition.isUnion()
      const neitherIsUnion = !(lhsDefinition.isUnion() || rhsDefinition.isUnion())
      if (bothAreUnions || neitherIsUnion) {
        if (!lhs.equals(rhs)) throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
        return
      }

      // By now, either LHS is union, or RHS is union.
      // We cannot assign an union to a non-union, so if RHS is union, fail
      if (rhsDefinition.isUnion()) {
        throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
      }

      // By now we now LHS is union and RHS isn't. Check RHS type is not
      // included on the UNION
      if (!lhsDefinition.includes(rhs)) {
        throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
      }
    } else if (!lhs.equals(rhs)) {
      throw new Error(`Cannot assign ${rhs} to ${lhs} (${checker.file} at line ${node.position.row - 1})`)
    }

    return builder.void()
  }
}

module.exports = AssignmentChecker

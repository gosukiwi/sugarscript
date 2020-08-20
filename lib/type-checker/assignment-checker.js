class AssignmentChecker {
  check (node, checker, definitions) {
    // TODO: Arrays and Plugins
    if (node.lhs.type !== 'IDENTIFIER') throw new Error('IMPLEMENT ME')

    return {
      name: 'ASSIGNMENT',
      identifier: node.lhs.value,
      type: checker.checkOne(node.rhs, definitions)
    }
  }
}

module.exports = AssignmentChecker

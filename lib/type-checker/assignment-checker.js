class AssignmentChecker {
  check (node, checker, definitions) {
    const type = checker.checkOne(node.rhs, definitions).type

    // TODO: Arrays and Plugins
    if (node.lhs.type !== 'IDENTIFIER') throw new Error('IMPLEMENT ME')

    return { name: 'ASSIGNMENT', identifier: node.lhs.value, type }
  }
}

module.exports = AssignmentChecker

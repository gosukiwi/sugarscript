const typeToString = require('./util/type-to-string')

class AssignmentChecker {
  check (node, checker, definitions) {
    // TODO: Arrays and Plugins
    if (node.lhs.type === 'IDENTIFIER') return this.identifier(node, checker, definitions)
    if (node.lhs.type === 'ARRAY_ACCESS') return this.arrayAccess(node, checker, definitions)

    throw new Error(`[TYPECHECK] Assignment: Invalid left-hand-side: '${node.lhs.type}'`)
  }

  // private

  identifier (node, checker, definitions) {
    return {
      name: 'ASSIGNMENT',
      identifier: node.lhs.value,
      type: checker.checkOne(node.rhs, definitions)
    }
  }

  arrayAccess (node, checker, definitions) {
    const variable = definitions.getVariable(node.lhs.identifier.value)
    if (variable === null) throw new Error(`[TYPECHECK] Assignment: Could not find variable '${node.lhs.identifier.value}'`)
    if (variable.type.type !== 'ARRAY') throw new Error(`[TYPECHECK] Assignment: Cannot array-assign to a '${variable.type.type}'`)

    const rhsType = typeToString(checker.checkOne(node.rhs, definitions))
    if (variable.type.value !== rhsType) throw new Error(`[TYPECHECK] Assignment: Cannot assign '${rhsType}' to an array of '${variable.type.value}'`)

    return { type: 'VOID', name: 'LITERAL' }
  }
}

module.exports = AssignmentChecker

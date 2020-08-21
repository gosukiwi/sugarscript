const IdentifierDefinition = require('./definitions/identifier-definition')
const builder = require('./types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    // TODO: Arrays and Plugins
    if (node.lhs.type === 'IDENTIFIER') return this.identifier({ node, checker, definitions })
    if (node.lhs.type === 'ARRAY_ACCESS') return this.arrayAccess({ node, checker, definitions })

    throw new Error(`[TYPECHECK] Assignment: Invalid left-hand-side: '${node.lhs.type}'`)
  }

  // private

  identifier ({ node, checker, definitions }) {
    const type = checker.checkOne({ node: node.rhs, definitions })
    definitions.add(new IdentifierDefinition({ identifier: node.lhs.value, type }))
    return builder.void()
  }

  arrayAccess ({ node, checker, definitions }) {
    const variable = definitions.getIdentifier(node.lhs.identifier.value)
    if (variable === null) throw new Error(`Could not find: '${node.lhs.identifier.value}'`)
    if (variable.type.isnt('ARRAY')) throw new Error(`Cannot array-assign to a '${variable.type}'`)

    const rhsType = checker.checkOne({ node: node.rhs, definitions })
    if (!variable.type.value.equals(rhsType)) throw new Error(`Cannot assign '${rhsType}' to '${variable.type}'`)

    return builder.void()
  }
}

module.exports = AssignmentChecker

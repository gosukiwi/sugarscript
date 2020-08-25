const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const rhs = checker.checkOne({ node: node.rhs, definitions })

    const definition = definitions.getQuery(node.lhs.parts)
    if (definition === null) throw new Error(`Could not find variable ${node.lhs.parts}. Did you forget to let-define it?`)

    const type = node.lhs.parts[node.lhs.parts.length - 1].type === 'ARRAY_ACCESS' ? definition.type.value : definition.type
    if (!type.equals(rhs)) throw new Error(`Cannot assign ${rhs} to ${type}`)

    return builder.void()
  }
}

module.exports = AssignmentChecker

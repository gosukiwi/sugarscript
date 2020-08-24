const IdentifierDefinition = require('../definitions/identifier-definition')
const builder = require('../types/builder')

class AssignmentChecker {
  check ({ node, checker, definitions }) {
    const rhs = checker.checkOne({ node: node.rhs, definitions })
    let lhs = null
    try {
      lhs = checker.checkOne({ node: node.lhs, definitions })
      if (!lhs.equals(rhs)) throw new Error(`Cannot assign ${rhs} to ${lhs}`)
    } catch (error) {
      if (/Could not find variable/.test(error)) { // it's an assignment
        definitions.add(new IdentifierDefinition({ identifier: node.lhs.parts[0].value, type: rhs }))
        return builder.void()
      }
      throw error
    }
    // definitions.add(new QueryDefinition({ identifier: node.lhs.value, type }))
    return builder.void()
  }

  // private

  // identifier ({ node, checker, definitions }) {
  //   const type = checker.checkOne({ node: node.rhs, definitions })
  //   definitions.add(new IdentifierDefinition({ identifier: node.lhs.value, type }))
  //   return builder.void()
  // }
  //
  // arrayAccess ({ node, checker, definitions }) {
  //   const variable = definitions.getIdentifier(node.lhs.identifier.value)
  //   if (variable === null) throw new Error(`Could not find: '${node.lhs.identifier.value}'`)
  //   if (variable.type.isnt('ARRAY')) throw new Error(`Cannot array-assign to a '${variable.type}'`)
  //
  //   const rhsType = checker.checkOne({ node: node.rhs, definitions })
  //   if (!variable.type.value.equals(rhsType)) throw new Error(`Cannot assign '${rhsType}' to '${variable.type}'`)
  //
  //   return builder.void()
  // }
}

module.exports = AssignmentChecker

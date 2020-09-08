const IdentifierDefinition = require('../definitions/identifier-definition')
const validate = require('../validate-udt')

class LetChecker {
  check ({ node, definitions, checker }) {
    if (definitions.getVariable(node.name, 'local')) throw new Error(`Already defined ${node.name} in this scope`)
    // Global variables work as if they were defined in the global scope.
    // If there's a non-global in the global scope, it will complain.
    if (node.global && definitions.root().getVariable(node.name)) throw new Error(`Already defined "${node.name}" in global scope`)

    const valueType = node.value ? checker.checkOne({ node: node.value, definitions }) : null
    const type = node.typehint || valueType
    node.typehint = type // pass along to compiler

    validate(type, definitions)
    if (valueType !== null && node.typehint !== null && !node.typehint.equals(valueType)) throw new Error(`Cannot assign ${valueType} to ${node.typehint}`)

    if (node.global) {
      definitions.root().add(new IdentifierDefinition({ identifier: node.name, global: node.global, type }))
    } else {
      definitions.add(new IdentifierDefinition({ identifier: node.name, global: node.global, type }))
    }

    return type
  }
}

module.exports = LetChecker

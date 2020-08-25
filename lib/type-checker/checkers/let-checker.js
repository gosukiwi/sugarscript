const IdentifierDefinition = require('../definitions/identifier-definition')

class LetChecker {
  check ({ node, definitions, checker }) {
    if (definitions.getIdentifier(node.name, true)) throw new Error(`Already defined ${node.name} in this scope`)

    const valueType = node.value ? checker.checkOne({ node: node.value, definitions }) : null
    const type = node.typehint || valueType
    node.typehint = type // pass along to compiler

    if (valueType !== null && node.typehint !== null && !node.typehint.equals(valueType)) throw new Error(`Cannot assign ${valueType} to ${node.typehint}`)

    definitions.add(new IdentifierDefinition({ identifier: node.name, type }))
    return type
  }
}

module.exports = LetChecker

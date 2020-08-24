const IdentifierDefinition = require('../definitions/identifier-definition')

class LetChecker {
  check ({ node, definitions }) {
    const type = node.typehint
    definitions.add(new IdentifierDefinition({ identifier: node.name, type }))
    return type
  }
}

module.exports = LetChecker

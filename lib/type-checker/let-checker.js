const builder = require('./types/builder')
const IdentifierDefinition = require('./definitions/identifier-definition')

class LetChecker {
  check ({ node, definitions }) {
    const type = builder.build({ type: node.value, array: node.array })
    definitions.add(new IdentifierDefinition({ identifier: node.name, type: type }))

    return type
  }
}

module.exports = LetChecker

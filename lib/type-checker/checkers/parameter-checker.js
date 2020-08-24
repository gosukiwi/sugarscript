const ParameterDefinition = require('../definitions/parameter-definition')

class ParameterChecker {
  check ({ node, definitions }) {
    definitions.add(new ParameterDefinition({
      type: node.typehint,
      isReference: node.ref,
      identifier: node.name
    }))

    return node.typehint
  }
}

module.exports = ParameterChecker

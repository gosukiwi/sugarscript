const ParameterDefinition = require('./definitions/parameter-definition')
const builder = require('./types/builder')

class ParameterChecker {
  check ({ node, definitions }) {
    const type = builder.build({ type: node.as, array: node.array })
    definitions.add(new ParameterDefinition({
      type: type,
      isReference: node.ref,
      arrayDimensions: node.array,
      identifier: node.name
    }))

    return type
  }
}

module.exports = ParameterChecker

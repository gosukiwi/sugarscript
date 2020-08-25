const typegen = require('../type-generator')

class ParameterGenerator {
  generate ({ node, snippet }) {
    if (node.ref) {
      snippet.append(`${node.name} ref as ${typegen(node.typehint)}`)
    } else {
      snippet.append(`${node.name} as ${typegen(node.typehint)}`)
    }
  }
}

module.exports = ParameterGenerator

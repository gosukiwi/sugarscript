const TypeGenerator = require('../type-generator')

class ParameterGenerator {
  generate ({ node, snippet }) {
    const typegen = new TypeGenerator()
    if (node.ref) {
      snippet.append(`${node.name} ref as ${typegen.generate(node.typehint)}`)
    } else {
      snippet.append(`${node.name} as ${typegen.generate(node.typehint)}`)
    }
  }
}

module.exports = ParameterGenerator

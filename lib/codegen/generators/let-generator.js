const typegen = require('../type-generator')

class LetGenerator {
  generate ({ node, definitions, generator, snippet }) {
    if (node.global) snippet.append('global ')
    snippet
      .append(node.name)
      .append(' as ')
      .append(typegen(node.typehint))
      .append('\n')

    if (node.value) {
      snippet.append(node.name).append(' = ')
      generator.generateOne({ node: node.value, definitions, snippet })
      snippet.append('\n')
    }
  }
}

module.exports = LetGenerator

const TypeGenerator = require('../type-generator')

const typegen = new TypeGenerator()
class LetGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet
      .append(node.name)
      .append(' as ')
      .append(typegen.generate(node.typehint))
      .append('\n')

    if (node.value) {
      snippet.append(node.name).append(' = ')
      generator.generateOne({ node: node.value, definitions, snippet })
      snippet.append('\n')
    }
  }
}

module.exports = LetGenerator

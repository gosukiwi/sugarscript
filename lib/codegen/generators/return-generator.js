class ReturnGenerator {
  generate ({ node, generator, definitions, snippet }) {
    snippet.append('exitfunction ')
    generator.generateOne({ node: node.value, definitions, snippet })
    snippet.append('\n')
  }
}

module.exports = ReturnGenerator

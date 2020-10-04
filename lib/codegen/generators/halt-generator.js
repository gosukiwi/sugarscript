class HaltGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append('Message(')
    generator.generateOne({ node: node.message, definitions, snippet })
    snippet.append(')\nend\n')
  }
}

module.exports = HaltGenerator

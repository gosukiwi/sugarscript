class WhileGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append('while ')
    generator.generateOne({ node: node.condition, definitions, snippet })
    snippet.append('\n')
    node.body.forEach((node) => {
      generator.generateOne({ node, definitions, snippet })
    })
    snippet.append('endwhile\n')
  }
}

module.exports = WhileGenerator

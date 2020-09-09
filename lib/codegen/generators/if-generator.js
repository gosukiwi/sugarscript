class IfGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append('if ')
    generator.generateOne({ node: node.condition, definitions, snippet })
    snippet.append('\n')
    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    if (node.tail) generator.generateOne({ node: node.tail, definitions, snippet })
    snippet.append('endif\n')
  }
}

module.exports = IfGenerator

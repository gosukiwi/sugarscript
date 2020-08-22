class ArrayAccessGenerator {
  generate ({ node, definitions, generator, snippet }) {
    generator.generateOne({ node: node.identifier, definitions, snippet })
    snippet.append('[')
    node.index.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    snippet.append(']')
  }
}

module.exports = ArrayAccessGenerator

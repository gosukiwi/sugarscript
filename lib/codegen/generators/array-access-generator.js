class ArrayAccessGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append(`${node.identifier}[`)
    generator.generateOne({ node: node.index, definitions, snippet })
    snippet.append(']')
  }
}

module.exports = ArrayAccessGenerator

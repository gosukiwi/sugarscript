class ArrayAccessGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append(`${node.identifier}[`)
    const len = node.index.length
    node.index.forEach((index, i) => {
      generator.generateOne({ node: index, definitions, snippet })
      if (i < len - 1) snippet.append(', ')
    })
    snippet.append(']')
  }
}

module.exports = ArrayAccessGenerator

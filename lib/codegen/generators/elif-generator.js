class ElifGenerator {
  generate ({ node, definitions, generator, snippet }) {
    if (node.condition) {
      snippet.append('elseif ')
      generator.generateOne({ node: node.condition, definitions, snippet })
      snippet.append('\n')
    } else {
      snippet.append('else\n')
    }

    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    if (node.tail) generator.generateOne({ node: node.tail, definitions, snippet })
  }
}

module.exports = ElifGenerator

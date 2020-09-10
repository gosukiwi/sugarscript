class UnopGenerator {
  generate ({ node, definitions, generator, snippet }) {
    if (node.name !== 'NOT') throw new Error(`Invalid operator: ${node.name}`)

    snippet.append('not ')
    generator.generateOne({ node: node.expression, definitions, snippet })
  }
}

module.exports = UnopGenerator

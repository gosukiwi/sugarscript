class ParenthesizedExpressionGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append('(')
    generator.generateOne({ node: node.expression, definitions, snippet })
    snippet.append(')')
  }
}

module.exports = ParenthesizedExpressionGenerator

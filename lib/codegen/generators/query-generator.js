class QueryGenerator {
  generate ({ node, snippet, definitions, generator }) {
    const len = node.parts.length
    node.parts.forEach((part, index) => {
      generator.generateOne({ node: part, definitions, snippet })
      if (index < len - 1) snippet.append('.')
    })
  }
}

module.exports = QueryGenerator

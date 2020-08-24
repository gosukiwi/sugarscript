class FunctionCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append(`${node.name}(`)

    const len = node.args.length
    node.args.forEach((arg, index) => {
      generator.generateOne({ node: arg, definitions, snippet })
      if (index < len - 1) snippet.append(', ')
    })
    snippet.append(')')

    return snippet.toString()
  }
}

module.exports = FunctionCallGenerator

class FunctionCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    snippet.append(`${node.name}(`)
    this.generateArgs(node.args, definitions, generator, snippet)
    snippet.append(')\n')

    return snippet.toString()
  }

  // private

  generateArgs (argumentList, definitions, generator, snippet) {
    if (argumentList === null) return

    const size = argumentList.args.length
    return argumentList.args.forEach((node, index) => {
      generator.generateOne({ node, definitions, snippet })
      if (index < size - 1) snippet.append(', ')
    })
  }
}

module.exports = FunctionCallGenerator

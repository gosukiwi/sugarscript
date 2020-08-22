const Snippet = require('../snippet')

class FunctionCallGenerator {
  generate ({ node, definitions, generator }) {
    const snippet = new Snippet()
    snippet.append(`${node.name}(`)
    this.generateArgs(node.args, definitions, generator, snippet)
    snippet.append(')')

    return snippet.toString()
  }

  // private

  generateArgs (argumentList, definitions, generator, snippet) {
    if (argumentList === null) return ''

    const size = argumentList.args.length
    return argumentList.args.forEach((node, index) => {
      if (node.type === 'INLINE_ARRAY') {
        const output = generator.generateOne({ node, definitions })
        snippet.prepend(output)
        snippet.append(node._name)
        if (index < size - 1) snippet.append(', ')
      } else {
        snippet.append(generator.generateOne({ node, definitions }))
        if (index < size - 1) snippet.append(', ')
      }
    })
  }
}

module.exports = FunctionCallGenerator

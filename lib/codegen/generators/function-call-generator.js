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

    return argumentList.args.map((node) => {
      if (node.type === 'INLINE_ARRAY') {
        const output = generator.generateOne({ node, definitions })
        snippet.prepend(output)
        snippet.append(node._name)
      } else {
        snippet.append(generator.generateOne({ node, definitions }))
      }
    }).join(', ')
  }
}

module.exports = FunctionCallGenerator

const Snippet = require('../snippet')

class ElifGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    if (node.condition) {
      snippet.append('elseif ')
      generator.generateOne({ node: node.condition, definitions, snippet })
      snippet.append('\n')
    } else {
      snippet.append('else\n')
    }

    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    if (node.tail) generator.generateOne({ node: node.tail, definitions, snippet })

    outer.append(snippet)
  }
}

module.exports = ElifGenerator

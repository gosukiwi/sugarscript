const typegen = require('../type-generator')
const Snippet = require('../snippet')

class LetGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append(`// ${generator.file}, line ${node.position.row - 1}\n`)
    if (node.global) snippet.append('global ')
    snippet
      .append(node.name)
      .append(' as ')
      .append(typegen(node.typehint))
      .append('\n')

    if (node.value) {
      snippet.append(node.name).append(' = ')
      generator.generateOne({ node: node.value, definitions, snippet })
      snippet.append('\n')
    }

    outer.append(snippet)
  }
}

module.exports = LetGenerator

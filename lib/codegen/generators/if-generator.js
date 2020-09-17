const Snippet = require('../snippet')

class IfGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append(`// ${generator.file}, line ${node.body[0].position.row - 2}\n`)
    snippet.append('if ')
    generator.generateOne({ node: node.condition, definitions, snippet })
    snippet.append('\n')
    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    if (node.tail) generator.generateOne({ node: node.tail, definitions, snippet })
    snippet.append('endif\n')

    outer.append(snippet)
  }
}

module.exports = IfGenerator

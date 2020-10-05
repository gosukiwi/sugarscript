const Snippet = require('../snippet')

class WhileGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append(`// ${generator.filename}, line ${node.condition.position.row - 1}\n`)
    snippet.append('while ')
    generator.generateOne({ node: node.condition, definitions, snippet })
    snippet.append('\n')
    node.body.forEach((node) => {
      generator.generateOne({ node, definitions, snippet })
    })
    snippet.append('endwhile\n')

    outer.append(snippet)
  }
}

module.exports = WhileGenerator

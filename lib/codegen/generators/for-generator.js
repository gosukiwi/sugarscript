const Snippet = require('../snippet')

class ForGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append(`// ${generator.file}, line ${node.from.position.row}\n`)
    snippet.append(`for ${node.variable} = `)
    generator.generateOne({ node: node.from, definitions, snippet })
    snippet.append(' to ')
    generator.generateOne({ node: node.to, definitions, snippet })
    snippet.append(' step ')
    node.step === null ? snippet.append('1') : generator.generateOne({ node: node.step, definitions, snippet })
    snippet.append('\n')
    node.body.forEach((node) => {
      generator.generateOne({ node, definitions, snippet })
    })
    snippet.append(`next ${node.variable}\n`)

    outer.append(snippet)
  }
}

module.exports = ForGenerator

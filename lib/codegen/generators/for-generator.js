class ForGenerator {
  generate ({ node, definitions, generator, snippet }) {
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
  }
}

module.exports = ForGenerator

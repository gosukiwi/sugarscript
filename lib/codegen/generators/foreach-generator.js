const namegen = require('../name-generator')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

class ForeachGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    const array = namegen()
    const i = namegen()
    snippet
      .append(`${array} as `)
      .append(typegen(node.typehint))
      .append('\n')
      .append(`${array} = `)
    generator.generateOne({ node: node.expression, definitions, snippet })
    snippet
      .append('\n')
      .append(`for ${i} = 0 to ${array}.length\n`)
      .append(`${node.variable} as ${typegen(node.typehint.value)}\n`) // we know the node typehint is an array by now
      .append(`${node.variable} = ${array}[${i}]\n`)
    node.body.forEach((node) => {
      generator.generateOne({ node, definitions, snippet })
    })
    snippet.append(`next ${i}\n`)

    outer.append(snippet)
  }
}

module.exports = ForeachGenerator

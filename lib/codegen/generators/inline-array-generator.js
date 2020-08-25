const namegen = require('../name-generator')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

class InlineArrayGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const name = namegen()

    const header = new Snippet()
    header.append(`${name} as ${typegen(node.typehint)}\n`)
    node.elements.forEach((node) => {
      header.append(`${name}.insert(`)
      generator.generateOne({ node, definitions, snippet: header })
      header.append(')\n')
    })

    snippet.prepend(header)
    snippet.append(name)
  }
}

module.exports = InlineArrayGenerator

const Snippet = require('../snippet')
const namegen = require('../name-generator')
const typegen = require('../type-generator')

class ListComprehensionGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const name = namegen()
    const iname = namegen()
    const array = namegen()

    const setup = new Snippet()
    setup
      .append(`${name} as ${typegen(node.typehint)}\n`)
      .append(`${array} as ${typegen(node.typehint)}\n`)
      .append(`${array} = `)
    generator.generateOne({ node: node.expression, definitions, snippet: setup })
    setup
      .append(`\nfor ${iname} = 0 to ${array}.length\n`)
      .append(`${node.identifier.value} = ${array}[${iname}]\n`)

    if (node.condition !== null) {
      setup.append('if ')
      generator.generateOne({ node: node.condition, definitions, snippet: setup })
      setup.append(`\n${name}.insert(`)
      generator.generateOne({ node: node.body, definitions, snippet: setup })
      setup.append(')\nendif\n')
    } else {
      setup.append(`${name}.insert(`)
      generator.generateOne({ node: node.body, definitions, snippet: setup })
      setup.append(')\n')
    }

    setup.append(`next ${iname}\n`)

    snippet.prepend(setup).append(name)
  }
}

module.exports = ListComprehensionGenerator

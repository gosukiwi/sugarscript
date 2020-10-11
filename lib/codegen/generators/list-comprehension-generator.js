const Snippet = require('../snippet')
const Array = require('../../type-checker/types/array')
const namegen = require('../name-generator').generate
const typegen = require('../type-generator')

class ListComprehensionGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const name = namegen()
    const iname = namegen()
    const array = namegen()

    const setup = new Snippet()
    setup
      .append(`${name} as ${typegen(new Array({ value: node.body.typehint }))}\n`)
      .append(`${array} as ${typegen(node.expression.typehint)}\n`)
      .append(`${array} = `)
    generator.generateOne({ node: node.expression, definitions, snippet: setup })

    setup.append(`\nfor ${iname} = 0 to ${array}.length\n`)
    setup.append(`${node.identifier.value} as ${typegen(node.expression.typehint.value)}\n`)
    setup.append(`${node.identifier.value} = ${array}[${iname}]\n`)

    const bodySnippet = new Snippet()
    if (node.condition !== null) {
      bodySnippet.append('if ')
      generator.generateOne({ node: node.condition, definitions, snippet: bodySnippet })
      bodySnippet.append(`\n${name}.insert(`)
      generator.generateOne({ node: node.body, definitions, snippet: bodySnippet })
      bodySnippet.append(')\nendif\n')
    } else {
      bodySnippet.append(`${name}.insert(`)
      generator.generateOne({ node: node.body, definitions, snippet: bodySnippet })
      bodySnippet.append(')\n')
    }
    setup.append(bodySnippet).append(`next ${iname}\n`)

    snippet.prepend(setup).append(name)
  }
}

module.exports = ListComprehensionGenerator

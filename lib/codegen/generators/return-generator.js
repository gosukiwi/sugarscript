const lambdas = require('../lambdas')
const namegen = require('../name-generator')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

class ReturnGenerator {
  generate ({ node, generator, definitions, snippet }) {
    if (node.lambda) {
      snippet.append(`${lambdas.stackFor(node.typehint)}.insert(`)
      generator.generateOne({ node: node.value, definitions, snippet })
      snippet.append(')\nexitfunction\n')
      return
    }

    const setup = new Snippet()
    const name = namegen()
    setup
      .append(`${name} as ${typegen(node.typehint)}\n`)
      .append(`${name} = `)
    generator.generateOne({ node: node.value, definitions, snippet: setup })

    snippet.append(setup).append(`\nexitfunction ${name}\n`)
  }
}

module.exports = ReturnGenerator

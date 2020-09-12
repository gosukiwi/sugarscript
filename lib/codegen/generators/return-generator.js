const lambdas = require('../lambdas')

class ReturnGenerator {
  generate ({ node, generator, definitions, snippet }) {
    if (node.lambda) {
      snippet.append(`${lambdas.stackFor(node.typehint)}.insert(`)
      generator.generateOne({ node: node.value, definitions, snippet })
      snippet.append(')\nexitfunction\n')
      return
    }

    snippet.append('exitfunction ')
    generator.generateOne({ node: node.value, definitions, snippet })
    snippet.append('\n')
  }
}

module.exports = ReturnGenerator

const lambdas = require('../lambdas')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

class LambdaGenerator {
  generate ({ node, definitions, generator, snippet }) {
    lambdas.add(this.buildFunction({
      parameters: node.parameters,
      body: node.body,
      id: node.id,
      generator: generator,
      definitions: definitions
    }))

    snippet.append(node.id)
  }

  // private

  buildFunction ({ parameters, body, id, generator, definitions }) {
    const snippet = new Snippet()
    snippet.append(`function __SSINTERNAL_LAMBDA${id}()\n`)

    parameters.forEach((param, index) => {
      snippet.append(`${param.name} as ${typegen(param.typehint)}\n`)
      snippet.append(`${param.name} = ${lambdas.stackGet(param.typehint)}\n`)
      snippet.append(`${lambdas.stackPop(param.typehint)}\n`)
    })

    const context = definitions.lambdas[id].definitions
    body.forEach((node) => {
      generator.generateOne({ node, definitions: context, snippet })
      // snippet.append('\n')
    })

    snippet.append('endfunction\n\n')
    return snippet.toString()
  }
}

module.exports = LambdaGenerator

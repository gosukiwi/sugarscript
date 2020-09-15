const Snippet = require('../snippet')
const lambdas = require('../lambdas')
const typegen = require('../type-generator')
const namegen = require('../name-generator')

class LambdaCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    if (node.statement) {
      snippet = new Snippet()
    }

    const setup = new Snippet()
    node.args.forEach((node) => {
      setup.append(`${lambdas.stackFor(node.typehint)}.insert(`)
      generator.generateOne({ node: node, definitions, snippet: setup })
      setup.append(')\n')
    })
    setup.append('__SSINTERNAL_CALL_LAMBDA(')
    generator.generateOne({ node: node.name, definitions, snippet: setup })
    setup.append(')\n')
    // create temp to hold return value
    const tempname = namegen()
    setup
      .append(tempname)
      .append(' as ')
      .append(typegen(node.typehint))
      .append('\n')
    setup.append(`${tempname} = ${lambdas.stackGet(node.typehint)}\n`)
    setup.append(`${lambdas.stackPop(node.typehint)}\n`)

    // finally add to snippet
    snippet.prepend(setup)
    snippet.append(tempname)

    if (node.statement) {
      outer.append(snippet).append('\n')
    }
  }
}

module.exports = LambdaCallGenerator

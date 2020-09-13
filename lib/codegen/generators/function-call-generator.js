const namegen = require('../name-generator')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

class FunctionCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    if (node.statement) {
      snippet = new Snippet()
    }

    const paramsSnippet = new Snippet()
    const params = definitions.getFunction(node.name).definitions.parameters
    const names = Object.keys(params).map((key, index) => {
      const param = node.args[index] || params[key].default
      if (param === null) throw new Error('This shouldnt happen! Typechecker bug')

      const name = namegen()
      paramsSnippet
        .append(name)
        .append(' as ')
        .append(typegen(params[key].type))
        .append(' = ')
      generator.generateOne({ node: param, definitions, snippet: paramsSnippet })
      paramsSnippet.append('\n')

      return name
    })
    snippet.prepend(paramsSnippet)

    snippet
      .append(`${node.name}(`)
      .append(names.join(', '))
      .append(')')

    if (node.statement) {
      outer.append(snippet)
    }
    // return snippet.toString()
  }
}

module.exports = FunctionCallGenerator

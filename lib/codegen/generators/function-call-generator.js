const namegen = require('../name-generator')
const typegen = require('../type-generator')

class FunctionCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const params = definitions.getFunction(node.name).definitions.parameters
    const names = Object.keys(params).map((key, index) => {
      const param = node.args[index] || params[key].default
      if (param === null) throw new Error('This shouldnt happen! Typechecker bug')

      const name = namegen()
      snippet
        .append(name)
        .append(' as ')
        .append(typegen(params[key].type))
        .append(' = ')
      generator.generateOne({ node: param, definitions, snippet })
      snippet.append('\n')

      return name
    })

    snippet
      .append(`${node.name}(`)
      .append(names.join(', '))
      .append(')')

    return snippet.toString()
  }
}

module.exports = FunctionCallGenerator

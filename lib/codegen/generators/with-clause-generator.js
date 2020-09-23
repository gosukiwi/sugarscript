const Snippet = require('../snippet')

class WithClauseGenerator {
  generate ({ node, generator, definitions, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet
      .append(`if ${node.unionName}.__type = '${node.typehint.value}'\n`)
      .append(`${node.name.value} as ${node.typehint.value}\n`)
      .append(`${node.name.value} = ${node.unionName}.__${node.typehint.value}\n`)
    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    snippet.append('endif\n')

    outer.append(snippet)
  }
}

module.exports = WithClauseGenerator

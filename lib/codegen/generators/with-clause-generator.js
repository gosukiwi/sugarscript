const Snippet = require('../snippet')
const namegen = require('../name-generator')

class WithClauseGenerator {
  generate ({ node, generator, definitions, snippet }) {
    const outer = snippet
    snippet = new Snippet()
    const name = namegen()

    snippet
      .append(`case '${node.typehint.value}':\n`)
      .append(`${name} as ${node.typehint.value}\n`)
      .append(`${name} = ${node.unionName}.__${node.typehint.value}\n`)

    const bodySnippet = new Snippet()
    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet: bodySnippet }))

    const regex = new RegExp(String.raw`\b${node.name.value}\b`, 'g')
    snippet.append(bodySnippet.toString().replace(regex, name))
    snippet.append('endcase\n')

    outer.append(snippet)
  }
}

module.exports = WithClauseGenerator

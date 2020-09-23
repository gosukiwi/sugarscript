const Snippet = require('../snippet')
const namegen = require('../name-generator')

class WithGenerator {
  generate ({ node, generator, definitions, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    const name = namegen()
    snippet.append(`${name} as ${node.name.typehint.name}\n`)
    snippet.append(`${name} = `)
    generator.generateOne({ node: node.name, definitions, snippet })
    snippet.append('\n')
    node.clauses.forEach((clause) => {
      clause.unionName = name
      generator.generateOne({ node: clause, definitions, snippet })
    })

    outer.append(snippet)
  }
}

module.exports = WithGenerator

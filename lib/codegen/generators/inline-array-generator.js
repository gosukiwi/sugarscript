const TypeGenerator = require('../type-generator')
const namegen = require('../name-generator')
const Snippet = require('../snippet')

class InlineArrayGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const typeGenerator = new TypeGenerator()
    const name = namegen()

    const header = new Snippet()
    header.append(`${name} as ${typeGenerator.generate(node._type)}\n`)
    node.elements.forEach((node) => {
      header.append(`${name}.insert(`)
      generator.generateOne({ node, definitions, snippet: header })
      header.append(')\n')
    })

    snippet.prepend(header)
    snippet.append(name)
  }
}

module.exports = InlineArrayGenerator

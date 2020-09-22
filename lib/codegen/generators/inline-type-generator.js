const Snippet = require('../snippet')
const namegen = require('../name-generator')

class InlineTypeGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const name = namegen()
    const setup = new Snippet()

    setup.append(`${name} as ${node.typeName.value}\n`)
    node.fields.forEach((field) => {
      setup.append(`${name}.${field.name.value} = `)
      generator.generateOne({ node: field.value, snippet: setup, definitions })
      setup.append('\n')
    })

    snippet.prepend(setup).append(name)
  }
}

module.exports = InlineTypeGenerator

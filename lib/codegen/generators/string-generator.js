const Snippet = require('../snippet')
const namegen = require('../name-generator')

class StringGenerator {
  generate ({ node, snippet, generator, definitions }) {
    let value = node.value
    // because we always use single quotes, replace the escaped double quote with just double quote
    value = value.replace(/\\"/g, '"')
    // and replace the single quote with an escaped single quote
    value = value.replace(/'/g, "\\'")

    node.interpolations.map((interpolation) => {
      const setup = new Snippet()
      const name = namegen()

      setup.append(`${name} as string\n${name} = `)
      if (interpolation.type.isNumber()) {
        setup.append('Str(')
        generator.generateOne({ node: interpolation.node, definitions, snippet: setup })
        setup.append(')')
      } else {
        generator.generateOne({ node: interpolation.node, definitions, snippet: setup })
      }

      snippet.prepend(setup + '\n')
      return name
      // return snippet.toString()
    }).forEach((replacement, index) => {
      value = value.replace(`$${index + 1}`, `' + ${replacement} + '`)
    })

    snippet.append(`'${value}'`)
  }
}

module.exports = StringGenerator

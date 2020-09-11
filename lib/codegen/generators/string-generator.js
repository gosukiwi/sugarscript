const Snippet = require('../snippet')

class StringGenerator {
  generate ({ node, snippet, generator, definitions }) {
    let value = node.value
    node.interpolations.map((interpolation) => {
      const snippet = new Snippet()
      if (interpolation.type.isNumber()) {
        snippet.append('Str(')
        generator.generateOne({ node: interpolation.node, definitions, snippet })
        snippet.append(')')
      } else {
        generator.generateOne({ node: interpolation.node, definitions, snippet })
      }

      return snippet.toString()
    }).forEach((replacement, index) => {
      value = value.replace(`$${index + 1}`, `" + ${replacement} + "`)
    })

    snippet.append(`"${value}"`)
  }
}

module.exports = StringGenerator

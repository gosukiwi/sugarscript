const typegen = require('../type-generator')
const Snippet = require('../snippet')

class LetGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append(`// ${generator.file}, line ${node.name.position.row}\n`)
    if (node.global) snippet.append('global ')
    snippet
      .append(node.name.value)
      .append(' as ')
      .append(typegen(node.typehint))
      .append('\n')

    if (node.value) {
      const isUnion = node.typehint.is('UDT') && definitions.getType(node.typehint.value).isUnion()
      if (isUnion) {
        this.generateUnion({ generator, node, definitions, snippet })
      } else {
        snippet.append(node.name.value).append(' = ')
        generator.generateOne({ node: node.value, definitions, snippet })
        snippet.append('\n')
      }
    }

    outer.append(snippet)
  }

  // private

  generateUnion ({ generator, node, definitions, snippet }) {
    let type = null
    if (node.value.type === 'INLINE_TYPE') {
      type = node.value.typeName.value
    } else if (node.value.type === 'QUERY') {
      type = node.value.typehint.value
    } else {
      throw new Error('Invalid type')
    }

    snippet.append(`${node.name.value}.__${type} = `)
    generator.generateOne({ node: node.value, definitions, snippet })
    snippet.append('\n').append(`${node.name.value}.__type = '${type}'\n`)
  }
}

module.exports = LetGenerator

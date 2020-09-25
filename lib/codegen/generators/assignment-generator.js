const Snippet = require('../snippet')

class AssignmentGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()
    snippet.append(`// ${generator.file}, line ${node.lhs.position.row}\n`)

    const isUnion = node.lhs.typehint.is('UDT') && definitions.getType(node.lhs.typehint.value).isUnion()
    if (isUnion) {
      this.generateUnion({ generator, node, definitions, snippet })
    } else {
      this.generateRegular({ generator, node, definitions, snippet })
    }

    outer.append(snippet)
  }

  // private

  generateRegular ({ generator, node, definitions, snippet }) {
    generator.generateOne({ node: node.lhs, definitions, snippet })
    snippet.append(' = ')
    generator.generateOne({ node: node.rhs, definitions, snippet })
    snippet.append('\n')
  }

  generateUnion ({ generator, node, definitions, snippet }) {
    generator.generateOne({ node: node.lhs, definitions, snippet })
    snippet.append(`.__${node.rhs.typeName.value} = `)
    generator.generateOne({ node: node.rhs, definitions, snippet })
    snippet.append('\n')

    generator.generateOne({ node: node.lhs, definitions, snippet })
    snippet.append(`.__type = '${node.rhs.typeName.value}'\n`)
  }
}

module.exports = AssignmentGenerator

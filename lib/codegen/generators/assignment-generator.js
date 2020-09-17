const Snippet = require('../snippet')

class AssignmentGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append(`// ${generator.file}, line ${node.lhs.position.row}\n`)
    generator.generateOne({ node: node.lhs, definitions, snippet })
    snippet.append(' = ')
    generator.generateOne({ node: node.rhs, definitions, snippet })
    snippet.append('\n')

    outer.append(snippet)
  }
}

module.exports = AssignmentGenerator

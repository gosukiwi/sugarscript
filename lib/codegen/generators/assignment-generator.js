class AssignmentGenerator {
  generate ({ node, definitions, generator, snippet }) {
    generator.generateOne({ node: node.lhs, definitions, snippet })
    snippet.append(' = ')
    generator.generateOne({ node: node.rhs, definitions, snippet })
    snippet.append('\n')
  }
}

module.exports = AssignmentGenerator

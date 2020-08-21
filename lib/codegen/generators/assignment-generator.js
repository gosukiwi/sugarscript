class AssignmentGenerator {
  generate ({ node, definitions, generator }) {
    return `
${generator.generateOne({ node: node.lhs, definitions })} = ${generator.generateOne({ node: node.rhs, definitions })}
    `.trim()
  }

  // private

  generateDefinition (node, definitions) {
    // TODO
    // if (definitions.functions[node.name].definitions.variables[variableName]) ...
    // don't add `a as integer`
    // else
    // add `a as integer`
  }
}

module.exports = AssignmentGenerator

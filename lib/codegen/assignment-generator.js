class AssignmentGenerator {
  generate(node, definitions, generator) {
    return `
${this.generateDefinition(node, definitions)}
${generator.generateOne(node.lhs, definitions)} = ${generator.generateOne(node.rhs, definitions)}
    `
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

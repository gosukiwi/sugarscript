class ReturnGenerator {
  generate ({ node, generator, definitions }) {
    return `exitfunction ${generator.generateOne({ node: node.value, definitions })}`
  }
}

module.exports = ReturnGenerator

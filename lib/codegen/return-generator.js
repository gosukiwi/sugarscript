class ReturnGenerator {
  generate (node, definitions, generator) {
    return `exitfunction ${generator.generateOne(node.value)}`
  }
}

module.exports = ReturnGenerator

class StringGenerator {
  generate (node) {
    return `"${node.value}"`
  }
}

module.exports = StringGenerator

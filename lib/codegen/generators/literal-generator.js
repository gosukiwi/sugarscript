class LiteralGenerator {
  generate ({ node }) {
    return `${node.value}`
  }
}

module.exports = LiteralGenerator

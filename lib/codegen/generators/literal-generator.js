class LiteralGenerator {
  generate ({ node, snippet }) {
    snippet.append(`${node.value}`)
  }
}

module.exports = LiteralGenerator

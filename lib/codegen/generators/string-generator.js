class StringGenerator {
  generate ({ node, snippet }) {
    snippet.append(`"${node.value}"`)
  }
}

module.exports = StringGenerator

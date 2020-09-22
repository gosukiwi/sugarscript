class BinaryGenerator {
  generate ({ node, snippet }) {
    snippet.append(`%${node.value.substring(2)}`)
  }
}

module.exports = BinaryGenerator

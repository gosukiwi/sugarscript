class SQStringGenerator {
  generate ({ node, snippet, generator, definitions }) {
    const value = node.value // TODO: handle escaped quotes
    snippet.append(`'${value}'`)
  }
}

module.exports = SQStringGenerator

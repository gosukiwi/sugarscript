class SQStringGenerator {
  generate ({ node, snippet, generator, definitions }) {
    const value = node.value.replace(/\\"/g, '"')
    snippet.append(`'${value}'`)
  }
}

module.exports = SQStringGenerator

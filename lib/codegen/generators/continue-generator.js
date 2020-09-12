class ContinueGenerator {
  generate ({ snippet }) {
    snippet.append('continue\n')
  }
}

module.exports = ContinueGenerator

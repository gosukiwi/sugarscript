class BreakGenerator {
  generate ({ snippet }) {
    snippet.append('exit\n')
  }
}

module.exports = BreakGenerator

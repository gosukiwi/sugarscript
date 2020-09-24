const builder = require('../types/builder')

class WithElseClauseChecker {
  check ({ node, checker, definitions }) {
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    return builder.void()
  }
}

module.exports = WithElseClauseChecker

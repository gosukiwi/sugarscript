const builder = require('../types/builder')

class WhileChecker {
  check ({ node, checker, definitions }) {
    checker.checkOne({ node: node.condition, definitions })
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    return builder.void()
  }
}

module.exports = WhileChecker

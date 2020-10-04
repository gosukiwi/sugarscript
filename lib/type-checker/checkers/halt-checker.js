const builder = require('../types/builder')

class HaltChecker {
  check ({ node, checker, definitions }) {
    checker.checkOne({ node: node.message, definitions })
    return builder.void()
  }
}

module.exports = HaltChecker

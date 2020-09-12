const builder = require('../types/builder')

class WhileChecker {
  check ({ node, checker, definitions }) {
    definitions.enter('loop')
    checker.checkOne({ node: node.condition, definitions })
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    definitions.leave()
    return builder.void()
  }
}

module.exports = WhileChecker

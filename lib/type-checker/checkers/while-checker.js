const builder = require('../types/builder')
const scope = require('../scope')

class WhileChecker {
  check ({ node, checker, definitions }) {
    scope.enter('loop')
    checker.checkOne({ node: node.condition, definitions })
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    scope.leave()
    return builder.void()
  }
}

module.exports = WhileChecker

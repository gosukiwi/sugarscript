const builder = require('../types/builder')
const scope = require('../scope')

class WhileChecker {
  check ({ node, checker, definitions }) {
    scope.enter('loop')
    const type = checker.checkOne({ node: node.condition, definitions })
    if (type.isnt('INTEGER')) throw new Error(`While condition must be INTEGER, got ${type} (${checker.file} at line ${node.condition.position.row - 1})`)

    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    scope.leave()
    return builder.void()
  }
}

module.exports = WhileChecker

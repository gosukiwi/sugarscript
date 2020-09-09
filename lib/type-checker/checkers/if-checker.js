const builder = require('../types/builder')

class IfChecker {
  check ({ node, definitions, checker }) {
    if (node.condition) checker.checkOne({ node: node.condition, definitions })
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    if (node.tail) checker.checkOne({ node: node.tail, definitions })

    return builder.void()
  }
}

module.exports = IfChecker

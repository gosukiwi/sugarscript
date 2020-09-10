const builder = require('../types/builder')

class IfChecker {
  check ({ node, definitions, checker }) {
    if (node.condition) {
      const condition = checker.checkOne({ node: node.condition, definitions })
      if (!condition.is('INTEGER')) throw new Error(`Conditions can only be INTEGER, ${condition} provided.`)
    }
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    if (node.tail) checker.checkOne({ node: node.tail, definitions })

    return builder.void()
  }
}

module.exports = IfChecker

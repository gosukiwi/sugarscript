class ParenthesizedExpressionChecker {
  check ({ node, definitions, checker }) {
    return checker.checkOne({ node: node.expression, definitions })
  }
}

module.exports = ParenthesizedExpressionChecker

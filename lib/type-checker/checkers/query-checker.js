class QueryChecker {
  check ({ node, definitions, checker }) {
    const checkOne = (node) => checker.checkOne({ node, definitions })
    return definitions.getQueryType(node.parts, checkOne)
  }
}

module.exports = QueryChecker

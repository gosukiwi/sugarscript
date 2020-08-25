class QueryChecker {
  check ({ node, definitions }) {
    return definitions.getQueryType(node.parts)
  }
}

module.exports = QueryChecker

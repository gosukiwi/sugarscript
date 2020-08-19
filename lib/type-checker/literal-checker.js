class LiteralChecker {
  check (node, checker) {
    return { name: node.type, type: node.type }
  }
}

module.exports = LiteralChecker

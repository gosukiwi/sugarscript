class ReturnChecker {
  check (node, checker) {
    return { name: 'RETURN', type: checker.checkOne(node.value) }
  }
}

module.exports = ReturnChecker

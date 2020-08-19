class ReturnChecker {
  check (node, checker, definitions) {
    return { name: 'RETURN', type: checker.checkOne(node.value, definitions).type }
  }
}

module.exports = ReturnChecker

class PrimitiveChecker { // This is called only with float, integer and string
  check (node, checker) {
    return { type: node.type, name: 'LITERAL' }
  }
}

module.exports = PrimitiveChecker

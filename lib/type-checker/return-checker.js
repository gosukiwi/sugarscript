const Definition = require('./definitions/definition')

class ReturnChecker {
  check ({ node, checker, definitions }) {
    const type = checker.checkOne({ node: node.value, definitions })
    definitions.add(new Definition({ name: 'RETURN', type: type }))

    return type
  }
}

module.exports = ReturnChecker

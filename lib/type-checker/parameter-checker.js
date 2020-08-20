const asParser = require('./util/as-parser')

class ParameterChecker {
  check (node) {
    return {
      name: 'PARAMETER',
      value: node.name,
      type: asParser(node.as, node.array),
      ref: node.ref,
      array: node.array
    }
  }
}

module.exports = ParameterChecker

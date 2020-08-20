const asParser = require('./util/as-parser')

class LetChecker {
  check (node, checker, definitions) {
    return { name: 'LET', identifier: node.name, type: asParser(node.value, node.array) }
  }
}

module.exports = LetChecker

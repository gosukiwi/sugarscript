const Type = require('../types/type')

class UnopChecker {
  check ({ node, checker, definitions }) {
    const expression = checker.checkOne({ node: node.expression, definitions })
    if (node.name === 'NOT') {
      if (!expression.is('INTEGER')) throw new Error(`Can only use 'NOT' with INTEGER (${checker.file} at line ${node.position.row})`)
      return new Type('INTEGER')
    }

    throw new Error(`Invalid UNOP: ${node.name}`)
  }
}

module.exports = UnopChecker

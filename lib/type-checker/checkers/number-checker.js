const Type = require('../types/type')

class NumberChecker {
  check ({ node }) {
    if (node.value % 1 === 0) return new Type('INTEGER')
    return new Type('FLOAT')
  }
}

module.exports = NumberChecker

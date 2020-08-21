const Type = require('./types/type')

class PrimitiveChecker { // This is called only with float, integer and string
  check ({ node }) {
    return new Type(node.type)
  }
}

module.exports = PrimitiveChecker

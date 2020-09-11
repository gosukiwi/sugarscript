const Definition = require('../definitions/definition')
const Type = require('../types/type')

class ReturnChecker {
  check ({ node, checker, definitions }) {
    if (definitions.isRoot()) throw new Error('Return can only be called inside functions')

    const type = node.value === null ? new Type('VOID') : checker.checkOne({ node: node.value, definitions })
    definitions.add(new Definition({ name: 'RETURN', type }))

    return type
  }
}

module.exports = ReturnChecker

const Definition = require('../definitions/definition')
const Type = require('../types/type')
const scope = require('../scope')

class ReturnChecker {
  check ({ node, checker, definitions }) {
    if (!scope.isInside('function')) throw new Error('Return can only be called inside functions')

    const type = node.value === null ? new Type('VOID') : checker.checkOne({ node: node.value, definitions })
    definitions.add(new Definition({ name: 'RETURN', type }))

    return type
  }
}

module.exports = ReturnChecker

const Definition = require('../definitions/definition')
const Type = require('../types/type')
const scope = require('../scope')

class ReturnChecker {
  check ({ node, checker, definitions }) {
    if (!scope.isInside('function') && !scope.isInside('lambda')) throw new Error('Return can only be called inside functions')

    if (scope.isInside('lambda')) node.lambda = true
    const type = node.value === null ? new Type('VOID') : checker.checkOne({ node: node.value, definitions })
    node.typehint = type
    definitions.add(new Definition({ name: 'RETURN', type }))

    return type
  }
}

module.exports = ReturnChecker

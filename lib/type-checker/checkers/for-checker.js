const builder = require('../types/builder')
const IdentifierDefinition = require('../definitions/identifier-definition')
const Type = require('../types/type')

class ForChecker {
  check ({ node, checker, definitions }) {
    definitions.enter('loop')
    if (definitions.getVariable(node.variable, 'local')) throw new Error(`Already defined ${node.variable} in this scope`)

    if (!checker.checkOne({ node: node.from, definitions }).is('INTEGER')) {
      throw new Error('For "from" value must be INTEGER')
    }

    if (!checker.checkOne({ node: node.to, definitions }).is('INTEGER')) {
      throw new Error('For "to" value must be INTEGER')
    }

    if (node.step !== null && !checker.checkOne({ node: node.step, definitions }).is('INTEGER')) {
      throw new Error('For "step" value must be INTEGER')
    }

    definitions.add(new IdentifierDefinition({ identifier: node.variable, global: false, type: new Type('INTEGER') }))
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    definitions.leave()
    return builder.void()
  }
}

module.exports = ForChecker

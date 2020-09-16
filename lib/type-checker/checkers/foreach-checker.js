const scope = require('../scope')
const builder = require('../types/builder')
const IdentifierDefinition = require('../definitions/identifier-definition')

class ForeachChecker {
  check ({ node, checker, definitions }) {
    scope.enter('loop')
    if (definitions.getVariable(node.variable, 'local')) throw new Error(`Already defined ${node.variable} in this scope (${checker.file} at line ${node.expression.position.row})`)

    const expressionType = checker.checkOne({ node: node.expression, definitions })
    if (!expressionType.is('ARRAY')) {
      throw new Error(`For..In expression must be an ARRAY (${checker.file} at line ${node.expression.row})`)
    }

    definitions.add(new IdentifierDefinition({ identifier: node.variable, global: false, type: expressionType.value }))
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    node.typehint = expressionType // pass along to compiler
    scope.leave()
    return builder.void()
  }
}

module.exports = ForeachChecker

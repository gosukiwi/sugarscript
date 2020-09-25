const IdentifierDefinition = require('../definitions/identifier-definition')
const Array = require('../types/array')

class ListComprehensionChecker {
  check ({ node, definitions, checker }) {
    const expression = checker.checkOne({ node: node.expression, definitions })
    if (expression.isnt('ARRAY')) throw new Error(`Expression must be array (${checker.file} at line ${node.expression.position.row})`)

    if (definitions.getVariable(node.identifier.value, 'local') !== null) {
      throw new Error(`Variable '${node.identifier.value}' already defined (${checker.file} at line ${node.identifier.position.row})`)
    }
    definitions.add(new IdentifierDefinition({ identifier: node.identifier.value, global: false, type: expression.value }))

    const body = checker.checkOne({ node: node.body, definitions })
    if (body.is('VOID')) throw new Error(`Body cannot return void (${checker.file} at line ${node.expression.position.row})`)
    if (node.condition !== null) checker.checkOne({ node: node.condition, definitions })

    node.expression.typehint = expression
    node.body.typehint = body
    return new Array({ value: body })
  }
}

module.exports = ListComprehensionChecker

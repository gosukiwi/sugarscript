const IdentifierDefinition = require('../definitions/identifier-definition')

class ListComprehensionChecker {
  check ({ node, definitions, checker }) {
    const expression = checker.checkOne({ node: node.expression, definitions })
    if (expression.isnt('ARRAY')) throw new Error(`Expression must be array (${checker.file} at line ${node.expression.position.row})`)

    definitions.add(new IdentifierDefinition({ identifier: node.identifier.value, global: false, type: expression.value }))
    if (checker.checkOne({ node: node.body, definitions }).is('VOID')) throw new Error(`Body cannot return void (${checker.file} at line ${node.expression.position.row})`)
    if (node.condition !== null) checker.checkOne({ node: node.condition, definitions })

    node.typehint = expression
    return expression
  }
}

module.exports = ListComprehensionChecker

const IdentifierDefinition = require('../definitions/identifier-definition')
const builder = require('../types/builder')

class WithClauseChecker {
  check ({ node, checker, definitions }) {
    definitions.add(new IdentifierDefinition({ identifier: node.name.value, global: false, type: node.typehint }))
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    return builder.void()
  }
}

module.exports = WithClauseChecker

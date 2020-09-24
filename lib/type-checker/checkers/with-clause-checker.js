const IdentifierDefinition = require('../definitions/identifier-definition')
const builder = require('../types/builder')

class WithClauseChecker {
  check ({ node, checker, definitions }) {
    if (definitions.getVariable(node.name.value) !== null) {
      throw new Error(`Variable '${node.name.value}' already exists (${checker.file} at line ${node.name.position.row})`)
    }

    definitions.add(new IdentifierDefinition({ identifier: node.name.value, global: false, type: node.typehint }))
    node.body.forEach((node) => checker.checkOne({ node, definitions }))
    definitions.removeVariable(node.name.value)
    return builder.void()
  }
}

module.exports = WithClauseChecker

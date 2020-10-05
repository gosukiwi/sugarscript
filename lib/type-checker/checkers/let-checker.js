const IdentifierDefinition = require('../definitions/identifier-definition')
const validate = require('../validate-udt')

class LetChecker {
  check ({ node, definitions, checker }) {
    const name = node.name.value
    if (definitions.getVariable(name, 'local')) throw new Error(`Already defined ${name} in this scope (${checker.file} at line ${node.name.position.row})`)

    // Global variables work as if they were defined in the global scope.
    // If there's a non-global in the global scope, it will complain.
    if (node.global && definitions.root().getVariable(name)) throw new Error(`Already defined "${name}" in global scope (${checker.file} at line ${node.name.position.row})`)

    const valueType = node.value ? checker.checkOne({ node: node.value, definitions }) : null
    const type = node.typehint || valueType
    if (type.is('VOID')) throw new Error(`Cannot assign to void (${checker.file} at line ${node.name.position.row})`)

    node.typehint = type // pass along to compiler

    try {
      validate(type, definitions)
    } catch (err) {
      throw new Error(`${err.message} (${checker.file} at line ${node.name.position.row})`)
    }

    if (valueType !== null && node.typehint !== null && !this.assignable(node.typehint, valueType, definitions)) {
      throw new Error(`Cannot assign ${valueType} to ${node.typehint} (${checker.file} at line ${node.name.position.row})`)
    }

    if (node.global) {
      definitions.root().add(new IdentifierDefinition({ identifier: name, global: node.global, type }))
    } else {
      definitions.add(new IdentifierDefinition({ identifier: name, global: node.global, type }))
    }

    return type
  }

  // private

  assignable (lhs, rhs, definitions) {
    if (lhs.is('UDT') && rhs.is('UDT')) return lhs.assignable(rhs, definitions)
    return lhs.equals(rhs)
  }
}

module.exports = LetChecker

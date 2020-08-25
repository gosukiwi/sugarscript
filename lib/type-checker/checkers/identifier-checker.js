class IdentifierChecker {
  check ({ node, definitions }) {
    const identifier = definitions.getVariable(node.value)
    if (identifier === null) throw new Error(`Could not find identifier '${node.value}'`)
    return identifier.type
  }
}

module.exports = IdentifierChecker

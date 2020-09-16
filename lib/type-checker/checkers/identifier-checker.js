class IdentifierChecker {
  check ({ node, definitions, checker }) {
    const identifier = definitions.getVariable(node.value)
    if (identifier === null) throw new Error(`Could not find identifier '${node.value}' (${checker.file} at line ${node.position.row})`)
    return identifier.type
  }
}

module.exports = IdentifierChecker

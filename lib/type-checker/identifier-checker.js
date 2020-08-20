class IdentifierChecker {
  check (node, checker, definitions) {
    const identifierType = definitions.getIdentifier(node.value)
    if (identifierType === null) throw new Error(`Could not find identifier '${node.value}'`)
    return identifierType
  }
}

module.exports = IdentifierChecker

class ArrayAccessChecker {
  check (node, generator, definitions) {
    const array = definitions.getIdentifier(node.identifier.value)
    if (array === null) throw new Error(`Could not find: '${node.identifier.value}'`)
    if (array.type.isnt('ARRAY')) throw new Error(`Cannot use array-access on a type other than an array: '${node.identifier.value}' is '${array.type}'`)

    return array.type.value
  }
}

module.exports = ArrayAccessChecker

class ArrayAccessChecker {
  check (node, generator, definitions) {
    const array = definitions.getVariable(node.identifier.value)
    if (array === null || array.type.type !== 'ARRAY') throw new Error(`Could not find array '${node.identifier.value}'`)

    return { type: array.type.value, name: 'LITERAL' }
  }
}

module.exports = ArrayAccessChecker

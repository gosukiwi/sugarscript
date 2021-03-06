class ArrayAccessChecker {
  check ({ node, definitions, checker }) {
    const array = definitions.getVariable(node.identifier.value)
    if (array === null) throw new Error(`Could not find: '${node.identifier.value}' (${checker.file} at line ${node.position.row})`)
    if (array.type.isnt('ARRAY')) throw new Error(`Cannot use array-access on a type other than an array: '${node.identifier.value}' is '${array.type}' (${checker.file} at line ${node.position.row})`)

    return array.type.value
  }
}

module.exports = ArrayAccessChecker

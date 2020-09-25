function validateUnion (type, union) {
  if (union === null) throw new Error(`Could not find UNION ${type.name}`)
}

module.exports = function validate (type, definitions) {
  if (type.is('UDT')) {
    const definition = definitions.getType(type.value)
    if (definition === null) throw new Error(`Could not find type: '${type}'`)
    if (definition.isUnion()) validateUnion(type, definition)
    return
  }

  if (type.is('ARRAY')) validate(type.value, definitions)
}

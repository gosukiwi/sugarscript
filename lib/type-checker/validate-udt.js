module.exports = function validate (type, definitions) {
  if (type.is('UDT') && !definitions.hasType(type.value)) throw new Error(`Could not find type: '${type}'`)
  if (type.is('ARRAY')) validate(type.value, definitions)
}

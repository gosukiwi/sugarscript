function validateUnion (type, definitions) {
  const union = definitions.getUnion(type.name)
  if (union === null) throw new Error(`Could not find UNION ${type.name}`)
  if (union.udts.length !== type.udts.length) throw new Error(`Invalid types, union ${type.name} expects (${union.udts.join(', ')})`)

  type.udts.forEach((udt) => {
    if (!definitions.hasType(udt)) throw new Error(`Could not find UDT '${udt}' `)
    if (!union.udts.includes(udt)) throw new Error(`Union ${type.name} does not contain ${udt}`)
  })
}

module.exports = function validate (type, definitions) {
  if (type.is('UNION')) return validateUnion(type, definitions)
  if (type.is('UDT') && !definitions.hasType(type.value)) throw new Error(`Could not find type: '${type}'`)
  if (type.is('ARRAY')) validate(type.value, definitions)
}

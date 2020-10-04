function generateArray (type, dimensions) {
  if (type.value.is('ARRAY')) {
    return generateArray(type.value, dimensions + 1)
  }

  let result = ''
  for (let i = 0; i < dimensions; i++) {
    result += '-1'
    if (i !== dimensions - 1) result += ', '
  }

  return `${generate(type.value)}[${result}]`
}

function generate (type) {
  if (type.is('VOID')) throw new Error("Can't generate output for VOID type")
  if (type.is('STRING')) return 'string'
  if (type.is('INTEGER')) return 'integer'
  if (type.is('FLOAT')) return 'float'
  if (type.is('UDT')) return type.value
  if (type.is('UNION')) return type.name
  if (type.is('ARRAY')) return generateArray(type, 1)

  throw new Error(`Invalid type: '${type}'`)
}

module.exports = generate

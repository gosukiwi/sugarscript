module.exports = function (type, array) {
  if (+array > 0) return { type: 'ARRAY', value: parse(type), dimensions: array, name: 'LITERAL' }

  return parse(type)
}

function parse (type) {
  if (!type) return { type: 'VOID', name: 'LITERAL' }

  switch (type) {
    case 'string':
      return { type: 'STRING', name: 'LITERAL' }
    case 'float':
      return { type: 'FLOAT', name: 'LITERAL' }
    case 'integer':
      return { type: 'INTEGER', name: 'LITERAL' }
    default:
      return { type: 'UDT', value: type, name: 'LITERAL' }
  }
}

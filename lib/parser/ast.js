const Type = require('../type-checker/types/type')
const ArrayType = require('../type-checker/types/array')
const UDTType = require('../type-checker/types/udt')

module.exports = {
  identifier: (value) => {
    return { type: 'IDENTIFIER', value }
  },

  assignment: (lhs, rhs) => {
    return { type: 'ASSIGNMENT', lhs, rhs }
  },

  function: (name, typehint, params, body) => {
    return {
      type: 'FUNCTION_DEFINITION',
      name: name,
      params: params,
      returnType: typehint || new Type('VOID'),
      body
    }
  },

  type: (name) => {
    return new Type(name)
  },

  arrayType: (of) => {
    return new ArrayType({ value: of })
  },

  udtType: (value) => {
    return new UDTType(value)
  },

  parameter: (name, typehint, ref) => {
    return { type: 'PARAMETER', name, typehint, ref: !!ref }
  },

  functionCall: (name, args) => {
    return { type: 'FUNCTION_CALL', name, args }
  },

  pluginCall: (plugin, func, args) => {
    return { type: 'PLUGIN_CALL', plugin, func, args }
  },

  string: (value) => {
    return { type: 'STRING', value }
  },

  number: (value) => {
    return { type: 'NUMBER', value }
  },

  let: (name, typehint, value) => {
    return { type: 'LET', name, typehint, value, global: false }
  },

  return: (value) => {
    return { type: 'RETURN', value }
  },

  query: (parts) => {
    return { type: 'QUERY', parts }
  },

  arrayAccess: (identifier, index) => {
    return { type: 'ARRAY_ACCESS', identifier, index }
  },

  inlineArray: (elements) => {
    return { type: 'INLINE_ARRAY', elements: elements }
  },

  typeDefinition: (name, fields) => {
    return { type: 'TYPE_DEFINITION', name, fields }
  },

  field: (name, typehint) => {
    return { type: 'FIELD', name, typehint }
  },

  if_node: (condition, body, tail = null) => {
    return { type: 'IF', condition, body, tail }
  }
}

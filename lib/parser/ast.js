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

  parameter: (name, typehint, ref, defaultValue) => {
    return { type: 'PARAMETER', name, typehint, ref: !!ref, default: defaultValue || null }
  },

  functionCall: (name, args) => {
    return { type: 'FUNCTION_CALL', name, args }
  },

  pluginCall: (plugin, func, args) => {
    return { type: 'PLUGIN_CALL', plugin, func, args }
  },

  string: (value) => {
    const interpolations = []
    value = value.replace(/#{.*?}/, (match) => {
      interpolations.push(match.substring(2, match.length - 1))
      return `$${interpolations.length}`
    })

    return { type: 'STRING', value, interpolations }
  },

  sqstring: (value) => {
    return { type: 'SQSTRING', value }
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

  inlineArray: (elements, typehint) => {
    return { type: 'INLINE_ARRAY', elements: elements, typehint: typehint || null }
  },

  typeDefinition: (name, fields) => {
    return { type: 'TYPE_DEFINITION', name, fields }
  },

  field: (name, typehint) => {
    return { type: 'FIELD', name, typehint }
  },

  if_node: (condition, body, tail = null) => {
    return { type: 'IF', condition, body, tail }
  },

  elif_node: (condition, body, tail = null) => {
    return { type: 'ELIF', condition, body, tail }
  },

  parenthesizedExpression: (expression) => {
    return { type: 'PARENTHESIZED_EXPRESSION', expression }
  },

  binop: (lhs, rhs, name) => {
    return { type: 'BINOP', lhs, rhs, name }
  },

  unop: (expression, name) => {
    return { type: 'UNOP', expression, name }
  },

  while: (condition, body) => {
    return { type: 'WHILE', condition, body }
  }
}

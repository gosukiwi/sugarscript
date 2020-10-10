const Type = require('../type-checker/types/type')
const ArrayType = require('../type-checker/types/array')
const UDTType = require('../type-checker/types/udt')
const lexer = require('./lexer')
const _ = require('lodash')

const generator = {
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

  lambdaCall: (name, args, typehint) => {
    return { type: 'LAMBDA_CALL', name: args.shift(), args, typehint }
  },

  pluginCall: (plugin, func, args, typehint) => {
    return { type: 'PLUGIN_CALL', plugin, func, args, typehint }
  },

  string: (value) => {
    const interpolations = []
    value = value.replace(/#{.*?}/g, (match) => {
      interpolations.push(match.substring(2, match.length - 1))
      return `$${interpolations.length}`
    })

    if (interpolations.length === 0) return { type: 'SQSTRING', value: value.replace(/'/g, "\\'") }
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

  unionDefinition: (name, types) => {
    return { type: 'UNION_DEFINITION', name, types }
  },

  field: (name, typehint) => {
    return { type: 'FIELD', name, typehint }
  },

  ifNode: (condition, body, tail = null) => {
    return { type: 'IF', condition, body, tail }
  },

  unlessNode: (condition, body, tail = null) => {
    condition = { type: 'UNOP', expression: condition, name: 'NOT' }
    return { type: 'IF', condition, body, tail }
  },

  elifNode: (condition, body, tail = null) => {
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
  },

  for: (variable, from, to, step, body) => {
    return { type: 'FOR', variable, from, to, step, body }
  },

  break: () => {
    return { type: 'BREAK' }
  },

  continue: () => {
    return { type: 'CONTINUE' }
  },

  foreach: (variable, expression, body) => {
    return { type: 'FOREACH', variable, expression, body }
  },

  lambda: (parameters, typehint, body) => {
    return { type: 'LAMBDA', parameters, typehint: typehint || new Type('VOID'), body }
  },

  shortLambda: (parameters, typehint, expression) => {
    const body = [{ type: 'RETURN', value: expression }]
    return { type: 'LAMBDA', parameters, typehint: typehint || new Type('VOID'), body }
  },

  require: (file) => {
    return { type: 'REQUIRE', file: file.value }
  },

  inlineType: (fields, typeName) => {
    return { type: 'INLINE_TYPE', fields, typeName }
  },

  inlineTypeField: (name, value) => {
    return { type: 'INLINE_TYPE_FIELD', name, value }
  },

  binary: (value) => {
    return { type: 'BINARY_INTEGER', value }
  },

  octal: (value) => {
    return { type: 'OCTAL_INTEGER', value }
  },

  hex: (value) => {
    return { type: 'HEX_INTEGER', value }
  },

  with: (name, clauses) => {
    return { type: 'WITH', name, clauses }
  },

  withClause: (name, typehint, body) => {
    return { type: 'WITH_CLAUSE', name, typehint, body }
  },

  withMultipleClause: (name, typehints, body) => {
    return typehints.map((typehint) => {
      return { type: 'WITH_CLAUSE', name, typehint, body: _.cloneDeep(body) }
    })
  },

  withElseClause: (body) => {
    return { type: 'WITH_ELSE_CLAUSE', body }
  },

  listComprehension: (body, identifier, expression, condition) => {
    return { type: 'LIST_COMPREHENSION', body, identifier, expression, condition }
  },

  pluginImport: (name, alias) => {
    return { type: 'PLUGIN_IMPORT', name, alias }
  },

  halt: (message) => {
    return { type: 'HALT', message }
  }
}

module.exports = function (name, ...args) {
  const node = generator[name](...args)
  node.position = lexer.position
  return node
}

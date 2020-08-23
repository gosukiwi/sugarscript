module.exports = {
  identifier: (value) => {
    return { type: 'IDENTIFIER', value }
  },

  assignment: (lhs, rhs) => {
    return { type: 'ASSIGNMENT', lhs, rhs }
  },

  function: (name, params, body) => {
    return {
      type: 'FUNCTION_DEFINITION',
      name: name,
      params: params,
      returnType: 'VOID',
      body
    }
  },

  type: (name) => {
    return {
      type: 'TYPEHINT',
      name: name
    }
  },

  arrayType: (of) => {
    return {
      type: 'TYPEHINT',
      name: 'ARRAY',
      of: of.name
    }
  },

  parameter: (name, typehint) => {
    return { type: 'PARAMETER', name, typehint }
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

  let: (name, typehint) => {
    return { type: 'LET', name, typehint }
  },

  return: (value) => {
    return { type: 'RETURN', value }
  },

  query: (parts) => {
    return { type: 'QUERY', parts }
  },

  arrayAccess: (identifier, index) => {
    return { type: 'ARRAY_ACCESS', identifier, index }
  }
}

const Parser = require('jison').Parser
const lexer = require('./lexer')

const parser = new Parser({
  bnf: {
    program: [
      ['statements EOF', 'return $1']
    ],
    statements: [
      ['statements statement', '$$ = $1.concat([$2])'],
      ['statement', '$$ = [$1]']
    ],
    statement: [
      ['function', '$$ = $1'],
      ['call', '$$ = $1'],
      ['plugin_call', '$$ = $1'],
      ['assignment', '$$ = $1'],
      ['let', '$$ = $1']
    ],
    // [STATEMENTS] ============================================================
    call: [
      ['IDENTIFIER ( arguments ) NEWLINE', '$$ = yy.ast.functionCall($1, $3)'],
      ['IDENTIFIER ( ) NEWLINE', '$$ = yy.ast.functionCall($1, [])']
    ],
    arguments: [
      ['arguments , expression', '$$ = $1.concat([$3])'],
      ['expression', '$$ = [$1]']
    ],
    plugin_call: [
      ['IDENTIFIER :: IDENTIFIER ( arguments ) NEWLINE', '$$ = yy.ast.pluginCall($1, $3, $5)'],
      ['IDENTIFIER :: IDENTIFIER ( ) NEWLINE', '$$ = yy.ast.pluginCall($1, $3, [])']
    ],
    let: [
      ['LET IDENTIFIER : typehint NEWLINE', '$$ = yy.ast.let($2, $4)']
    ],
    assignment: [
      ['query = expression NEWLINE', '$$ = yy.ast.assignment($1, $3)']
    ],
    // FUNCTIONS
    // =========================================================================
    function: [
      ['DEF IDENTIFIER ( parameters ) NEWLINE INDENT function_statements DEDENT', '$$ = yy.ast.function($2, $4, $8)'],
      ['DEF IDENTIFIER ( ) NEWLINE INDENT function_statements DEDENT', '$$ = yy.ast.function($2, [], $7)']
    ],
    parameters: [
      ['parameters , parameter', '$$ = $1.concat([$3])'],
      ['parameter', '$$ = [$1]']
    ],
    parameter: [
      ['IDENTIFIER : typehint', '$$ = yy.ast.parameter($1, $3)']
    ],
    function_statements: [
      ['function_statement', '$$ = [$1]'],
      ['function_statements function_statement', '$$ = $1.concat([$2])']
    ],
    function_statement: [
      ['call', '$$ = $1'],
      ['plugin_call', '$$ = $1'],
      ['let', '$$ = $1'],
      ['assignment', '$$ = $1'],
      ['return', '$$ = $1']
    ],
    return: [
      ['RETURN expression NEWLINE', '$$ = yy.ast.return($2)']
    ],
    // TYPE HINT
    // =========================================================================
    typehint: [
      ['INTEGER', '$$ = yy.ast.type("INTEGER")'],
      ['FLOAT', '$$ = yy.ast.type("FLOAT")'],
      ['STRING', '$$ = yy.ast.type("STRING")']
    ],
    // EXPRESSIONS
    // =========================================================================
    expression: [
      ['query', '$$ = $1'],
      ['literal', '$$ = $1']
    ],
    // QUERY: A query is a way to search for a particular value. Examples:
    //   a                      # => finds by name 'a'
    //   person.name            # => finds person, then field a
    //   people[1].name         # => finds people, then second, then name
    //   person.likes[1].potato # => you get the idea
    // =========================================================================
    query: [
      ['query_parts', '$$ = yy.ast.query($1)']
    ],
    query_parts: [
      ['query_parts . query_part', '$$ = $1.concat([$3])'],
      ['query_part', '$$ = [$1]']
    ],
    query_part: [
      ['identifier', '$$ = $1']
    ],
    // REMAINING EXPRESSIONS
    // =========================================================================
    identifier: [
      ['IDENTIFIER', '$$ = yy.ast.identifier($1)']
    ],
    literal: [
      ['NUMBER', '$$ = yy.ast.number($1)'],
      ['STRING', '$$ = yy.ast.string($1)']
    ]
  }
})
parser.lexer = lexer

// AST Nodes
// =============================================================================
parser.yy.ast = {
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
  }
}

module.exports = function (input) {
  input = input.trim()
  if (input === '') return []

  return parser.parse(input + '\n')
}

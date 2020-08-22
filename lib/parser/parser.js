const Parser = require('jison').Parser
const lexer = require('./lexer')

const parser = new Parser({
  bnf: {
    program: [
      ['statements EOF', 'return $1']
    ],
    statements: [
      ['statement', '$$ = [$1]'],
      ['statements statement', '$$ = $1.concat([$2])']
    ],
    statement: [
      ['function', '$$ = $1'],
      ['assignment', '$$ = $1']
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
      ['assignment', '$$ = $1']
    ],
    // TYPE HINT
    // =========================================================================
    typehint: [
      ['INTEGER', '$$ = yy.ast.type("INTEGER")'],
      ['FLOAT', '$$ = yy.ast.type("FLOAT")'],
      ['STRING', '$$ = yy.ast.type("STRING")']
    ],
    // ASSIGNMENT
    // =========================================================================
    assignment: [
      ['dot_access = expression NEWLINE', '$$ = yy.ast.assignment($1, $3)']
    ],
    // EXPRESSIONS
    // =========================================================================
    expression: [
      ['dot_access', '$$ = $1']
    ],
    dot_access: [
      ['IDENTIFIER', '$$ = yy.ast.identifier($1)']
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
  }
}

module.exports = function (input) {
  input = input.trim()
  if (input === '') return []

  return parser.parse(input + '\n')
}

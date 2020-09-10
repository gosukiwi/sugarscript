const Parser = require('jison').Parser

const parser = new Parser({
  bnf: {
    program: [
      ['statements EOF', 'return $1']
    ],
    statements: [
      ['statements statement', '$$ = $1.concat($2)'],
      ['newlines statement', '$$ = [$2]'],
      ['statement', '$$ = [$1]']
    ],
    statement: [
      ['function', '$$ = $1'],
      ['type_definition', '$$ = $1'],
      ['substatement', '$$ = $1']
    ],
    substatement: [
      ['call newlines', '$$ = $1'],
      ['plugin_call newlines', '$$ = $1'],
      ['let', '$$ = $1'],
      ['assignment', '$$ = $1'],
      ['if', '$$ = $1']
    ],
    substatements: [
      ['substatements substatement', '$$ = $1.concat($2)'],
      ['substatement', '$$ = [$1]']
    ],
    // [STATEMENTS] ============================================================
    call: [
      ['IDENTIFIER ( arguments )', '$$ = yy.ast.functionCall($1, $3)'],
      ['IDENTIFIER ( )', '$$ = yy.ast.functionCall($1, [])']
    ],
    arguments: [
      ['arguments , expression', '$$ = $1.concat($3)'],
      ['expression', '$$ = [$1]']
    ],
    plugin_call: [
      ['IDENTIFIER :: IDENTIFIER ( arguments )', '$$ = yy.ast.pluginCall($1, $3, $5)'],
      ['IDENTIFIER :: IDENTIFIER ( )', '$$ = yy.ast.pluginCall($1, $3, [])']
    ],
    let: [
      ['LET let_tail', '$2.global = false; $$ = $2'],
      ['LET GLOBAL let_tail', '$3.global = true; $$ = $3']
    ],
    let_tail: [
      ['IDENTIFIER = expression newlines', '$$ = yy.ast.let($1, null, $3)'],
      ['IDENTIFIER : typehint = expression newlines', '$$ = yy.ast.let($1, $3, $5)'],
      ['IDENTIFIER : typehint newlines', '$$ = yy.ast.let($1, $3, null)']
    ],
    assignment: [
      ['query = expression newlines', '$$ = yy.ast.assignment($1, $3)']
    ],
    // TYPE DEFINITION
    // =========================================================================
    type_definition: [
      ['TYPE IDENTIFIER newlines INDENT type_fields DEDENT', '$$ = yy.ast.typeDefinition($2, $5)'],
      ['TYPE IDENTIFIER ( comma_separated_type_fields ) newlines', '$$ = yy.ast.typeDefinition($2, $4)']
    ],
    comma_separated_type_fields: [
      ['comma_separated_type_fields , single_line_type_field', '$$ = $1.concat($3)'],
      ['single_line_type_field', '$$ = [$1]']
    ],
    single_line_type_field: [
      ['IDENTIFIER : typehint', '$$ = yy.ast.field($1, $3)']
    ],
    type_fields: [
      ['type_fields type_field', '$$ = $1.concat($2)'],
      ['type_field', '$$ = [$1]']
    ],
    type_field: [
      ['IDENTIFIER : typehint newlines', '$$ = yy.ast.field($1, $3)']
    ],
    // IF
    // =========================================================================
    if: [
      // IF ELSE
      ['IF subexpression newlines INDENT substatements DEDENT if_tail', '$$ = yy.ast.if_node($2, $5, $7)'],
      // IF
      ['IF subexpression newlines INDENT substatements DEDENT', '$$ = yy.ast.if_node($2, $5)']
    ],
    if_tail: [
      ['ELIF subexpression newlines INDENT substatements DEDENT if_tail', '$$ = yy.ast.elif_node($2, $5, $7)'],
      ['ELIF subexpression newlines INDENT substatements DEDENT', '$$ = yy.ast.elif_node($2, $5)'],
      ['ELSE newlines INDENT substatements DEDENT', '$$ = yy.ast.elif_node(null, $4)']
    ],
    // FUNCTIONS
    // =========================================================================
    function: [
      ['DEF IDENTIFIER ( parameters ) : typehint newlines INDENT function_statements DEDENT', '$$ = yy.ast.function($2, $7, $4, $10)'],
      ['DEF IDENTIFIER ( parameters ) newlines INDENT function_statements DEDENT', '$$ = yy.ast.function($2, null, $4, $8)'],
      ['DEF IDENTIFIER ( ) : typehint newlines INDENT function_statements DEDENT', '$$ = yy.ast.function($2, $6, [], $9)'],
      ['DEF IDENTIFIER ( ) newlines INDENT function_statements DEDENT', '$$ = yy.ast.function($2, null, [], $7)']
    ],
    parameters: [
      ['parameters , parameter', '$$ = $1.concat($3)'],
      ['parameter', '$$ = [$1]']
    ],
    parameter: [
      ['IDENTIFIER : typehint', '$$ = yy.ast.parameter($1, $3)'],
      ['IDENTIFIER : * typehint', '$$ = yy.ast.parameter($1, $4, true)']
    ],
    function_statements: [
      ['function_statement', '$$ = [$1]'],
      ['function_statements function_statement', '$$ = $1.concat($2)']
    ],
    function_statement: [
      ['substatement', '$$ = $1'],
      ['return', '$$ = $1']
    ],
    return: [
      ['RETURN expression newlines', '$$ = yy.ast.return($2)']
    ],
    typehint: [
      ['INTEGER', '$$ = yy.ast.type("INTEGER")'],
      ['FLOAT', '$$ = yy.ast.type("FLOAT")'],
      ['STRING', '$$ = yy.ast.type("STRING")'],
      ['IDENTIFIER', '$$ = yy.ast.udtType($1)'],
      ['typehint [ ]', '$$ = yy.ast.arrayType($1)']
    ],
    // [EXPRESSIONS] ===========================================================
    expression: [
      ['inline_array', '$$ = $1'],
      ['subexpression', '$$ = $1']
    ],
    subexpression: [
      ['( subexpression )', '$$ = yy.ast.parenthesizedExpression($2)'],
      ['call', '$$ = $1'],
      ['plugin_call', '$$ = $1'],
      ['query', '$$ = $1'],
      ['literal', '$$ = $1']
    ],
    // QUERY
    // =========================================================================
    // A query is a way to search for a particular value. Examples:
    //   a                      # => finds by name 'a'
    //   person.name            # => finds person, then field a
    //   people[1].name         # => finds people, then second, then name
    //   person.likes[1].potato # => you get the idea
    // =========================================================================
    query: [
      ['query_parts', '$$ = yy.ast.query($1)']
    ],
    query_parts: [
      ['query_parts . query_part', '$$ = $1.concat($3)'],
      ['query_part', '$$ = [$1]']
    ],
    query_part: [
      ['array_access', '$$ = $1'],
      ['identifier', '$$ = $1']
    ],
    // INLINE ARRAY
    // =========================================================================
    inline_array: [
      ['[ inline_array_elements ]', '$$ = yy.ast.inlineArray($2)']
    ],
    inline_array_elements: [
      ['inline_array_elements , expression', '$$ = $1.concat($3)'],
      ['expression', '$$ = [$1]']
    ],
    // REMAINING EXPRESSIONS
    // =========================================================================
    array_access: [
      ['IDENTIFIER [ array_access_index ]', '$$ = yy.ast.arrayAccess($1, $3)']
    ],
    array_access_index: [
      ['array_access_index , expression', '$$ = $1.concat($3)'],
      ['expression', '$$ = [$1]']
    ],
    identifier: [
      ['IDENTIFIER', '$$ = yy.ast.identifier($1)']
    ],
    literal: [
      ['NUMBER', '$$ = yy.ast.number($1)'],
      ['STRING', '$$ = yy.ast.string($1)']
    ],
    newlines: [
      ['newlines NEWLINE', ''],
      ['NEWLINE', '']
    ]
  }
})

parser.lexer = require('./lexer')
parser.yy.ast = require('./ast')

module.exports = function (input) {
  input = input.trim()
  if (input === '') return []

  try {
    return parser.parse(input + '\n')
  } catch (error) {
    if (/Parse error on line/.test(error)) { // hijack lexer errors and fix position
      const { row, col } = parser.lexer.position
      throw new Error(`Syntax error in line ${row}, column ${col}: Unexpected ${error.toString().split('Unexpected').pop().trim()}`)
    }

    throw error
  }
}

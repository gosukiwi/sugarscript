const Parser = require('jison').Parser

const parser = new Parser({
  operators: [
    ['left', 'AND', 'OR'],
    ['left', '>', '>=', '<', '<=', '==', '!='],
    ['left', '+', '-'],
    ['left', '*', '/', '%'],
    ['left', 'PREC_NOT']
  ],
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
      ['REQUIRE string newlines', '$$ = yy.ast("require", $2)'],
      ['function', '$$ = $1'],
      ['type_definition', '$$ = $1'],
      ['union_definition', '$$ = $1'],
      ['substatement', '$$ = $1']
    ],
    substatement: [
      ['call newlines', '$1.statement = true; $$ = $1'],        // these can be both
      ['lambda_call newlines', '$1.statement = true; $$ = $1'], // an expression and
      ['plugin_call newlines', '$1.statement = true; $$ = $1'], // an statement
      ['let', '$$ = $1'],
      ['assignment', '$$ = $1'],
      ['if', '$$ = $1'],
      ['while', '$$ = $1'],
      ['for', '$$ = $1'],
      ['with', '$$ = $1'],
      ['return', '$$ = $1'],
      ['BREAK newlines', '$$ = yy.ast("break")'],
      ['CONTINUE newlines', '$$ = yy.ast("continue")']
    ],
    substatements: [
      ['substatements substatement', '$$ = $1.concat($2)'],
      ['substatement', '$$ = [$1]']
    ],
    return: [
      ['RETURN expression newlines', '$$ = yy.ast("return", $2)'],
      ['RETURN newlines', '$$ = yy.ast("return", null)']
    ],
    // [STATEMENTS] ============================================================
    call: [
      ['IDENTIFIER ( arguments )', '$$ = yy.ast("functionCall", $1, $3)'],
      ['IDENTIFIER ( )', '$$ = yy.ast("functionCall", $1, [])']
    ],
    lambda_call: [
      ['-> ( arguments ) : typehint', '$$ = yy.ast("lambdaCall", $1, $3, $6)'],
      ['CALL ( arguments ) : typehint', '$$ = yy.ast("lambdaCall", $1, $3, $6)']
    ],
    arguments: [
      ['arguments , expression', '$$ = $1.concat($3)'],
      ['expression', '$$ = [$1]']
    ],
    plugin_call: [
      ['IDENTIFIER :: IDENTIFIER ( arguments )', '$$ = yy.ast("pluginCall", $1, $3, $5)'],
      ['IDENTIFIER :: IDENTIFIER ( )', '$$ = yy.ast("pluginCall", $1, $3, [])']
    ],
    let: [
      ['LET let_tail', '$2.global = false; $$ = $2'],
      ['LET GLOBAL let_tail', '$3.global = true; $$ = $3']
    ],
    let_tail: [
      ['IDENTIFIER = expression newlines', '$$ = yy.ast("let", $1, null, $3)'],
      ['IDENTIFIER = lambda', '$$ = yy.ast("let", $1, null, $3)'],
      ['IDENTIFIER : typehint = expression newlines', '$$ = yy.ast("let", $1, $3, $5)'],
      ['IDENTIFIER : typehint = lambda', '$$ = yy.ast("let", $1, $3, $5)'],
      ['IDENTIFIER : typehint newlines', '$$ = yy.ast("let", $1, $3, null)']
    ],
    assignment: [
      ['query = expression newlines', '$$ = yy.ast("assignment", $1, $3)'],
      ['query = lambda', '$$ = yy.ast("assignment", $1, $3)']
    ],
    // WITH STATEMENT
    // =========================================================================
    with: [
      ['WITH expression NEWLINE INDENT with_clauses DEDENT', '$$ = yy.ast("with", $2, $5)']
    ],
    with_clauses: [
      ['with_clauses with_clause', '$$ = $1.concat($2)'],
      ['with_clause', '$$ = [$1]']
    ],
    with_clause: [
      ['WHEN identifier : typehint NEWLINE INDENT substatements DEDENT', '$$ = yy.ast("withClause", $2, $4, $7)']
    ],
    // TYPE DEFINITION
    // =========================================================================
    type_definition: [
      ['TYPE IDENTIFIER newlines INDENT type_fields DEDENT', '$$ = yy.ast("typeDefinition", $2, $5)'],
      ['TYPE IDENTIFIER ( comma_separated_type_fields ) newlines', '$$ = yy.ast("typeDefinition", $2, $4)']
    ],
    comma_separated_type_fields: [
      ['comma_separated_type_fields , single_line_type_field', '$$ = $1.concat($3)'],
      ['single_line_type_field', '$$ = [$1]']
    ],
    single_line_type_field: [
      ['IDENTIFIER : typehint', '$$ = yy.ast("field", $1, $3)']
    ],
    type_fields: [
      ['type_fields type_field', '$$ = $1.concat($2)'],
      ['type_field', '$$ = [$1]']
    ],
    type_field: [
      ['IDENTIFIER : typehint newlines', '$$ = yy.ast("field", $1, $3)']
    ],
    // TYPE DEFINITION
    // =========================================================================
    union_definition: [
      ['TYPE IDENTIFIER ( comma_separated_types ) newlines', '$$ = yy.ast("unionDefinition", $2, $4)']
    ],
    comma_separated_types: [
      ['comma_separated_types , identifier', '$$ = $1.concat($3)'],
      ['identifier', '$$ = [$1]']
    ],
    // IF
    // =========================================================================
    if: [
      // IF ELSE
      ['IF subexpression newlines INDENT substatements DEDENT if_tail', '$$ = yy.ast("if_node", $2, $5, $7)'],
      // IF
      ['IF subexpression newlines INDENT substatements DEDENT', '$$ = yy.ast("if_node", $2, $5)']
    ],
    if_tail: [
      ['ELIF subexpression newlines INDENT substatements DEDENT if_tail', '$$ = yy.ast("elif_node", $2, $5, $7)'],
      ['ELIF subexpression newlines INDENT substatements DEDENT', '$$ = yy.ast("elif_node", $2, $5)'],
      ['ELSE newlines INDENT substatements DEDENT', '$$ = yy.ast("elif_node", null, $4)']
    ],
    // LOOPS
    // =========================================================================
    while: [
      ['WHILE subexpression newlines INDENT substatements DEDENT', '$$ = yy.ast("while", $2, $5)']
    ],
    for: [
      ['FOR IDENTIFIER = expression TO expression STEP expression newlines INDENT substatements DEDENT', '$$ = yy.ast("for", $2, $4, $6, $8, $11)'],
      ['FOR IDENTIFIER = expression TO expression newlines INDENT substatements DEDENT', '$$ = yy.ast("for", $2, $4, $6, null, $9)'],
      ['FOR IDENTIFIER IN expression newlines INDENT substatements DEDENT', '$$ = yy.ast("foreach", $2, $4, $7)']
    ],
    // FUNCTIONS
    // =========================================================================
    function: [
      ['DEF IDENTIFIER ( parameters ) : typehint newlines INDENT substatements DEDENT', '$$ = yy.ast("function", $2, $7, $4, $10)'],
      ['DEF IDENTIFIER ( parameters ) newlines INDENT substatements DEDENT', '$$ = yy.ast("function", $2, null, $4, $8)'],
      ['DEF IDENTIFIER ( ) : typehint newlines INDENT substatements DEDENT', '$$ = yy.ast("function", $2, $6, [], $9)'],
      ['DEF IDENTIFIER ( ) newlines INDENT substatements DEDENT', '$$ = yy.ast("function", $2, null, [], $7)']
    ],
    parameters: [
      ['parameters , parameter', '$$ = $1.concat($3)'],
      ['parameter', '$$ = [$1]']
    ],
    parameter: [
      ['IDENTIFIER : typehint = expression', '$$ = yy.ast("parameter", $1, $3, false, $5)'],
      ['IDENTIFIER : * typehint = expression', '$$ = yy.ast("parameter", $1, $4, true, $6)'],
      ['IDENTIFIER : typehint', '$$ = yy.ast("parameter", $1, $3)'],
      ['IDENTIFIER : * typehint', '$$ = yy.ast("parameter", $1, $4, true)']
    ],
    typehint: [
      ['INTEGER', '$$ = yy.ast("type", "INTEGER")'],
      ['FLOAT', '$$ = yy.ast("type", "FLOAT")'],
      ['STRING_TYPEHINT', '$$ = yy.ast("type", "STRING")'],
      ['IDENTIFIER', '$$ = yy.ast("udtType", $1)'],
      ['IDENTIFIER ( comma_separated_types )', '$$ = yy.ast("unionType", $1, $3)'],
      ['typehint [ ]', '$$ = yy.ast("arrayType", $1)']
    ],
    // [EXPRESSIONS] ===========================================================
    expression: [
      ['inline_array', '$$ = $1'],
      ['inline_type', '$$ = $1'],
      ['lambda', '$$ = $1'],
      ['subexpression', '$$ = $1']
    ],
    subexpression: [
      ['subexpression AND subexpression', '$$ = yy.ast("binop", $1, $3, "AND")'],
      ['subexpression OR subexpression', '$$ = yy.ast("binop", $1, $3, "OR")'],
      ['subexpression > subexpression', '$$ = yy.ast("binop", $1, $3, "GT")'],
      ['subexpression >= subexpression', '$$ = yy.ast("binop", $1, $3, "GTEQ")'],
      ['subexpression < subexpression', '$$ = yy.ast("binop", $1, $3, "LT")'],
      ['subexpression <= subexpression', '$$ = yy.ast("binop", $1, $3, "LTEQ")'],
      ['subexpression == subexpression', '$$ = yy.ast("binop", $1, $3, "EQ")'],
      ['subexpression != subexpression', '$$ = yy.ast("binop", $1, $3, "NEQ")'],
      ['subexpression + subexpression', '$$ = yy.ast("binop", $1, $3, "PLUS")'],
      ['subexpression - subexpression', '$$ = yy.ast("binop", $1, $3, "MINUS")'],
      ['subexpression * subexpression', '$$ = yy.ast("binop", $1, $3, "TIMES")'],
      ['subexpression / subexpression', '$$ = yy.ast("binop", $1, $3, "DIVISION")'],
      ['subexpression % subexpression', '$$ = yy.ast("binop", $1, $3, "MODULO")'],
      ['NOT subexpression', '$$ = yy.ast("unop", $2, "NOT")', { prec: 'PREC_NOT' }],
      ['( subexpression )', '$$ = yy.ast("parenthesizedExpression", $2)'],
      ['call', '$$ = $1'],
      ['lambda_call', '$$ = $1'],
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
      ['query_parts', '$$ = yy.ast("query", $1)']
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
      ['[ ] : typehint', '$$ = yy.ast("inlineArray", [], $4)'],
      ['[ inline_array_elements ] : typehint', '$$ = yy.ast("inlineArray", $2, $5)'],
      ['[ inline_array_elements ]', '$$ = yy.ast("inlineArray", $2)']
    ],
    inline_array_elements: [
      ['inline_array_elements , expression', '$$ = $1.concat($3)'],
      ['expression', '$$ = [$1]']
    ],
    // INLINE TYPE
    // =========================================================================
    inline_type: [
      ['{ inline_type_fields } : identifier', '$$ = yy.ast("inlineType", $2, $5)']
    ],
    inline_type_fields: [
      ['inline_type_fields , inline_type_field', '$$ = $1.concat($3)'],
      ['inline_type_field', '$$ = [$1]']
    ],
    inline_type_field: [
      ['identifier : expression', '$$ = yy.ast("inlineTypeField", $1, $3)']
    ],
    // LAMBDA
    // =========================================================================
    lambda: [
      ['( parameters ) : typehint -> newlines INDENT substatements DEDENT', '$$ = yy.ast("lambda", $2, $5, $9)'],
      ['( parameters ) -> newlines INDENT substatements DEDENT', '$$ = yy.ast("lambda", $2, null, $7)'],
      ['( ) : typehint -> newlines INDENT substatements DEDENT', '$$ = yy.ast("lambda", [], $4, $8)'],
      ['( ) -> newlines INDENT substatements DEDENT', '$$ = yy.ast("lambda", [], null, $6)'],
      ['short_lambda', '$$ = $1']
    ],
    short_lambda: [
      ['( parameters ) : typehint -> expression', '$$ = yy.ast("shortLambda", $2, $5, $7)'],
      ['( ) : typehint -> expression', '$$ = yy.ast("shortLambda", [], $4, $6)']
    ],
    // REMAINING EXPRESSIONS
    // =========================================================================
    array_access: [
      ['IDENTIFIER [ array_access_index ]', '$$ = yy.ast("arrayAccess", $1, $3)']
    ],
    array_access_index: [
      ['array_access_index , expression', '$$ = $1.concat($3)'],
      ['expression', '$$ = [$1]']
    ],
    identifier: [
      ['IDENTIFIER', '$$ = yy.ast("identifier", $1)']
    ],
    literal: [
      ['number', '$$ = $1'],
      ['string', '$$ = $1']
    ],
    string: [
      ['STRING', '$$ = yy.ast("string", $1)'],
      ['SQSTRING', '$$ = yy.ast("sqstring", $1)']
    ],
    number: [
      ['BINARY', '$$ = yy.ast("binary", $1)'],
      ['OCTAL', '$$ = yy.ast("octal", $1)'],
      ['HEX', '$$ = yy.ast("hex", $1)'],
      ['NUMBER', '$$ = yy.ast("number", $1)'],
      ['TRUE', '$$ = yy.ast("number", 1)'],
      ['FALSE', '$$ = yy.ast("number", 0)']
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
    const { row, col } = parser.lexer.position

    if (/Parse error on line/.test(error)) { // hijack lexer errors and fix position
      throw new Error(`Syntax error in line ${row}, column ${col}: Unexpected ${error.toString().split('Unexpected').pop().trim()}`)
    }

    throw new Error(`Error in line ${row}, column ${col}: ${error}`)
  }
}

const scope = require('./scope')
const Context = require('./definitions/context')
const FunctionChecker = require('./checkers/function-checker')
const ParameterChecker = require('./checkers/parameter-checker')
const NullChecker = require('./checkers/null-checker')
const ReturnChecker = require('./checkers/return-checker')
const StringChecker = require('./checkers/string-checker')
const SQStringChecker = require('./checkers/sqstring-checker')
const FunctionCallChecker = require('./checkers/function-call-checker')
const AssignmentChecker = require('./checkers/assignment-checker')
const InlineArrayChecker = require('./checkers/inline-array-checker')
const ArrayAccessChecker = require('./checkers/array-access-checker')
const LetChecker = require('./checkers/let-checker')
const IdentifierChecker = require('./checkers/identifier-checker')
const NumberChecker = require('./checkers/number-checker')
const QueryChecker = require('./checkers/query-checker')
const TypeDefinitionChecker = require('./checkers/type-definition-checker')
const IfChecker = require('./checkers/if-checker')
const ParenthesizedExpressionChecker = require('./checkers/parenthesized-expression-checker')
const BinopChecker = require('./checkers/binop-checker')
const UnopChecker = require('./checkers/unop-checker')
const WhileChecker = require('./checkers/while-checker')
const ForChecker = require('./checkers/for-checker')
const ForeachChecker = require('./checkers/foreach-checker')
const ContinueChecker = require('./checkers/continue-checker')
const BreakChecker = require('./checkers/break-checker')
const LambdaChecker = require('./checkers/lambda-checker')
const LambdaCallChecker = require('./checkers/lambda-call-checker')
const FileChecker = require('./checkers/file-checker')
const InlineTypeChecker = require('./checkers/inline-type-checker')
const IntegerChecker = require('./checkers/integer-checker')
const UnionChecker = require('./checkers/union-checker')
const WithChecker = require('./checkers/with-checker')
const WithClauseChecker = require('./checkers/with-clause-checker')
const WithElseClauseChecker = require('./checkers/with-else-clause-checker')
const ListComprehensionChecker = require('./checkers/list-comprehension-checker')
const PluginImportChecker = require('./checkers/plugin-import-checker')
const PluginCallChecker = require('./checkers/plugin-call-checker')
const HaltChecker = require('./checkers/halt-checker')

// Checkers do two things:
// 1) Make sure the action is not illegal (eg: call a function with bad arguments)
// 2) Collect type data along the way (eg: a function's return value)
const CHECKERS = {
  FUNCTION_DEFINITION: new FunctionChecker(),
  PARAMETER: new ParameterChecker(),
  EMPTY_LINE: new NullChecker(),
  RETURN: new ReturnChecker(),
  NUMBER: new NumberChecker(),
  STRING: new StringChecker(),
  SQSTRING: new SQStringChecker(),
  FUNCTION_CALL: new FunctionCallChecker(),
  ASSIGNMENT: new AssignmentChecker(),
  INLINE_ARRAY: new InlineArrayChecker(),
  ARRAY_ACCESS: new ArrayAccessChecker(),
  LET: new LetChecker(),
  IDENTIFIER: new IdentifierChecker(),
  QUERY: new QueryChecker(),
  TYPE_DEFINITION: new TypeDefinitionChecker(),
  IF: new IfChecker(),
  ELIF: new IfChecker(),
  PARENTHESIZED_EXPRESSION: new ParenthesizedExpressionChecker(),
  BINOP: new BinopChecker(),
  UNOP: new UnopChecker(),
  WHILE: new WhileChecker(),
  FOR: new ForChecker(),
  BREAK: new BreakChecker(),
  CONTINUE: new ContinueChecker(),
  FOREACH: new ForeachChecker(),
  LAMBDA: new LambdaChecker(),
  LAMBDA_CALL: new LambdaCallChecker(),
  FILE: new FileChecker(),
  INLINE_TYPE: new InlineTypeChecker(),
  BINARY_INTEGER: new IntegerChecker(),
  OCTAL_INTEGER: new IntegerChecker(),
  HEX_INTEGER: new IntegerChecker(),
  UNION_DEFINITION: new UnionChecker(),
  WITH: new WithChecker(),
  WITH_CLAUSE: new WithClauseChecker(),
  WITH_ELSE_CLAUSE: new WithElseClauseChecker(),
  LIST_COMPREHENSION: new ListComprehensionChecker(),
  PLUGIN_IMPORT: new PluginImportChecker(),
  PLUGIN_CALL: new PluginCallChecker(),
  HALT: new HaltChecker()
}

// Scans the whole AST and builds type definition info. It's run before
// compilation and if it fails, compilation won't continue.
//
// It enhances the AST so the compiler can do smarter things, like a smarter
// assign.
class TypeChecker {
  constructor () {
    this.file = 'in-memory://'
  }

  check (ast) {
    const definitions = new Context()
    scope.clear()

    // because function definitions can be defined in any order, let's gather
    // that first, once that's done, process the remaining queue
    const queue = []
    ast.forEach((node) => { // is there a way to do this in O(n) without recursion?
      if (node.type === 'FUNCTION_DEFINITION' || node.type === 'TYPE_DEFINITION' || node.type === 'UNION_DEFINITION' || node.type === 'LET' || node.type === 'PLUGIN_IMPORT') {
        this.checkOne({ node, definitions })
      } else {
        queue.push(node)
      }
    })
    queue.forEach((node) => this.checkOne({ node, definitions }))

    return definitions
  }

  checkOne ({ node, definitions }) {
    return this.checkerFor(node).check({ node, checker: this, definitions })
  }

  // private

  checkerFor (node) {
    const checker = CHECKERS[node.type]
    if (checker === undefined) throw new Error(`Could not find checker for type: ${node.type}`)
    return checker
  }
}

module.exports = TypeChecker

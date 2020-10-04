const FunctionChecker = require('./function-checker')
const ParameterChecker = require('./parameter-checker')
const NullChecker = require('./null-checker')
const ReturnChecker = require('./return-checker')
const StringChecker = require('./string-checker')
const SQStringChecker = require('./sqstring-checker')
const FunctionCallChecker = require('./function-call-checker')
const AssignmentChecker = require('./assignment-checker')
const InlineArrayChecker = require('./inline-array-checker')
const ArrayAccessChecker = require('./array-access-checker')
const LetChecker = require('./let-checker')
const IdentifierChecker = require('./identifier-checker')
const NumberChecker = require('./number-checker')
const QueryChecker = require('./query-checker')
const TypeDefinitionChecker = require('./type-definition-checker')
const IfChecker = require('./if-checker')
const ParenthesizedExpressionChecker = require('./parenthesized-expression-checker')
const BinopChecker = require('./binop-checker')
const UnopChecker = require('./unop-checker')
const WhileChecker = require('./while-checker')
const ForChecker = require('./for-checker')
const ForeachChecker = require('./foreach-checker')
const ContinueChecker = require('./continue-checker')
const BreakChecker = require('./break-checker')
const LambdaChecker = require('./lambda-checker')
const LambdaCallChecker = require('./lambda-call-checker')
const FileChecker = require('./file-checker')
const InlineTypeChecker = require('./inline-type-checker')
const IntegerChecker = require('./integer-checker')
const UnionChecker = require('./union-checker')
const WithChecker = require('./with-checker')
const WithClauseChecker = require('./with-clause-checker')
const WithElseClauseChecker = require('./with-else-clause-checker')
const ListComprehensionChecker = require('./list-comprehension-checker')
const PluginImportChecker = require('./plugin-import-checker')
const PluginCallChecker = require('./plugin-call-checker')
const HaltChecker = require('./halt-checker')

// Checkers do two things:
// 1) Make sure the action is not illegal (eg: call a function with bad arguments)
// 2) Collect type data along the way (eg: a function's return value)
module.exports = {
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

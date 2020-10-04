const FunctionDefinitionGenerator = require('./function-definition-generator')
const ParameterGenerator = require('./parameter-generator')
const NullGenerator = require('./null-generator')
const LiteralGenerator = require('./literal-generator')
const ReturnGenerator = require('./return-generator')
const FunctionCallGenerator = require('./function-call-generator')
const StringGenerator = require('./string-generator')
const SQStringGenerator = require('./sqstring-generator')
const AssignmentGenerator = require('./assignment-generator')
const InlineArrayGenerator = require('./inline-array-generator')
const ArrayAccessGenerator = require('./array-access-generator')
const QueryGenerator = require('./query-generator')
const LetGenerator = require('./let-generator')
const TypeDefinitionGenerator = require('./type-definition-generator')
const IfGenerator = require('./if-generator')
const ElifGenerator = require('./elif-generator')
const ParenthesizedExpressionGenerator = require('./parenthesized-expression-generator')
const BinopGenerator = require('./binop-generator')
const UnopGenerator = require('./unop-generator')
const WhileGenerator = require('./while-generator')
const ForGenerator = require('./for-generator')
const ForeachGenerator = require('./foreach-generator')
const BreakGenerator = require('./break-generator')
const ContinueGenerator = require('./continue-generator')
const LambdaGenerator = require('./lambda-generator')
const LambdaCallGenerator = require('./lambda-call-generator')
const FileGenerator = require('./file-generator')
const InlineTypeGenerator = require('./inline-type-generator')
const BinaryGenerator = require('./binary-generator')
const UnionGenerator = require('./union-generator')
const WithGenerator = require('./with-generator')
const WithClauseGenerator = require('./with-clause-generator')
const WithElseClauseGenerator = require('./with-else-clause-generator')
const ListComprehensionGenerator = require('./list-comprehension-generator')
const PluginImportGenerator = require('./plugin-import-generator')
const PluginCallGenerator = require('./plugin-call-generator')
const HaltGenerator = require('./halt-generator')

module.exports = {
  FUNCTION_DEFINITION: new FunctionDefinitionGenerator(),
  PARAMETER: new ParameterGenerator(),
  EMPTY_LINE: new NullGenerator(),
  RETURN: new ReturnGenerator(),
  NUMBER: new LiteralGenerator(),
  STRING: new StringGenerator(),
  SQSTRING: new SQStringGenerator(),
  NULL: new NullGenerator(),
  FUNCTION_CALL: new FunctionCallGenerator(),
  ASSIGNMENT: new AssignmentGenerator(),
  IDENTIFIER: new LiteralGenerator(),
  INLINE_ARRAY: new InlineArrayGenerator(),
  ARRAY_ACCESS: new ArrayAccessGenerator(),
  QUERY: new QueryGenerator(),
  LET: new LetGenerator(),
  TYPE_DEFINITION: new TypeDefinitionGenerator(),
  IF: new IfGenerator(),
  ELIF: new ElifGenerator(),
  PARENTHESIZED_EXPRESSION: new ParenthesizedExpressionGenerator(),
  BINOP: new BinopGenerator(),
  UNOP: new UnopGenerator(),
  WHILE: new WhileGenerator(),
  FOR: new ForGenerator(),
  BREAK: new BreakGenerator(),
  CONTINUE: new ContinueGenerator(),
  FOREACH: new ForeachGenerator(),
  LAMBDA: new LambdaGenerator(),
  LAMBDA_CALL: new LambdaCallGenerator(),
  FILE: new FileGenerator(),
  INLINE_TYPE: new InlineTypeGenerator(),
  BINARY_INTEGER: new BinaryGenerator(),
  OCTAL_INTEGER: new LiteralGenerator(),
  HEX_INTEGER: new LiteralGenerator(),
  UNION_DEFINITION: new UnionGenerator(),
  WITH: new WithGenerator(),
  WITH_CLAUSE: new WithClauseGenerator(),
  WITH_ELSE_CLAUSE: new WithElseClauseGenerator(),
  LIST_COMPREHENSION: new ListComprehensionGenerator(),
  PLUGIN_IMPORT: new PluginImportGenerator(),
  PLUGIN_CALL: new PluginCallGenerator(),
  HALT: new HaltGenerator()
}

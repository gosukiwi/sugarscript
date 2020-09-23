const Snippet = require('./snippet.js')
const lambdas = require('./lambdas')
const TypeChecker = require('../type-checker/type-checker')
const FunctionDefinitionGenerator = require('./generators/function-definition-generator')
const ParameterGenerator = require('./generators/parameter-generator')
const NullGenerator = require('./generators/null-generator')
const LiteralGenerator = require('./generators/literal-generator')
const ReturnGenerator = require('./generators/return-generator')
const FunctionCallGenerator = require('./generators/function-call-generator')
const StringGenerator = require('./generators/string-generator')
const SQStringGenerator = require('./generators/sqstring-generator')
const AssignmentGenerator = require('./generators/assignment-generator')
const InlineArrayGenerator = require('./generators/inline-array-generator')
const ArrayAccessGenerator = require('./generators/array-access-generator')
const QueryGenerator = require('./generators/query-generator')
const LetGenerator = require('./generators/let-generator')
const TypeDefinitionGenerator = require('./generators/type-definition-generator')
const IfGenerator = require('./generators/if-generator')
const ElifGenerator = require('./generators/elif-generator')
const ParenthesizedExpressionGenerator = require('./generators/parenthesized-expression-generator')
const BinopGenerator = require('./generators/binop-generator')
const UnopGenerator = require('./generators/unop-generator')
const WhileGenerator = require('./generators/while-generator')
const ForGenerator = require('./generators/for-generator')
const ForeachGenerator = require('./generators/foreach-generator')
const BreakGenerator = require('./generators/break-generator')
const ContinueGenerator = require('./generators/continue-generator')
const LambdaGenerator = require('./generators/lambda-generator')
const LambdaCallGenerator = require('./generators/lambda-call-generator')
const FileGenerator = require('./generators/file-generator')
const InlineTypeGenerator = require('./generators/inline-type-generator')
const BinaryGenerator = require('./generators/binary-generator')
const UnionGenerator = require('./generators/union-generator')
const WithGenerator = require('./generators/with-generator')
const WithClauseGenerator = require('./generators/with-clause-generator')

const GENERATORS = {
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
  WITH_CLAUSE: new WithClauseGenerator()
}

class Codegen {
  constructor () {
    this.file = 'in-memory://'
  }

  generate (nodes) {
    lambdas.clear() // TODO: Consider this when implementing `#include`
    const definitions = this.typeCheck(nodes)
    const snippet = new Snippet()
    nodes.forEach((node) => this.generateOne({ node, definitions, snippet }))
    snippet.prepend(lambdas.generate(definitions))
    return snippet.toString()
  }

  generateOne ({ node, definitions, snippet }) {
    if (node === null) return GENERATORS.NULL.generate()

    const generator = GENERATORS[node.type]
    if (generator === undefined) throw new Error(`Could not find generator for type: ${node.type}`)

    generator.generate({ node, definitions, generator: this, snippet })
  }

  // private

  typeCheck (ast) {
    return new TypeChecker().check(ast)
  }
}

module.exports = Codegen

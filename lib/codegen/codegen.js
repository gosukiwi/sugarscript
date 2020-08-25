const Snippet = require('./snippet.js')
// const DefinitionsGenerator = require('./definitions-generator')
const TypeChecker = require('../type-checker/type-checker')
const FunctionDefinitionGenerator = require('./generators/function-definition-generator')
const ParameterGenerator = require('./generators/parameter-generator')
const NullGenerator = require('./generators/null-generator')
const LiteralGenerator = require('./generators/literal-generator')
const ReturnGenerator = require('./generators/return-generator')
const FunctionCallGenerator = require('./generators/function-call-generator')
const StringGenerator = require('./generators/string-generator')
const AssignmentGenerator = require('./generators/assignment-generator')
const InlineArrayGenerator = require('./generators/inline-array-generator')
const ArrayAccessGenerator = require('./generators/array-access-generator')
const QueryGenerator = require('./generators/query-generator')
const LetGenerator = require('./generators/let-generator')

const GENERATORS = {
  FUNCTION_DEFINITION: new FunctionDefinitionGenerator(),
  PARAMETER: new ParameterGenerator(),
  EMPTY_LINE: new NullGenerator(),
  RETURN: new ReturnGenerator(),
  NUMBER: new LiteralGenerator(),
  STRING: new StringGenerator(),
  NULL: new NullGenerator(),
  FUNCTION_CALL: new FunctionCallGenerator(),
  ASSIGNMENT: new AssignmentGenerator(),
  IDENTIFIER: new LiteralGenerator(),
  INLINE_ARRAY: new InlineArrayGenerator(),
  ARRAY_ACCESS: new ArrayAccessGenerator(),
  QUERY: new QueryGenerator(),
  LET: new LetGenerator()
}

class Codegen {
  generate (nodes) {
    const definitions = this.typeCheck(nodes)
    const snippet = new Snippet()
    // const defgen = new DefinitionsGenerator()
    // defgen.generate({ definitions, snippet })
    nodes.forEach((node) => this.generateOne({ node, definitions, snippet }))
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

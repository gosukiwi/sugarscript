const TypeChecker = require('../type-checker/type-checker')
const FunctionDefinitionGenerator = require('./function-definition-generator')
const ParameterListGenerator = require('./parameter-list-generator')
const NullGenerator = require('./null-generator')
const LiteralGenerator = require('./literal-generator')
const ReturnGenerator = require('./return-generator')

const GENERATORS = {
  FUNCTION_DEFINITION: new FunctionDefinitionGenerator(),
  PARAMETER_LIST: new ParameterListGenerator(),
  EMPTY_LINE: new NullGenerator(),
  RETURN: new ReturnGenerator(),
  INTEGER: new LiteralGenerator()
}

class Codegen {
  call (ast) { // call just once! for initial node
    const definitions = this.definitions(ast)
    return this.generate(ast, definitions)
  }

  generate (nodes, definitions) {
    return nodes.map((node) => this.generateOne(node, definitions)).join('\n')
  }

  generateOne (expression, definitions) {
    const generator = GENERATORS[expression.type]
    if (generator === undefined) throw new Error(`Could not find generator for type: ${expression.type}`)

    return generator.generate(expression, definitions, this)
  }

  // private

  definitions (ast) {
    return new TypeChecker().check(ast)
  }
}

module.exports = Codegen

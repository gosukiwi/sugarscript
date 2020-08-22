const TypeChecker = require('../type-checker/type-checker')
const FunctionDefinitionGenerator = require('./generators/function-definition-generator')
const ParameterListGenerator = require('./generators/parameter-list-generator')
const NullGenerator = require('./generators/null-generator')
const LiteralGenerator = require('./generators/literal-generator')
const ReturnGenerator = require('./generators/return-generator')
const FunctionCallGenerator = require('./generators/function-call-generator')
const StringGenerator = require('./generators/string-generator')
const AssignmentGenerator = require('./generators/assignment-generator')
const InlineArrayGenerator = require('./generators/inline-array-generator')

const GENERATORS = {
  FUNCTION_DEFINITION: new FunctionDefinitionGenerator(),
  PARAMETER_LIST: new ParameterListGenerator(),
  EMPTY_LINE: new NullGenerator(),
  RETURN: new ReturnGenerator(),
  INTEGER: new LiteralGenerator(),
  STRING: new StringGenerator(),
  NULL: new NullGenerator(),
  FUNCTION_CALL: new FunctionCallGenerator(),
  ASSIGNMENT: new AssignmentGenerator(),
  IDENTIFIER: new LiteralGenerator(),
  INLINE_ARRAY: new InlineArrayGenerator()
}

class Codegen {
  generate (nodes) {
    const definitions = this.typeCheck(nodes)
    const head = this.generateDefinitions(definitions)
    const tail = nodes.map((node) => this.generateOne({ node, definitions })).join('\n')
    return [head, tail].join('\n')
  }

  generateOne ({ node, definitions }) {
    if (node === null) return GENERATORS.NULL.generate()

    const generator = GENERATORS[node.type]
    if (generator === undefined) throw new Error(`Could not find generator for type: ${node.type}`)

    return generator.generate({ node, definitions, generator: this })
  }

  // private

  typeCheck (ast) {
    return new TypeChecker().check(ast)
  }

  generateDefinitions (definitions) {
    return Object.keys(definitions.variables).map((name) => {
      const variable = definitions.variables[name]
      return `${name} as ${this.generateType(variable.type)}`
    })
  }

  generateType (type) { // WIP Fix this
    return type.getType().toLowerCase()
  }
}

module.exports = Codegen

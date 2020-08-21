const Definition = require('./definition')

class FunctionDefinition extends Definition {
  constructor ({ type, definitions, functionName }) {
    super({ name: 'FUNCTION_DEFINITION', type })
    this.definitions = definitions
    this.functionName = functionName
  }
}

module.exports = FunctionDefinition

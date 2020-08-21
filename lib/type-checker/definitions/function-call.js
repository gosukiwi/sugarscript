const Definition = require('./definition')

class FunctionCall extends Definition {
  constructor ({ type, args, functionName }) {
    super({ name: 'FUNCTION_CALL', type })
    this.args = args
    this.functionName = functionName
  }
}

module.exports = FunctionCall

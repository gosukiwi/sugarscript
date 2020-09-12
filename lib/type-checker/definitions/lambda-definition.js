const Definition = require('./definition')

class LambdaDefinition extends Definition {
  constructor ({ type, definitions, id }) {
    super({ name: 'LAMBDA_DEFINITION', type })
    this.definitions = definitions
    this.id = id
  }
}

module.exports = LambdaDefinition

const Definition = require('./definition')

class IdentifierDefinition extends Definition {
  constructor ({ type, identifier }) {
    super({ name: 'IDENTIFIER', type })
    this.identifier = identifier
  }
}

module.exports = IdentifierDefinition

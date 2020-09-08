const Definition = require('./definition')

class IdentifierDefinition extends Definition {
  constructor ({ type, identifier, global }) {
    super({ name: 'IDENTIFIER', type })
    this.identifier = identifier
    this.global = global
  }
}

module.exports = IdentifierDefinition

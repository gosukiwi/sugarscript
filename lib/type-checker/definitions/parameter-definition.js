const Definition = require('./definition')

class ParameterDefinition extends Definition {
  constructor ({ type, isReference, arrayDimensions, identifier }) {
    super({ name: 'PARAMETER', type })
    this.isReference = isReference
    this.arrayDimensions = arrayDimensions
    this.identifier = identifier
  }
}

module.exports = ParameterDefinition

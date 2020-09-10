const Definition = require('./definition')

class ParameterDefinition extends Definition {
  constructor ({ type, isReference, arrayDimensions, identifier, defaultValue }) {
    super({ name: 'PARAMETER', type })
    this.isReference = isReference
    this.arrayDimensions = arrayDimensions
    this.identifier = identifier
    this.default = defaultValue
  }
}

module.exports = ParameterDefinition

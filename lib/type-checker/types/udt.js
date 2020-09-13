const Type = require('./type')

class UDT extends Type {
  constructor (value) {
    super('UDT')
    if (!value) throw new Error('Value must be present')

    this.value = value
  }

  equals (other) {
    return other.getType() === this.getType() && other.value === this.value
  }

  toString () {
    return `<UDT: ${this.value}>`
  }

  serialize () {
    return `UDT_OF_${this.value}`
  }
}

module.exports = UDT

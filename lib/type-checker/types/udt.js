const Type = require('./type')

class UDT extends Type {
  constructor (value) {
    super('UDT')
    this.value = value
  }

  equals (other) {
    return other.getType() === this.getType() && other.value === this.value
  }

  toString () {
    return `<UDT: ${this.value}>`
  }
}

module.exports = UDT

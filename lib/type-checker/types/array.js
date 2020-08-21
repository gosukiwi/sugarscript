const Type = require('./type')

class ArrayType extends Type {
  constructor ({ value, dimensions }) {
    super('ARRAY')

    if (!value) throw new Error('Type must be present')

    this.value = value
    this.dimensions = +dimensions
  }

  equals (other) {
    return other.getType() === this.getType() &&
      other.value.equals(this.value) &&
      other.dimensions === this.dimensions
  }

  toString () {
    return `<ARRAY OF: ${this.value}, DIMENSIONS: ${this.dimensions}>`
  }
}

module.exports = ArrayType

const Type = require('./type')

class ArrayType extends Type {
  constructor ({ value }) {
    super('ARRAY')
    if (!value) throw new Error('Value must be present')

    this.value = value
  }

  equals (other) {
    return other.getType() === this.getType() && other.value.equals(this.value)
  }

  toString () {
    return `<ARRAY OF: ${this.value}>`
  }
}

module.exports = ArrayType

const Type = require('./type')

function hasDuplicates(array) {
  return new Set(array).size !== array.length
}

class Union extends Type {
  constructor (name, udts) {
    super('UNION')
    if (!name) throw new Error('Name must be present')
    if (!udts) throw new Error('UDTs must be present')
    if (!Array.isArray(udts)) throw new Error('UDTs must be an array')
    if (hasDuplicates(udts)) throw new Error('Cannot have duplicated UDTs')

    this.name = name
    this.udts = udts
  }

  equals (other) {
    return other.getType() === this.getType() &&
      other.udts.length === this.udts.length &&
      other.udts.reduce((accu, udt) => accu && this.udts.includes(udt), true)
  }

  toString () {
    return `<UNION: ${this.udts.map((udt) => udt.toString()).join(', ')}>`
  }

  serialize () {
    return `UNION_OF_${this.udts.join('_AND_')}`
  }

  includes (udt) {
    return this.udts.includes(udt.value)
  }
}

module.exports = Union

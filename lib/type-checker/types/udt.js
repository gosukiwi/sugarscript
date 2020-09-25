const Type = require('./type')

class UDT extends Type {
  constructor (value) {
    super('UDT')
    if (!value) throw new Error('Value must be present')

    this.value = value
  }

  isUnion () {
    return false
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

  assignable (other, definitions) {
    if (other.isnt('UDT')) return false
    if (this.value === other.value) return true

    const lhsDefinition = definitions.getType(this.value)
    const rhsDefinition = definitions.getType(other.value)

    const neitherIsUnion = !(lhsDefinition.isUnion() || rhsDefinition.isUnion())
    if (neitherIsUnion) return this.equals(other)

    const bothAreUnions = lhsDefinition.isUnion() && rhsDefinition.isUnion()
    if (bothAreUnions) return lhsDefinition.includes(other)

    // By now, either LHS is union, or RHS is union.
    // We cannot assign an union to a non-union, so if RHS is union, fail
    if (rhsDefinition.isUnion()) return false

    // By now we now LHS is union and RHS isn't. Check RHS type is not
    // included on the UNION
    if (!lhsDefinition.includes(other)) return false

    return true
  }
}

module.exports = UDT

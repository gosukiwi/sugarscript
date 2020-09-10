class Type {
  constructor (type) {
    if (!type) throw new Error('Type must be present')

    this.type = type
  }

  is (name) {
    return this.getType() === name
  }

  isNumber () {
    return this.is('INTEGER') || this.is('FLOAT')
  }

  isnt (name) {
    return !this.is(name)
  }

  getType () {
    return this.type
  }

  toString () {
    return this.type
  }

  equals (other) {
    return other.getType() === this.getType()
  }
}

module.exports = Type

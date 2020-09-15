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
    if (this.is('FLOAT') && other.is('INTEGER')) return true

    return other.getType() === this.getType()
  }

  serialize () {
    return this.type
  }
}

module.exports = Type

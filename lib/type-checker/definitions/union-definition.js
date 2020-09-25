const TypeDefinition = require('./type-definition')

class UnionDefinition extends TypeDefinition {
  constructor (name) {
    super(name)

    this.udts = []
  }

  addField () {
    throw new Error('Union cannot have fields')
  }

  addUDT (name) {
    if (this.udts.includes(name.toLowerCase())) throw new Error(`UDT ${name} already set`)
    this.udts.push(name)
  }

  isUnion () {
    return true
  }

  includes (udt) {
    return this.udts.includes(udt.value)
  }
}

module.exports = UnionDefinition

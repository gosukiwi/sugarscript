class TypeGenerator {
  generate (type) {
    if (type.is('VOID')) throw new Error("Can't generate output for VOID type")

    if (type.is('STRING')) return 'string'
    if (type.is('INTEGER')) return 'integer'
    if (type.is('FLOAT')) return 'float'
    if (type.is('UDT')) return type.value
    if (type.is('ARRAY')) { // TODO: This doesn't work for params
      const dimensions = Array(type.dimensions).fill('-1').join(', ')
      return `${this.generate(type.value)}[${dimensions}]`
    }

    throw new Error(`Invalid type: '${type}'`)
  }
}

module.exports = TypeGenerator

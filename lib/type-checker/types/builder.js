const Type = require('./type')
const UDT = require('./udt')
const ArrayType = require('./array')

class TypeBuilder {
  static build ({ type, array }) {
    function create (type) {
      if (!type) return new Type('VOID')

      switch (type) {
        case 'string':
          return new Type('STRING')
        case 'float':
          return new Type('FLOAT')
        case 'integer':
          return new Type('INTEGER')
        default:
          return new UDT(type)
      }
    }

    if (+array > 0) return new ArrayType({ value: create(type), dimensions: array })
    return create(type)
  }

  static void () {
    return new Type('VOID')
  }
}

module.exports = TypeBuilder

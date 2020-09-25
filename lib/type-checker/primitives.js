const Type = require('./types/type')

module.exports = {
  array_length: {
    params: 1,
    statement: false,
    validate: function (p1) {
      if (p1.is('ARRAY')) return new Type('INTEGER')
      return null
    }
  },
  array_insert: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.equals(p1.value)) return new Type('VOID')
      return null
    }
  },
  array_insert_at: { // array_insert_at(arr, index, value)
    params: 3,
    statement: true,
    validate: function (p1, p2, p3) {
      if (p1.is('ARRAY') && p2.is('INTEGER') && p3.equals(p1.value)) return new Type('VOID')
      return null
    }
  },
  array_insert_sorted: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.equals(p1.value)) return new Type('VOID')
      return null
    }
  },
  array_remove: {
    params: 1,
    statement: true,
    validate: function (p1) {
      if (p1.is('ARRAY')) return new Type('VOID')
      return null
    }
  },
  array_remove_at: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.is('INTEGER')) return new Type('VOID')
      return null
    }
  },
  array_sort: {
    params: 1,
    statement: true,
    validate: function (p1) {
      if (p1.is('ARRAY')) return new Type('VOID')
      return null
    }
  },
  array_find: {
    params: 2,
    statement: false,
    validate: function (p1, p2) {
      if (p1.isnt('ARRAY')) throw new Error(`First argument for 'array_find' must be an array (line ${this.node.args[0].position.row})`)
      if (p1.value.isnt('UDT')) {
        if (p1.value.equals(p2)) return new Type('INTEGER')
        throw new Error(`Expected ${p2} as second argument to 'array_find' (line ${this.node.args[0].position.row})`)
      }

      // `p1.value` is UDT
      const type = this.definitions.getType(p1.value.value)
      const firstField = type.fields[Object.keys(type.fields)[0]]
      if (!p2.equals(firstField)) throw new Error(`Expected ${firstField} as second argument to 'array_find' (line ${this.node.args[0].position.row})`)

      return new Type('INTEGER')
    }
  },
  array_save: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.is('STRING')) return new Type('VOID')
      return null
    }
  },
  array_load: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.is('ARRAY') && p2.is('STRING')) return new Type('VOID')
      return null
    }
  },
  to_json: {
    params: 1,
    statement: false,
    validate: function (p1) {
      if (p1.isnt('UDT') && p1.isnt('UNION') && p1.isnt('ARRAY')) throw new Error(`'to_json' can only be used on types and arrays, ${p1} given (line ${this.node.args[0].position.row})`)
      return new Type('STRING')
    }
  },
  from_json: {
    params: 2,
    statement: true,
    validate: function (p1, p2) {
      if (p1.isnt('UDT') && p1.isnt('UNION') && p1.isnt('ARRAY')) throw new Error(`'from_json' can only be used on types and arrays, ${p1} given (line ${this.node.args[0].position.row})`)
      if (p2.isnt('STRING')) throw new Error(`'from_json' second argument must be STRING, ${p1} given (line ${this.node.args[0].position.row})`)
      return new Type('VOID')
    }
  }
}

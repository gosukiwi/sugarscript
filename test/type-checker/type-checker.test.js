const expect = require('chai').expect
const parse = require('../../lib/parser/parser')
const TypeChecker = require('../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('Typechecker', function () {
  describe('function call', function () {
    it('calls a simple function', function () {
      const definitions = check(`
def foo()
  let a = 1
foo()
      `)

      expect(definitions.calls.foo.type.type).to.eq('VOID')
    })

    it('knows the type', function () {
      const definitions = check(`
def foo(): integer
  return 1
foo()
      `)

      expect(definitions.calls.foo.type.type).to.eq('INTEGER')
    })
  })

  describe('arrays', function () {
    it('can assign', function () {
      const definitions = check('let a = [1, 2, 3]')
      expect(definitions.variables.a.type.is('ARRAY')).to.eq(true)
      expect(definitions.variables.a.type.value.is('INTEGER')).to.eq(true)
    })

    it('can pass to function', function () {
      const definitions = check(`
def foo(arr: integer[])
  let a = 1
foo([1, 2, 3])
      `)
      expect(definitions.calls.foo.args[0].is('ARRAY')).to.eq(true)
    })

    it('can access', function () {
      const definitions = check(`
let names = ["fede", "marquete"]
let marquetteh = names[1]
      `)
      expect(definitions.variables.marquetteh.type.is('STRING')).to.eq(true)
    })

    it('can set an element of proper type', function () {
      expect(() => {
        check(`
let names = ["pepe luis"]
names[2] = "john smith junior tercero montenegro de la mancha"
        `)
      }).not.to.throw()
    })

    it('cannot set an element on a non-existant array', function () {
      expect(() => {
        check(`
let names = ["pepe luis"]
foo[2] = "john smith junior tercero montenegro de la mancha"
        `)
      }).to.throw(/Could not find/)
    })

    it('cannot set an element of a different type', function () {
      expect(() => {
        check(`
let names = ["pepe luis"]
names[2] = 2
        `)
      }).to.throw(/Cannot assign/)
    })

    it('can set nested array', function () {
      expect(() => {
        check(`
let names = [[1], [2, 3], [4]]
        `)
      }).not.to.throw()
    })
  })

  describe('scope', function () {
    it('cannot access outside function', function () {
      expect(() => {
        check(`
let a = 1
def foo()
  let b = a
        `)
      }).to.throw(/Could not find variable 'a'/)
    })

    it('can access outside if global', function () {
      expect(() => {
        check(`
let global a = 1
def foo()
  let b = a
        `)
      }).not.to.throw()
    })
  })
})

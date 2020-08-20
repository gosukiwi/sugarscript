const expect = require('chai').expect
const parser = require('../../lib/parser')
const TypeChecker = require('../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parser.parse(input.trim())
  return checker.check(ast)
}

describe.only('Typechecker', function () {
  describe('def', function () {
    it('works with an empty function', function () {
      const definitions = check('def greet()')

      expect(definitions.functions.greet.type.type).to.eq('VOID')
    })

    it('checks a function definition', function () {
      const definitions = check(`
def greet(person:Person[][]): integer
  return 2
      `)

      expect(definitions.functions.greet.type.type).to.eq('INTEGER')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('UDT')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.value).to.eq('Person')
      expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(2)
      expect(definitions.functions.greet.definitions.returns[0].type.type).to.eq('INTEGER')
    })

    it('checks a nested assignment', function () {
      const definitions = check(`
def greet(person: Person[])
  a = 2
      `)

      expect(definitions.functions.greet.type.type).to.eq('VOID')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('UDT')
      expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
      expect(definitions.functions.greet.definitions.variables.a.type.type).to.eq('INTEGER')
    })

    it('checks a nested function call', function () {
      const definitions = check(`
def foo()
def greet(person:integer[])
  foo()
      `)

      expect(definitions.functions.greet.type.type).to.eq('VOID')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('INTEGER')
      expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
    })
  })

  describe('function call', function () {
    it('calls a simple function', function () {
      const definitions = check(`
def foo()
foo()
      `)

      expect(definitions.calls.foo.type.type).to.eq('VOID')
    })

    it('knows the type', function () {
      const definitions = check(`
def foo(): integer
foo()
      `)

      expect(definitions.calls.foo.type.type).to.eq('INTEGER')
    })
  })

  describe('assign', function () {
    it('can assign', function () {
      const definitions = check(`
a = 1
b = 3.14
c = "Duchess"
      `)

      expect(definitions.variables.a.type.type).to.eq('INTEGER')
      expect(definitions.variables.b.type.type).to.eq('FLOAT')
      expect(definitions.variables.c.type.type).to.eq('STRING')
    })
  })

  describe('arrays', function () {
    it('can assign', function () {
      const definitions = check('a = [1, 2, 3]')
      expect(definitions.variables.a.type.type).to.eq('ARRAY')
      expect(definitions.variables.a.type.value).to.eq('INTEGER')
    })

    it('can pass to function', function () {
      const definitions = check(`
def foo(arr: integer[])
foo([1, 2, 3])
      `)
      expect(definitions.calls.foo.args[0].type).to.eq('ARRAY')
    })

    it('can access', function () {
      const definitions = check(`
names = ["fede", "marquete"]
marquetteh = names[1]
      `)
      expect(definitions.variables.marquetteh.type.type).to.eq('STRING')
    })

    it('can set an element of proper type', function () {
      expect(() => {
        check(`
names = ["pepe luis"]
names[2] = "john smith junior tercero montenegro de la mancha"
        `)
      }).not.to.throw()
    })

    it('cannot set an element on a non-existant array', function () {
      expect(() => {
        check(`
names = ["pepe luis"]
foo[2] = "john smith junior tercero montenegro de la mancha"
        `)
      }).to.throw(/Could not find/)
    })

    it('cannot set an element of a different type', function () {
      expect(() => {
        check(`
names = ["pepe luis"]
names[2] = 2
        `)
      }).to.throw(/Cannot assign 'INTEGER' to an array of 'STRING'/)
    })
  })
})

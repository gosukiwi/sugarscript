const expect = require('chai').expect
const parse = require('../../lib/parser/parser')
const TypeChecker = require('../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('Typechecker', function () {
  describe('def', function () {
    it('checks a function definition', function () {
      const definitions = check(`
def greet(person: Person[]): integer
  return 2
      `)

      expect(definitions.functions.greet.type.type).to.eq('INTEGER')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('UDT')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.value).to.eq('Person')
      expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
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
  a = 1

def greet(person: integer[])
  foo()
      `)

      expect(definitions.functions.greet.type.type).to.eq('VOID')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
      expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('INTEGER')
      expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
    })

    it('complains if it returns an invalid type', function () {
      expect(() => {
        check(`
def greet(person: Person): integer
  return person
          `)
      }).to.throw(/Function was defined as 'INTEGER'/)
    })

    it('complains if it returns an invalid UDT', function () {
      expect(() => {
        check(`
def greet(person: Person): Cat
  return person
          `)
      }).to.throw(/Function was defined as '<UDT: Cat>'/)
    })

    it('returns a UDT', function () {
      expect(() => {
        check(`
def greet(person: Person): Person
  return person
          `)
      }).not.to.throw(/Function was defined as 'INTEGER'/)
    })
  })

  describe('function call', function () {
    it('calls a simple function', function () {
      const definitions = check(`
def foo()
  a = 1
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
      expect(definitions.variables.a.type.is('ARRAY')).to.eq(true)
      expect(definitions.variables.a.type.value.is('INTEGER')).to.eq(true)
    })

    it('can pass to function', function () {
      const definitions = check(`
def foo(arr: integer[])
  a = 1
foo([1, 2, 3])
      `)
      expect(definitions.calls.foo.args[0].is('ARRAY')).to.eq(true)
    })

    it('can access', function () {
      const definitions = check(`
names = ["fede", "marquete"]
marquetteh = names[1]
      `)
      expect(definitions.variables.marquetteh.type.is('STRING')).to.eq(true)
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
      }).to.throw(/Cannot assign/)
    })
  })

  describe('let', function () {
    it('can define a primitive', function () {
      const definitions = check('let person: integer')
      expect(definitions.variables.person.type.is('INTEGER')).to.eq(true)
    })

    it('can define a type', function () {
      const definitions = check('let person: tPerson')
      expect(definitions.variables.person.type.is('UDT')).to.eq(true)
      expect(definitions.variables.person.type.value).to.eq('tPerson')
    })

    it('can define an array', function () {
      const definitions = check('let person: tPerson[]')
      expect(definitions.variables.person.type.is('ARRAY')).to.eq(true)
      expect(definitions.variables.person.type.value.type).to.eq('UDT')
      expect(definitions.variables.person.type.dimensions).to.eq(1)
    })
  })
})

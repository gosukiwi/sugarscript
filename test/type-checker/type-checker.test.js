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

      expect(definitions.functions.greet.type).to.eq('VOID')
    })

    it('checks a function definition', function () {
      const definitions = check(`
def greet(person:Person[]): integer
  return 2
      `)

      expect(definitions.functions.greet.type).to.eq('INTEGER')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type).to.eq('Person')
      expect(definitions.functions.greet.definitions.returns[0].type).to.eq('INTEGER')
    })

    it('checks a nested assignment', function () {
      const definitions = check(`
def greet(person:Person[])
  a = 2
      `)

      expect(definitions.functions.greet.type).to.eq('VOID')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type).to.eq('Person')
      expect(definitions.functions.greet.definitions.variables.a.type).to.eq('INTEGER')
    })

    it('checks a nested function call', function () {
      const definitions = check(`
def foo()
def greet(person:Person[])
  foo()
      `)

      expect(definitions.functions.greet.type).to.eq('VOID')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type).to.eq('Person')
    })
  })

  describe('function call', function () {
    it('calls a simple function', function () {
      const definitions = check(`
def foo()
foo()
      `)

      expect(definitions.calls.foo.type).to.eq('VOID')
    })

    it('knows the type', function () {
      const definitions = check(`
def foo(): integer
foo()
      `)

      expect(definitions.calls.foo.type).to.eq('INTEGER')
    })
  })

  describe('assign', function () {
    it('can assign', function () {
      const definitions = check(`
a = 1
b = 3.14
c = "Duchess"
      `)

      expect(definitions.variables.a.type).to.eq('INTEGER')
      expect(definitions.variables.b.type).to.eq('FLOAT')
      expect(definitions.variables.c.type).to.eq('STRING')
    })
  })
})

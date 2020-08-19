const expect = require('chai').expect
const parser = require('../../lib/parser')
const Codegen = require('../../lib/codegen/codegen')

function generate (sourcecode) {
  const ast = parser.parse(sourcecode.trim())
  return new Codegen().call(ast)
}

describe('Codegen', function () {
  describe('#call', function () {
    describe('def', function () {
      it('works with a function with no parameters', function () {
        const result = generate(`
def greet()
        `)

        expect(result).to.contain('function greet()')
      })

      it('works with a simple function', function () {
        const result = generate(`
def greet(name:string, person:ref:Person)
        `)

        expect(result).to.contain('function greet(name as string, person ref as Person)')
        expect(result).to.contain('endfunction')
      })

      it('works with an array and a ref parameter', function () {
        const result = generate(`
def greet(person:ref:Person[][])
        `)

        expect(result).to.contain('function greet(person ref as Person[][])')
        expect(result).to.contain('endfunction')
      })

      it('works with an array parameter', function () {
        const result = generate(`
def greet(person:Person[])
        `)

        expect(result).to.contain('function greet(person as Person[])')
      })

      it('can return a value', function () {
        const result = generate(`
def greet(person:Person[]): integer
  return 2
        `)

        expect(result).to.contain('exitfunction 2')
        expect(result).to.contain('endfunction 0')
      })
    })

    describe('function call', function () {
      it('calls a function with no arguments', function () {
        const result = generate(`
def greet()
greet()
        `)

        expect(result).to.contain('greet()')
      })

      it('calls a function with an argument', function () {
        const result = generate(`
def greet(name: string)
greet("Mike")
        `)

        expect(result).to.contain('greet("Mike")')
      })

      it('calls a function with many arguments', function () {
        const result = generate(`
def greet(name: string, age: integer)
greet("Mike", 18)
        `)

        expect(result).to.contain('greet("Mike", 18)')
      })
    })

    describe('assignment', function () {
      it('assigns an integer', function () {
        const result = generate(`
          a = 1
        `)

        expect(result).to.contain('a as integer')
        expect(result).to.contain('a = 1')
      })
    })
  })
})

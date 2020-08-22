const expect = require('chai').expect
const parser = require('../../lib/parser')
const Codegen = require('../../lib/codegen/codegen')

function generate (sourcecode) {
  const ast = parser.parse(sourcecode.trim())
  return new Codegen().generate(ast)
}

describe('Codegen', function () {
  describe('#call', function () {
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
        const result = generate('a = 1')

        expect(result).to.contain('a as integer')
        expect(result).to.contain('a = 1')
      })
    })
  })
})

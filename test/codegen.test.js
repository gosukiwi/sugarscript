const expect = require('chai').expect
const parser = require('../lib/parser')
const Codegen = require('../lib/codegen')

describe('Codegen', function () {
  describe('#call', function () {
    describe('DEF', function () {
      it('compiles properly', function () {
        const ast = parser.parse('(def greet (name :string) (print name))')
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.eq('Hello')
      })
    })
  })
})

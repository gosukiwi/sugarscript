const expect = require('chai').expect
const parser = require('../../lib/parser')
const Codegen = require('../../lib/codegen/codegen')

function generate (sourcecode) {
  const ast = parser.parse(sourcecode.trim())
  return new Codegen().generate(ast)
}

describe('Codegen', function () {
  describe('assignment', function () {
    it('assigns an integer', function () {
      const result = generate('a = 1')

      expect(result).to.contain('a as integer')
      expect(result).to.contain('a = 1')
    })
  })
})

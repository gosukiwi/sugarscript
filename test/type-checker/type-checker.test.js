const expect = require('chai').expect
const parser = require('../../lib/parser')
const TypeChecker = require('../../lib/type-checker/type-checker')

describe('Typechecker', function () {
  describe('#check', function () {
    it('checks a function definition', function () {
      const checker = new TypeChecker()
      const ast = parser.parse(`
def greet(person:Person[])
  return 2
      `.trim())

      const definitions = checker.check(ast)

      expect(definitions.functions.greet.type).to.eq('INTEGER')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.parameters[0].type).to.eq('Person')
      expect(definitions.functions.greet.body[0].name).to.eq('RETURN')
    })
  })
})

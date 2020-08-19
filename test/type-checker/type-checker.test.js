const expect = require('chai').expect
const parser = require('../../lib/parser')
const TypeChecker = require('../../lib/type-checker/type-checker')

describe.only('Typechecker', function () {
  describe('#check', function () {
    it('checks a function definition', function () {
      const checker = new TypeChecker()
      const ast = parser.parse(`
def greet(person:Person[]): integer
  return 2
      `.trim())

      const definitions = checker.check(ast)

      expect(definitions.functions.greet.type).to.eq('INTEGER')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type).to.eq('Person')
      expect(definitions.functions.greet.definitions.returns[0].type).to.eq('INTEGER')
    })

    it('checks a nested assignment', function () {
      const checker = new TypeChecker()
      const ast = parser.parse(`
def greet(person:Person[])
  a = 2
      `.trim())

      const definitions = checker.check(ast)

      expect(definitions.functions.greet.type).to.eq('VOID')
      expect(definitions.functions.greet.functionName).to.eq('greet')
      expect(definitions.functions.greet.definitions.parameters.person.type).to.eq('Person')
      expect(definitions.functions.greet.definitions.variables.a.type).to.eq('INTEGER')
    })
  })
})

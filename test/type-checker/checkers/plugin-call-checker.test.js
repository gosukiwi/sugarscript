const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/plugin-call', function () {
  it('works', function () {
    const definitions = check('import_plugin potato\nlet a = potato::foo(): integer')
    expect(definitions.getVariable('a').type.is('INTEGER')).to.eq(true)
  })

  it('cannot call a function in a plugin that wasnt imported', function () {
    expect(() => check('let a = potato::foo(): integer')).to.throw(/Could not find plugin: 'potato'/)
  })
})

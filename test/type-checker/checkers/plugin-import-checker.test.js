const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/plugin-import', function () {
  it('works', function () {
    const definitions = check('import_plugin potato')
    expect(definitions.getPlugin('potato').name).to.eq('potato')
  })
})

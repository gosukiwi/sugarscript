const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/plugin-call', function () {
  it('works without arguments', function () {
    const result = generate('import_plugin potato\nlet a = potato::foo(): integer')
    expect(result).to.contain('potato.foo()')
  })

  it('works with arguments', function () {
    const result = generate('import_plugin potato\nlet a = potato::foo(1, 2, 3): integer')
    expect(result).to.contain('potato.foo(1, 2, 3)')
  })
})

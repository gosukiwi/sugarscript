const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/import-plugin', function () {
  it('works', function () {
    const result = generate('import_plugin potato')
    expect(result).to.contain('#import_plugin potato as potato')
  })
})

const path = require('path')
const fs = require('fs')
const expect = require('chai').expect
const Compiler = require('../../lib/compiler/compiler')

describe('compiler/compiler', function () {
  it('generates an output file', function () {
    const compiler = new Compiler()
    compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'main.ss') })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('foo()')
    expect(output).to.contain('bar()')
    expect(output).to.contain('baz()')
  })
})

const path = require('path')
const fs = require('fs')
const expect = require('chai').expect
const Compiler = require('../../lib/compiler/compiler')

describe('compiler/compiler', function () {
  it('generates an output file', async function () {
    const compiler = new Compiler()
    await compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'main.ss') })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('foo()')
    expect(output).to.contain('bar()')
    expect(output).to.contain('baz()')
    expect(fs.existsSync(path.join(__dirname, '..', 'fixtures', 'media', 'bytecode.byc'))).to.eq(true)
  })

  it('can handle circular dependencies', async function () {
    const compiler = new Compiler()
    await compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'a.ss') })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('b()')
  })

  it('does not include itself', async function () {
    const compiler = new Compiler()
    await compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'c.ss') })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('c()')
  })

  it.only('can include remote files', async function () {
    const compiler = new Compiler()
    await compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'remote.ss') })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('function foo')
  })
})

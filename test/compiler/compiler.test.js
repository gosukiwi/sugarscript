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

  it('can include types', async function () {
    const compiler = new Compiler()
    await compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'includes-udt.ss') })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('type Foo')
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

  it('can include remote files', async function () {
    const compiler = new Compiler()
    await compiler.compile({
      entry: path.join(__dirname, '..', 'fixtures', 'remote.ss'),
      clearRemoteCache: true
    })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('function foo')
  })

  it('can include remote files and those files can include other remote files', async function () {
    const compiler = new Compiler()
    await compiler.compile({
      entry: path.join(__dirname, '..', 'fixtures', 'remote-recursive.ss'),
      clearRemoteCache: true
    })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('function foo')
    expect(output).to.contain('function another')
  })

  it('can include remote files that include other relative files', async function () {
    const compiler = new Compiler()
    await compiler.compile({
      entry: path.join(__dirname, '..', 'fixtures', 'remote-relative.ss'),
      clearRemoteCache: true
    })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('function bfunc')
  })

  it('can include remote files and then back to regular files', async function () {
    const compiler = new Compiler()
    await compiler.compile({
      entry: path.join(__dirname, '..', 'fixtures', 'remote-and-local.ss'),
      clearRemoteCache: true
    })

    const output = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'main.agc')).toString()
    expect(output).to.contain('function bfunc')
    expect(output).to.contain('function c')
  })

  it('can handle non-existant remote files', async function () {
    const compiler = new Compiler()
    let err = null
    try {
      await compiler.compile({
        entry: path.join(__dirname, '..', 'fixtures', 'remote-non-existant.ss'),
        clearRemoteCache: true
      })
    } catch (error) {
      err = error
    }

    expect(err.message).to.contain('Could not find file: https://non-existant.com/fo/bar/baz')
  })
})

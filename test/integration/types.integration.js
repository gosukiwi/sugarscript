const expect = require('chai').expect
const Compiler = require('../../lib/compiler/compiler')
const { spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const AGKDIR = 'C:\\Users\\Federico\\AppData\\Local\\AGKApps\\input\\media'

describe('types', function () {
  it.only('works', async function () {
    const compiler = new Compiler()
    await compiler.compile({ entry: path.join(__dirname, '..', 'fixtures', 'input', 'types.ss') })
    spawnSync(path.join(__dirname, '..', 'fixtures', 'input', 'input.exe')) // TODO: This only works on Windows

    expect(fs.readFileSync(path.join(AGKDIR, 'output.txt')).toString()).to.contain('Person name is Federico, age is #{p.age}')
  })
})

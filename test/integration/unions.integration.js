const expect = require('chai').expect
const Compiler = require('../../lib/compiler/compiler')
const { spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const AGKDIR = 'C:\\Users\\Federico\\AppData\\Local\\AGKApps\\integration\\media'

describe('unions', function () {
  it('works', async function () {
    const compiler = new Compiler()
    const input = path.join(__dirname, '..', 'fixtures', 'integration', 'unions.ss')
    const output = path.join(__dirname, '..', 'fixtures', 'integration', 'unions.output.txt')
    await compiler.compile({ entry: input })
    spawnSync(path.join(__dirname, '..', 'fixtures', 'integration', 'integration.exe')) // TODO: This only works on Windows

    expect(fs.readFileSync(path.join(AGKDIR, 'output.txt')).toString()).to.contain(fs.readFileSync(output).toString().trim())
  })
})

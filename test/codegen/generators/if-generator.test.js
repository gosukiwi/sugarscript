const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/if', function () {
  it('generates a single if', function () {
    const result = generate('if 1\n  let a = 1')
    expect(result).to.contain('if 1\na as integer\na = 1\nendif')
  })

  it('generates an if-else', function () {
    const result = generate(`
let a:integer
if 1
  a = 1
else
  a = 2
    `)

    expect(result).to.contain(`
a as integer
if 1
a = 1
else
a = 2
endif
    `.trim())
  })

  it('generates an if-elif', function () {
    const result = generate(`
let a:integer
if 1
  a = 1
elif 2
  a = 2
    `)

    expect(result).to.contain(`
a as integer
if 1
a = 1
elseif 2
a = 2
endif
    `.trim())
  })

  it('generates an if-elif-else', function () {
    const result = generate(`
let a:integer
if 1
  a = 1
elif 2
  a = 2
else
  a = 3
    `)

    expect(result).to.contain(`
a as integer
if 1
a = 1
elseif 2
a = 2
else
a = 3
endif
    `.trim())
  })

  it('generates a nested if', function () {
    const result = generate(`
let a:integer
if 1
  if 1
    a = 1
  a = 2
    `)

    expect(result).to.contain(`
a as integer
if 1
if 1
a = 1
endif
a = 2
endif
    `.trim())
  })
})

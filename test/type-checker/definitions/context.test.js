const Context = require('../../../lib/type-checker/definitions/context')
const expect = require('chai').expect

describe('Context', function () {
  it('loads built-in functions in global context', function () {
    const context = new Context()
    expect(context.builtin.CreateSprite).not.to.eq(undefined)
  })
})

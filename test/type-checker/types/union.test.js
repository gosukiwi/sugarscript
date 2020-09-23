const Union = require('../../../lib/type-checker/types/union')
const expect = require('chai').expect

describe('Union', function () {
  describe('equals', function () {
    it('returns true when equal', function () {
      const type1 = new Union('Shape', ['Foo', 'Bar'])
      const type2 = new Union('Shape', ['Foo', 'Bar'])

      expect(type1.equals(type2)).to.eq(true)
    })

    it('order doesnt matter', function () {
      const type1 = new Union('Shape', ['Foo', 'Bar'])
      const type2 = new Union('Shape', ['Bar', 'Foo'])

      expect(type1.equals(type2)).to.eq(true)
    })

    it('does not allow repeated udts', function () {
      expect(() => new Union('Shape', ['Foo', 'Foo'])).to.throw(/Cannot have duplicated UDTs/)
    })

    it('returns false when not equal', function () {
      const type1 = new Union('Shape', ['Foo', 'Bar'])
      const type2 = new Union('Shape', ['Taz', 'Daz'])

      expect(type1.equals(type2)).to.eq(false)
    })

    it('returns false when different amount', function () {
      const type1 = new Union('Shape', ['Foo', 'Bar'])
      const type2 = new Union('Shape', ['Foo'])

      expect(type1.equals(type2)).to.eq(false)
    })
  })

  describe('serialize', function () {
    it('works', function () {
      const type = new Union('Shape', ['Foo', 'Bar'])
      expect(type.serialize()).to.eq('UNION_OF_Foo_AND_Bar')
    })
  })

  describe('toString', function () {
    it('works', function () {
      const type = new Union('Shape', ['Foo', 'Bar'])
      expect(type.toString()).to.eq('<UNION: Foo, Bar>')
    })
  })
})

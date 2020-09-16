const parser = require('../../parser/parser')
const Type = require('../types/type')

// Double-quoted string checker
class StringChecker {
  check ({ node, checker, definitions }) {
    node.interpolations = node.interpolations.map((interpolation) => {
      let node = null
      try {
        node = parser(`a = ${interpolation}`)[0].rhs // this is an expression, this is a hacky way to parse it
      } catch (err) {
        throw new Error(`Invalid expression: ${err}`)
      }

      const type = checker.checkOne({ node, definitions })
      if (!type.isNumber() && !type.is('STRING')) throw new Error(`Can only interpolate INTEGER, FLOAT and STRING, ${type} given (${checker.file} at line ${node.position.row})`)

      return { node, type }
    })

    return new Type(node.type)
  }
}

module.exports = StringChecker

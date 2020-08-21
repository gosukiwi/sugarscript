const ArrayType = require('../types/array')
class InlineArrayChecker {
  check ({ node, checker, definitions }) {
    let type = null
    node.items.forEach((node) => {
      const nodeType = checker.checkOne({ node, definitions })
      if (type === null) {
        type = nodeType
        return
      }

      if (!type.equals(nodeType)) {
        throw new Error(`All elements in an array must be the same type. Started as ${type}, but then found ${nodeType}.`)
      }
    })

    if (type === null) throw new Error('Type cannot be null: Inline array must contain at least one element in order to guess the type.')

    return new ArrayType({ value: type, dimensions: 1 })
  }
}

module.exports = InlineArrayChecker

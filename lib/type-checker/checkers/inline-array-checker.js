const ArrayType = require('../types/array')
class InlineArrayChecker {
  check ({ node, checker, definitions }) {
    let type = node.typehint
    node.elements.forEach((node) => {
      const nodeType = checker.checkOne({ node, definitions })
      if (type === null) {
        type = nodeType
        return
      }

      if (!nodeType.equals(type)) {
        throw new Error(`All elements in an array must be the same type. Started as ${type}, but then found ${nodeType} (${checker.file} at line ${node.position.row})`)
      }
    })

    if (type === null) throw new Error(`Could not guess type for inline array: Either add a typehint or define an array with one element (${checker.file} at line ${node.position.row})`)

    const arrayType = new ArrayType({ value: type, dimensions: 1 })
    node.typehint = arrayType

    return arrayType
  }
}

module.exports = InlineArrayChecker

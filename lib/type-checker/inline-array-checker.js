class InlineArrayChecker {
  check (node, checker, definitions) {
    let type = 'VOID'
    node.items.forEach((node) => {
      const nodeType = checker.checkOne(node, definitions).type
      if (type === 'VOID') {
        type = nodeType
      } else if (type !== nodeType) {
        throw new Error(`All elements in an array must be the same type. Was ${type}, found ${nodeType}.`)
      }
    })

    return { type: 'INLINE_ARRAY', value: type, dimensions: 1, name: 'LITERAL' }
  }
}

module.exports = InlineArrayChecker

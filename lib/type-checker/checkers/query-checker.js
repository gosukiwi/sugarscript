class QueryChecker {
  check ({ node, definitions, checker }) {
    return this.getType({ parts: node.parts, checker, definitions })
  }

  // private

  getType ({ parts, definitions, checker, accu }) {
    if (parts.length === 0) return accu || null

    const head = parts[0]
    const name = head.type === 'IDENTIFIER' ? head.value : head.identifier

    // second+ call
    if (accu) {
      if (!accu.is('UDT')) throw new Error(`Cannot access field '${name}' for type ${accu}`)

      const typedefinition = definitions.getType(accu.value)
      if (typedefinition === null) throw new Error(`Could not find type: '${accu.value}'`)

      let type = definitions.getType(accu.value).getField(name)
      if (head.type === 'ARRAY_ACCESS') {
        head.index.forEach((index) => {
          if (checker.checkOne({ node: index, definitions }).isnt('INTEGER')) throw new Error(`Array access must be INTEGER, '${index.type}' given`)

          type = type.value
        })
      }

      return this.getType({ parts: parts.slice(1), definitions, checker, accu: type })
    }

    // first call
    const definition = definitions.getVariable(name)
    if (definition === null) throw new Error(`Could not find variable '${name}'. Was it defined?`)

    let type = definition.type
    if (head.type === 'ARRAY_ACCESS') {
      head.index.forEach((index) => {
        if (checker.checkOne({ node: index, definitions }).isnt('INTEGER')) throw new Error(`Array access must be INTEGER, '${index.type}' given`)

        type = type.value
      })
    }

    return this.getType({ parts: parts.slice(1), definitions, checker, accu: type })
  }
}

module.exports = QueryChecker

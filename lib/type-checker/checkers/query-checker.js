class QueryChecker {
  check ({ node, definitions }) {
    return this.checkParts(node.parts, definitions, null, null)
  }

  // private

  checkParts (parts, definitions, initial, matched) {
    if (parts.length === 0) {
      if (matched === null) throw new Error('Could not find any type')
      return matched
    }

    const type = this.checkPart(parts[0], definitions, initial)
    return this.checkParts(parts.slice(1), definitions, type, type)
  }

  checkPart (node, definitions, initial) {
    if (node.type === 'IDENTIFIER') {
      if (initial === null) {
        const identifier = definitions.getVariable(node.value)
        if (identifier === null) throw new Error(`Could not find variable '${node.value}'`)
        return identifier.type
      } else { // it's a type access
        throw new Error('TYPES NOT IMPLEMENTED YET')
      }
    } else if (node.type === 'ARRAY_ACCESS') {
      if (initial === null) {
        const array = definitions.getVariable(node.identifier)
        if (array === null) throw new Error(`Could not find array '${node.identifier}'`)
        if (array.type.isnt('ARRAY')) throw new Error(`Cannot use array-access on a type other than an array: '${node.identifier}' is '${array.type}'`)

        return array.type.value
      } else { // it's a type
        // look in the type
        throw new Error('TYPES NOT IMPLEMENTED YET')
      }
    }

    throw new Error(`Invalid query part: '${node.type}'`)
  }
}

module.exports = QueryChecker

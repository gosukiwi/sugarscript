const UDT = require('../types/udt')
const Union = require('../types/union')
const UnionDefinition = require('../definitions/union-definition')

class UnionChecker {
  check ({ node, checker, definitions }) {
    const definition = new UnionDefinition(node.name)

    const udts = node.types.map((identifier) => {
      if (!definitions.hasType(identifier.value)) throw new Error(`Could not find UDT '${identifier.value}' (${checker.file} at line ${identifier.position.row})`)

      definition.addUDT(identifier.value)
      return new UDT(identifier.value)
    })

    definitions.addUnion(definition)
    return new Union(node.name, udts)
  }
}

module.exports = UnionChecker

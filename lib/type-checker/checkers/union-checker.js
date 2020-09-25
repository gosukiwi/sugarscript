const builder = require('../types/builder')
const UDT = require('../types/udt')
const UnionDefinition = require('../definitions/union-definition')

class UnionChecker {
  check ({ node, checker, definitions }) {
    const definition = new UnionDefinition(node.name)

    node.types.map((identifier) => {
      if (!definitions.hasType(identifier.value)) throw new Error(`Could not find UDT '${identifier.value}' (${checker.file} at line ${identifier.position.row})`)

      definition.addUDT(identifier.value)
      return new UDT(identifier.value)
    })

    definitions.addType(definition)
    return builder.void()
  }
}

module.exports = UnionChecker

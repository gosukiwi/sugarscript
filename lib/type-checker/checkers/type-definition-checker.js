const TypeDefinition = require('../definitions/type-definition')
const builder = require('../types/builder')
const validate = require('../validate-udt')

class TypeDefinitionChecker {
  check ({ node, checker, definitions }) {
    if (definitions.hasType(node.name)) throw new Error(`Type ${node.name} already exists`)

    const definition = new TypeDefinition(node.name)
    node.fields.forEach((field) => {
      validate(field.typehint, definitions)
      definition.addField({ name: field.name, type: field.typehint })
    })
    // definitions.types[node.name] = definition
    definitions.addType(definition)

    return builder.void()
  }
}

module.exports = TypeDefinitionChecker

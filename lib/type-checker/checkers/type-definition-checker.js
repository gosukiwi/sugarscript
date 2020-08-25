const TypeDefinition = require('../definitions/type-definition')
const builder = require('../types/builder')

class TypeDefinitionChecker {
  check ({ node, checker, definitions }) {
    if (definitions.hasType(node.name)) throw new Error(`Type ${node.name} already exists`)

    const definition = new TypeDefinition(node.name)
    node.fields.forEach((field) => {
      if (field.typehint.is('UDT') && !definitions.hasType(field.typehint.value)) throw new Error(`Could not find type: '${field.typehint}'`)
      definition.addField({ name: field.name, type: field.typehint })
    })
    definitions.types[node.name] = definition

    return builder.void()
  }
}

module.exports = TypeDefinitionChecker

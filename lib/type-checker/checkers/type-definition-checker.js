const TypeDefinition = require('../definitions/type-definition')
const builder = require('../types/builder')
const validate = require('../validate-udt')

class TypeDefinitionChecker {
  check ({ node, checker, definitions }) {
    const name = node.name.value
    if (definitions.hasType(name)) throw new Error(`Type ${name} already exists (${checker.file} at line ${node.name.position.row})`)

    const definition = new TypeDefinition(name)
    node.fields.forEach((field) => {
      validate(field.typehint, definitions)
      definition.addField({ name: field.name, type: field.typehint })
    })
    definitions.addType(definition)

    return builder.void()
  }
}

module.exports = TypeDefinitionChecker

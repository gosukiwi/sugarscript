const typegen = require('../type-generator')

class TypeDefinitionGenerator {
  generate ({ node, generator, definitions, snippet }) {
    snippet.append(`// ${generator.filename}, line ${node.name.position.row}\n`)
    snippet.append(`type ${node.name.value}\n`)
    node.fields.forEach((field) => snippet.append(`${field.name} as ${typegen(field.typehint)}\n`))
    snippet.append('endtype\n\n')
  }
}

module.exports = TypeDefinitionGenerator

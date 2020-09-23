const UDT = require('../types/udt')

class InlineTypeChecker {
  check ({ node, definitions, checker }) {
    const type = definitions.getType(node.typeName.value)
    if (type === null) throw new Error(`Could not find type: '${node.typeName.value}' (${checker.file} at line ${node.position.row})`)

    node.fields.forEach((field) => {
      const fieldName = field.name.value
      const fieldType = checker.checkOne({ node: field.value, definitions })
      const typeField = type.fields[fieldName]
      if (typeField === undefined) throw new Error(`Field '${fieldName}' not found for type ${node.typeName.value} (${checker.file} at line ${node.position.row})`)

      if (!typeField.equals(fieldType)) throw new Error(`Field '${fieldName}' must be ${type.fields[fieldName]} (${checker.file} at line ${node.position.row})`)
    })

    return new UDT(node.typeName.value)
  }
}

module.exports = InlineTypeChecker

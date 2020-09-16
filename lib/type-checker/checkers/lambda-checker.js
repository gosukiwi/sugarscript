const validate = require('../validate-udt')
const scope = require('../scope')
const Context = require('../definitions/context')
const LambdaDefinition = require('../definitions/lambda-definition')
const Type = require('../types/type')

class LambdaChecker {
  check ({ node, definitions, checker }) {
    scope.enter('lambda')

    const babycontext = new Context(definitions)
    const returnType = node.typehint
    validate(returnType, definitions)

    const names = []
    let allowOnlyDefaults = false
    node.parameters.forEach((node) => {
      if (names.includes(node.name)) throw new Error(`Parameter '${node.name}' already specified (${checker.file} at line ${node.position.row - 1})`)
      names.push(node.name)

      const type = checker.checkOne({ node, definitions: babycontext })
      validate(type, definitions)

      if (node.default === null && allowOnlyDefaults) throw new Error(`Must provide a default value for '${node.name}', as it comes after a default value (${checker.file} at line ${node.position.row - 1})`)

      if (node.default !== null) {
        allowOnlyDefaults = true
        const defaultValueType = checker.checkOne({ node: node.default, definitions: babycontext })
        if (!defaultValueType.equals(type)) throw new Error(`Parameter '${node.name}' was defined as ${type}, it cannot have a default value of type ${node.default.type} (${checker.file} at line ${node.position.row - 1})`)
      }
    })
    node.body.forEach((node) => checker.checkOne({ node, definitions: babycontext }))

    babycontext.returns.forEach((returnDefinition) => {
      if (!returnDefinition.type.equals(returnType)) {
        throw new Error(`Function was defined as '${returnType}', it cannot return '${returnDefinition.type}' (${checker.file} at line ${node.position.row - 1})`)
      }
    })

    const definition = new LambdaDefinition({ definitions: babycontext, type: returnType })
    definitions.add(definition)
    node.id = definition.id

    scope.leave()
    return new Type('INTEGER')
  }
}

module.exports = LambdaChecker

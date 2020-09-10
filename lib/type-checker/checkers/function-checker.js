const Definitions = require('../definitions/repository')
const FunctionDefinition = require('../definitions/function-definition')
const validate = require('../validate-udt')

class FunctionChecker {
  check ({ node, checker, definitions }) {
    if (definitions.getFunction(node.name)) throw new Error(`Function '${node.name}' already exists.`)

    const babycontext = new Definitions(definitions)
    const returnType = node.returnType
    validate(returnType, definitions)

    const names = []
    let allowOnlyDefaults = false
    node.params.forEach((node) => {
      if (names.includes(node.name)) throw new Error(`Parameter '${node.name}' already specified.`)
      names.push(node.name)

      const type = checker.checkOne({ node, definitions: babycontext })
      validate(type, definitions)

      if (node.default === null && allowOnlyDefaults) throw new Error(`Must provide a default value for '${node.name}', as it comes after a default value`)

      if (node.default !== null) {
        allowOnlyDefaults = true
        const defaultValueType = checker.checkOne({ node: node.default, definitions: babycontext })
        if (!defaultValueType.equals(type)) throw new Error(`Parameter '${node.name}' was defined as ${type}, it cannot have a default value of type ${node.default.type}`)
      }
    })
    node.body.forEach((node) => checker.checkOne({ node, definitions: babycontext }))

    babycontext.returns.forEach((returnDefinition) => {
      if (!returnDefinition.type.equals(node.returnType)) {
        throw new Error(`Function was defined as '${node.returnType}', it cannot return '${returnDefinition.type}'`)
      }
    })

    definitions.add(new FunctionDefinition({
      definitions: babycontext,
      functionName: node.name,
      type: returnType
    }))

    return returnType
  }
}

module.exports = FunctionChecker

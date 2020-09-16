const Context = require('../definitions/context')
const FunctionDefinition = require('../definitions/function-definition')
const validate = require('../validate-udt')
const scope = require('../scope')

class FunctionChecker {
  check ({ node, checker, definitions }) {
    scope.enter('function')
    if (definitions.getFunction(node.name)) throw new Error(`Function '${node.name}' already exists (${checker.file} at line ${node.position.row - 1})`)
    if (definitions.getVariable(node.name)) throw new Error(`Variable '${node.name}' already exists (${checker.file} at line ${node.position.row - 1})`)

    const babycontext = new Context(definitions)
    const returnType = node.returnType
    validate(returnType, definitions)

    const names = []
    let allowOnlyDefaults = false
    node.params.forEach((node) => {
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
      if (!node.returnType.equals(returnDefinition.type)) {
        throw new Error(`Function was defined as '${node.returnType}', it cannot return '${returnDefinition.type}' (${checker.file} at line ${node.position.row - 1})`)
      }
    })

    definitions.add(new FunctionDefinition({
      definitions: babycontext,
      functionName: node.name,
      type: returnType
    }))

    scope.leave()
    return returnType
  }
}

module.exports = FunctionChecker

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
    node.params.forEach((node) => {
      if (names.includes(node.name)) throw new Error(`Parameter '${node.name}' already specified.`)
      names.push(node.name)

      const type = checker.checkOne({ node, definitions: babycontext })
      validate(type, definitions)
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

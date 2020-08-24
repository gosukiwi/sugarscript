const Definitions = require('../definitions/repository')
const FunctionDefinition = require('../definitions/function-definition')

class FunctionChecker {
  check ({ node, checker, definitions }) {
    const babycontext = new Definitions(definitions)
    const returnType = node.returnType
    node.params.forEach((node) => checker.checkOne({ node, definitions: babycontext }))
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

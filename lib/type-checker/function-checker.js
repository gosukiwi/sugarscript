const Definitions = require('./definitions/repository')
const FunctionDefinition = require('./definitions/function-definition')
const builder = require('./types/builder')

class FunctionChecker {
  check ({ node, checker, definitions }) {
    // TODO: if (definitions.hasFunction(node.name)) throw new Error("Function already exists")
    // TODO: Check in body if we have more than 1 return type and they don't match
    // Check variable definitions are consistent

    const babycontext = new Definitions(definitions)
    if (node.args !== null) { // populate context if needed
      node.args.params.forEach((stmt) => checker.checkOne({ node: stmt, definitions: babycontext }))
    }

    const returnType = builder.build({ type: node.returnType.type, array: node.returnType.array })
    node.body.forEach((stmt) => checker.checkOne({ node: stmt, definitions: babycontext }))

    babycontext.returns.forEach((returnDefinition) => {
      if (!returnDefinition.type.equals(returnType)) {
        throw new Error(`Function was defined as '${returnType}', it cannot return '${returnDefinition.type}'`)
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

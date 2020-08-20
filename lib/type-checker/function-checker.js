const Definitions = require('./definitions')
const asParser = require('./util/as-parser')

class FunctionChecker {
  check (node, checker, definitions) {
    // TODO: if (definitions.hasFunction(node.name)) throw new Error("Function already exists")
    // TODO: Check in body if we have more than 1 return type and they don't match
    // Check variable definitions are consistent

    const babycontext = new Definitions(definitions)
    node.body.map((stmt) => checker.checkOne(stmt, babycontext)).filter((type) => type)
    if (node.args !== null) {
      node.args.params.map((stmt) => checker.checkOne(stmt, babycontext))
    }

    return {
      name: 'FUNCTION_DEFINITION',
      definitions: babycontext,
      functionName: node.name,
      type: asParser(node.returnType.type, node.returnType.array)
    }
  }
}

module.exports = FunctionChecker

const Definitions = require('./definitions')
const asParser = require('./util/as-parser')
const typeToString = require('./util/type-to-string')

class FunctionChecker {
  check (node, checker, definitions) {
    // TODO: if (definitions.hasFunction(node.name)) throw new Error("Function already exists")
    // TODO: Check in body if we have more than 1 return type and they don't match
    // Check variable definitions are consistent

    const babycontext = new Definitions(definitions)
    if (node.args !== null) {
      node.args.params.map((stmt) => checker.checkOne(stmt, babycontext))
    }

    const returnType = asParser(node.returnType.type, node.returnType.array)
    node.body.map((stmt) => checker.checkOne(stmt, babycontext)).filter((type) => {
      if (!type) return

      if (type.name === 'RETURN' && typeToString(type) !== returnType.type) {
        throw new Error(`[TYPECHECK] Function Definition: Function was defined as '${typeToString(returnType)}', it cannot return '${typeToString(type)}'`)
      }

      return type
    })

    return {
      name: 'FUNCTION_DEFINITION',
      definitions: babycontext,
      functionName: node.name,
      type: returnType
    }
  }
}

module.exports = FunctionChecker

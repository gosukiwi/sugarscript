const Definitions = require('./definitions')

class FunctionChecker {
  check (node, checker) {
    // TODO: if (definitions.hasFunction(node.name)) throw new Error("Function already exists")
    // TODO: Check in body if we have more than 1 return type and they don't match
    // Check variable definitions are consistent

    const definitions = new Definitions()
    node.body.map((stmt) => checker.checkOne(stmt, definitions)).filter((type) => type)
    if (node.args !== null) {
      node.args.params.map((stmt) => checker.checkOne(stmt, definitions))
    }

    return {
      name: 'FUNCTION_DEFINITION',
      definitions: definitions,
      functionName: node.name,
      type: this.parseReturnType(node.returnType)
    }
  }

  // private

  parseReturnType (type) {
    switch (type) {
      case 'integer':
        return 'INTEGER'
      case 'string':
        return 'STRING'
      case 'float':
        return 'FLOAT'
      default:
        return type
    }
  }
}

module.exports = FunctionChecker

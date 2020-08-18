class FunctionChecker {
  check (node, checker) {
    // TODO: if (definitions.hasFunction(node.name)) throw new Error("Function already exists")
    // TODO: Check in body if we have more than 1 return type and they don't match
    // Check variable definitions are consistent
    const body = node.body.map((stmt) => checker.checkOne(stmt)).filter((type) => type)
    return {
      name: 'FUNCTION_DEFINITION',
      functionName: node.name,
      body: body,
      parameters: node.args.params.map((stmt) => checker.checkOne(stmt)),
      type: this.guessReturnType(body)
    }
  }

  // private

  guessReturnType (body) {
    let type = 'VOID'
    body.forEach((node) => {
      if (node.name === 'RETURN') {
        if (type !== 'VOID' && node.type !== type) throw new Error(`Function already returned ${type}. It cannot return ${node.type}.`)

        type = node.type
      }
    })

    return type
  }
}

module.exports = FunctionChecker

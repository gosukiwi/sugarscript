const Definitions = require('./definitions')
const FunctionChecker = require('./function-checker')
const ParameterChecker = require('./parameter-checker')
const NullChecker = require('./null-checker')
const ReturnChecker = require('./return-checker')
const LiteralChecker = require('./literal-checker')
const FunctionCallChecker = require('./function-call-checker')
const AssignmentChecker = require('./assignment-checker')
const InlineArrayChecker = require('./inline-array-checker')

// Checkers do two things:
// 1) Make sure the action is not illegal (eg: call a function with bad arguments)
// 2) Collect type data along the way (eg: a function's return value)
const CHECKERS = {
  FUNCTION_DEFINITION: new FunctionChecker(),
  PARAMETER: new ParameterChecker(),
  EMPTY_LINE: new NullChecker(),
  RETURN: new ReturnChecker(),
  INTEGER: new LiteralChecker(),
  FLOAT: new LiteralChecker(),
  STRING: new LiteralChecker(),
  FUNCTION_CALL: new FunctionCallChecker(),
  ASSIGNMENT: new AssignmentChecker(),
  INLINE_ARRAY: new InlineArrayChecker()
}

// Scans the whole AST and builds type definition info. It's run before
// compilation and if it fails, compilation won't continue.
//
// It enhances the AST so the compiler can do smarter things, like a smarter
// assign.
class TypeChecker {
  check (ast) {
    const definitions = new Definitions()
    ast.map((node) => this.checkOne(node, definitions))
    return definitions
  }

  checkOne (node, definitions) {
    const result = this.checkerFor(node).check(node, this, definitions)
    if (result) definitions.add(result)
    return result
  }

  // private

  checkerFor (node) {
    const checker = CHECKERS[node.type]
    if (checker === undefined) throw new Error(`Could not find type checker for type: ${node.type}`)
    return checker
  }
}

module.exports = TypeChecker

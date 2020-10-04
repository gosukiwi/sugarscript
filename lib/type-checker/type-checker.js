const scope = require('./scope')
const Context = require('./definitions/context')
const CHECKERS = require('./checkers/factory')

// Scans the whole AST and builds type definition info. It's run before
// compilation and if it fails, compilation won't continue.
//
// It enhances the AST so the compiler can do smarter things, like a smarter
// assign.
class TypeChecker {
  constructor () {
    this.file = 'in-memory://'
  }

  check (ast) {
    const definitions = new Context()
    scope.clear()

    // because function definitions can be defined in any order, let's gather
    // that first, once that's done, process the remaining queue
    const queue = []
    ast.forEach((node) => { // is there a way to do this in O(n) without recursion?
      if (node.type === 'FUNCTION_DEFINITION' || node.type === 'TYPE_DEFINITION' || node.type === 'UNION_DEFINITION' || node.type === 'LET' || node.type === 'PLUGIN_IMPORT') {
        this.checkOne({ node, definitions })
      } else {
        queue.push(node)
      }
    })
    queue.forEach((node) => this.checkOne({ node, definitions }))

    return definitions
  }

  checkOne ({ node, definitions }) {
    return this.checkerFor(node).check({ node, checker: this, definitions })
  }

  // private

  checkerFor (node) {
    const checker = CHECKERS[node.type]
    if (checker === undefined) throw new Error(`Could not find checker for type: ${node.type}`)
    return checker
  }
}

module.exports = TypeChecker

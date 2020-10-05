const scope = require('./scope')
const Context = require('./definitions/context')
const CHECKERS = require('./checkers/factory')

// Scans the whole AST and builds type definition info. It's run before
// compilation and if it fails, compilation won't continue.
class TypeChecker {
  constructor () {
    this.file = 'in-memory://'
  }

  check (ast) {
    const definitions = new Context()
    scope.clear()

    // Some nodes, like functions and types definitions, are gathered in a
    // "first pass", so we can check, for example, that a function exists, when
    // the function call is used _before_ the function definition.
    const secondPassQueue = []
    ast.forEach((node) => { // is there a way to do this in O(n) without recursion?
      if (this.shouldScanNodeInFirstPass(node)) {
        this.checkOne({ node, definitions })
        // FILE is a special node, we want to parse it on both passes
        if (node.type === 'FILE') secondPassQueue.push(node)
      } else {
        secondPassQueue.push(node)
      }
    })
    secondPassQueue.forEach((node) => this.checkOne({ node, definitions }))

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

  shouldScanNodeInFirstPass (node) {
    return node.type === 'FUNCTION_DEFINITION' ||
      node.type === 'TYPE_DEFINITION' ||
      node.type === 'UNION_DEFINITION' ||
      node.type === 'PLUGIN_IMPORT' ||
      node.type === 'LET' ||
      node.type === 'FILE'
  }
}

module.exports = TypeChecker

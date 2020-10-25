const scope = require('./scope')
const Context = require('./definitions/context')
const CHECKERS = require('./checkers/factory')

const PASS_PRIORITIES = [
  ['TYPE_DEFINITION', 'UNION_DEFINITION', 'PLUGIN_IMPORT', 'FILE'],
  ['FUNCTION_DEFINITION', 'LET']
]

// Scans the whole AST and builds type definition info. It's run before
// compilation and if it fails, compilation won't continue.
class TypeChecker {
  constructor () {
    this.file = 'in-memory://'
  }

  check (ast) {
    const definitions = new Context()
    scope.clear()

    let remaining = ast
    PASS_PRIORITIES.forEach((types) => {
      const temp = []
      remaining.forEach((node) => {
        if (types.includes(node.type)) {
          this.checkOne({ node, definitions })
        } else {
          temp.push(node)
        }
      })
      remaining = temp
    })
    remaining.forEach((node) => this.checkOne({ node, definitions }))

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

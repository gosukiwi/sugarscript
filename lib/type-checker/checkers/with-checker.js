const builder = require('../types/builder')

class WithChecker {
  check ({ node, checker, definitions }) {
    const union = checker.checkOne({ node: node.name, definitions })
    const udts = definitions.getUnion(union.name).udts
    if (udts.length !== node.clauses.length) throw new Error(`With clauses must cover all types (${udts.join(', ')})`)

    node.clauses.forEach((clause) => {
      const udt = clause.typehint.value
      if (!udts.includes(udt)) throw new Error(`Union '${union.name}' does not include type '${udt}'`)

      checker.checkOne({ node: clause, definitions })
    })
    return builder.void()
  }
}

module.exports = WithChecker

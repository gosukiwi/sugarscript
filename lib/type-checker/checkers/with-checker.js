const builder = require('../types/builder')

class WithChecker {
  check ({ node, checker, definitions }) {
    const union = checker.checkOne({ node: node.name, definitions })
    const udts = definitions.getUnion(union.name).udts
    if (udts.length !== node.clauses.length) throw new Error(`With clauses must cover all types (${udts.join(', ')}) (${checker.file} at line ${node.name.position.row})`)

    node.clauses.forEach((clause) => {
      if (clause.typehint.isnt('UDT')) throw new Error(`Only UDTs are allowed for with-clauses, got ${clause.typehint} (${checker.file} at line ${node.name.position.row})`)

      const udt = clause.typehint.value
      if (!udts.includes(udt)) throw new Error(`Union '${union.name}' does not include type '${udt}' (${checker.file} at line ${node.name.position.row})`)

      checker.checkOne({ node: clause, definitions })
    })
    return builder.void()
  }
}

module.exports = WithChecker

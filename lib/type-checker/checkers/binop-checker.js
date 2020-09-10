const Type = require('../types/type')

class BinopChecker {
  check ({ node, checker, definitions }) {
    const lhs = checker.checkOne({ node: node.lhs, definitions })
    const rhs = checker.checkOne({ node: node.rhs, definitions })

    if (['AND', 'OR', 'GT', 'GTEQ', 'LT', 'LTEQ', 'PLUS', 'MINUS', 'TIMES', 'DIVISION', 'MODULO'].includes(node.name)) {
      if (!lhs.isNumber()) throw new Error(`Incompatible types: The operator '${node.name}' does not work on ${lhs}`)
      if (!rhs.isNumber()) throw new Error(`Incompatible types: The operator '${node.name}' does not work on ${rhs}`)
      return new Type('INTEGER')
    }

    if (['EQ', 'NEQ'].includes(node.name)) {
      if (lhs.is('UDT') || rhs.is('UDT')) throw new Error(`Incompatible types: The operator '${node.name}' does not work on UDTs`)
      if (!lhs.equals(rhs)) throw new Error(`Incompatible types: ${lhs} and ${rhs}`)
      return new Type('INTEGER')
    }

    throw new Error(`Invalid BINOP: ${node.name}`)
  }
}

module.exports = BinopChecker

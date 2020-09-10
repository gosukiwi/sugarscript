const NAMES = {
  AND: 'and',
  OR: 'or',
  GT: '>',
  GTEQ: '>=',
  LT: '<',
  LTEQ: '<=',
  EQ: '=',
  NEQ: '<>',
  PLUS: '+',
  MINUS: '-',
  TIMES: '*',
  DIVISION: '/'
}
class BinopGenerator {
  generate ({ node, definitions, generator, snippet }) {
    if (node.name === 'MODULO') {
      snippet.append('Mod(')
      generator.generateOne({ node: node.lhs, definitions, snippet })
      snippet.append(', ')
      generator.generateOne({ node: node.rhs, definitions, snippet })
      snippet.append(')')
      return
    }

    const name = NAMES[node.name]
    if (!name) throw new Error(`Invalid operator: '${node.name}'`)

    generator.generateOne({ node: node.lhs, definitions, snippet })
    snippet.append(` ${name} `)
    generator.generateOne({ node: node.rhs, definitions, snippet })
  }
}

module.exports = BinopGenerator

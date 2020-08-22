const TypeGenerator = require('../type-generator')
const namegen = require('../name-generator')

class InlineArrayGenerator {
  generate ({ node, definitions, generator }) {
    const typeGenerator = new TypeGenerator()
    const name = namegen()
    node._name = name

    return `
${name} as ${typeGenerator.generate(node._type)}
${node.items.map((node) => {
  return `${name}.insert(${generator.generateOne({ node, definitions })})`
}).join('\n')}
    `
  }
}

module.exports = InlineArrayGenerator

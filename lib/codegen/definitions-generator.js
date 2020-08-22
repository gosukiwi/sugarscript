const TypeGenerator = require('./type-generator')

module.exports = class DefinitionsGenerator {
  generate ({ definitions, snippet }) {
    const typeGenerator = new TypeGenerator()

    return Object.keys(definitions.variables).forEach((name) => {
      const variable = definitions.variables[name]
      snippet.append(`${name} as ${typeGenerator.generate(variable.type)}\n`)
    })
  }
}

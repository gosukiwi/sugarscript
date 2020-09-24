const Snippet = require('../snippet')

class WithElseClauseGenerator {
  generate ({ node, generator, definitions, snippet }) {
    const outer = snippet
    snippet = new Snippet()

    snippet.append('case default:\n')
    node.body.forEach((node) => generator.generateOne({ node, definitions, snippet }))
    snippet.append('endcase\n')

    outer.append(snippet)
  }
}

module.exports = WithElseClauseGenerator

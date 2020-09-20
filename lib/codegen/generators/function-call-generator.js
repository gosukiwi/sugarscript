const namegen = require('../name-generator')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

const PRIMITIVE_BUILDER = {
  array_length: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.length + 1`)
    }
  },
  array_insert: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.insert(${names[1]})`)
    }
  },
  array_insert_at: { // array_insert_at(arr, index, value)
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.insert(${names[2]}, ${names[1]})`)
    }
  },
  array_insert_sorted: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.insertsorted(${names[1]})`)
    }
  },
  array_remove: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.remove()`)
    }
  },
  array_remove_at: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.remove(${names[1]})`)
    }
  },
  array_sort: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.sort()`)
    }
  },
  array_find: {
    generate: function (snippet, names) {
      snippet.append(`${names[0]}.find(${names[1]})`)
    }
  }
}

class FunctionCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    if (node.statement) {
      snippet = new Snippet()
    }

    const paramsSnippet = new Snippet()
    const names = []
    for (let i = 0, len = node.args.types.length; i < len; i++) {
      const value = node.args.nodes[i] || node.args.defaults[i]
      if (!value) throw new Error('Compilation error: Function has bad arguments')

      const type = node.args.types[i]
      const name = namegen()
      paramsSnippet.append(`${name} as ${typegen(type)}\n`)
      paramsSnippet.append(name).append(' = ')
      generator.generateOne({ node: value, definitions, snippet: paramsSnippet })
      paramsSnippet.append('\n')
      names.push(name)
    }
    snippet.prepend(paramsSnippet)

    if (node.statement) {
      snippet.append(`// ${generator.file}, line ${node.position.row - 1}\n`)
    }

    if (this.isPrimitive(node.name)) {
      this.generatePrimitive(node.name, snippet, names)
    } else {
      snippet
        .append(`${node.name}(`)
        .append(names.join(', '))
        .append(')')
    }

    if (node.statement) {
      outer.append(snippet).append('\n')
    }
  }

  // private

  isPrimitive (name) {
    return PRIMITIVE_BUILDER[name] !== undefined
  }

  generatePrimitive (name, snippet, names) {
    PRIMITIVE_BUILDER[name].generate(snippet, names)
  }
}

module.exports = FunctionCallGenerator

class FileGenerator {
  generate ({ node, generator }) {
    generator.file = node.path
  }
}

module.exports = FileGenerator

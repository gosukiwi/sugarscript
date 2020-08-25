class TypeDefinition {
  constructor (name) {
    if (!name) throw new Error("Name can't be blank")

    this.name = name
    this.fields = {}
  }

  addField ({ name, type }) {
    if (this.fields[name]) throw new Error(`Field ${name} already set`)
    this.fields[name] = type
  }
}

module.exports = TypeDefinition

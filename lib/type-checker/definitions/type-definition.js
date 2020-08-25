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

  getField (name) {
    const field = this.fields[name]
    if (!field) throw new Error(`Could not find field '${name}' for type '${this.name}'`)
    return field
  }
}

module.exports = TypeDefinition

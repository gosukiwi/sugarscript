class TypeDefinition {
  constructor (name) {
    if (!name) throw new Error("Name can't be blank")

    this.name = name
    this.fields = {}
  }

  addField ({ name, type }) {
    if (this.fields[name.toLowerCase()]) throw new Error(`Field ${name} already set`)
    this.fields[name.toLowerCase()] = type
  }

  getField (name) {
    const field = this.fields[name.toLowerCase()]
    if (!field) throw new Error(`Could not find field '${name}' for type '${this.name}'`)
    return field
  }

  isUnion () {
    return false
  }
}

module.exports = TypeDefinition

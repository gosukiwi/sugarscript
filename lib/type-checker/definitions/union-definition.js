class UnionDefinition {
  constructor (name) {
    if (!name) throw new Error("Name can't be blank")

    this.name = name
    this.udts = []
  }

  addUDT (name) {
    if (this.udts.includes(name.toLowerCase())) throw new Error(`UDT ${name} already set`)
    this.udts.push(name)
  }
}

module.exports = UnionDefinition

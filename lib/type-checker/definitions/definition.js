class Definition {
  constructor ({ name, type }) {
    if (!name) throw new Error('Name cannot be blank')
    if (!type) throw new Error('Type cannot be blank')

    this.name = name
    this.type = type
  }
}

module.exports = Definition

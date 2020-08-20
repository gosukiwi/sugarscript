module.exports = function typeToString (type) {
  if (typeof type.type === 'object') return typeToString(type.type)
  return type.type
}

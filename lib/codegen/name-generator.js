let LAST_ID = 0

// Generates an unique name
module.exports = function generate () {
  return `_SSINTERNAL${LAST_ID++}`
}

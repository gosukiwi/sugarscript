let LAST_ID = 0

// Generates an unique name
module.exports = {
  generate: function () {
    return `__SSINTERNAL${LAST_ID++}`
  },

  reset: function () {
    LAST_ID = 0
  }
}

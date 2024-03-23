const path = require('path')
const normalizedPath = path.join(__dirname);
let mutations = {}

require('fs').readdirSync(normalizedPath).forEach((fileName) => {
  if (fileName != path.basename(module.filename)) {
    mutations.Mutation = {
      ...mutations.Mutation,
      ...require('./' + fileName)
    }
  }
})

module.exports = mutations
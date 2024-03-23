const path = require('path')
const normalizedPath = path.join(__dirname);
let queries = {}

require('fs').readdirSync(normalizedPath).forEach((fileName) => {
  if (fileName != path.basename(module.filename)) {
    let { Query: localQuery, ...localRootQueries } = require('./' + fileName)
    let { Query: query, ...rootQueries } = queries
    queries = {
      Query: {
        ...query,
        ...localQuery
      },
      ...rootQueries,
      ...localRootQueries
    }
  }
})

module.exports = queries
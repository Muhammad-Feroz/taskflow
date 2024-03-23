const path = require('path')
const normalizedPath = path.join(__dirname);
const types = require('fs').readdirSync(normalizedPath).map((fileName) => {
  if (fileName != path.basename(module.filename)) return require('./' + fileName)
}).filter(Boolean)
module.exports = types
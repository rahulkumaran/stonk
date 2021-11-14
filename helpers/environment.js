const path = require('path')
const dotenv = require('dotenv')

function environment() {
  const __dirname = path.resolve()
  dotenv.config({ path: __dirname + '/.env' })
}

module.exports = environment

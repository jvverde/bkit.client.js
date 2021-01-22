const path = require('path')
const os = require('os')
const home = os.homedir()

const configfile = path.resolve(home, '.bkit/etc/server/default/conf.init')
// import .env variables
console.log('configfile', configfile)

require('dotenv').config({
  path: configfile
})

const port = process.env.APORT || 8765
module.exports = {
  SERVER: process.env.SERVER,
  PORT: process.env.APORT || port,
  APORT: process.env.APORT || port,
  SPORT: process.env.SPORT || (port + 1)
}

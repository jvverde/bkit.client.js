const get = require('../../lib/get')
const config = require('../../lib/config')

exports.command = 'api <url>'
exports.desc = 'Set api base URL address'
exports.handler = async ({url}) => {
  const info = await get(`${url}/info`)
  if (!info) return undefined
  const conf = config.load()
  conf.BKITAPI_BASEURL = url
  // console.log('conf', conf)
  return config.save(conf)
}
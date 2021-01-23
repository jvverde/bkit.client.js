const get = require('../../lib/get')
const config = require('../../lib/config')

exports.command = 'check <user>'
exports.desc = 'Check if a user exists'
exports.handler = async ({user}) => {
  try {
    const baseurl = config.load().BKITAPI_BASEURL
    if (!/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)
    const result = await get(`${baseurl}/auth/check/${user}`)
    console.log('Answer:', result)
  } catch (err) {
    console.error('Error:', err)
  }
}
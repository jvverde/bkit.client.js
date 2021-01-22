const get = require('../../lib/get')
const config = require('../../lib/config')

exports.command = 'check <user>'
exports.desc = 'Check if a user exists'
exports.handler = async ({user}) => {
  try {
    const baseurl = config.load().BKITAPI_BASEURL
    const result = await get(`${baseurl}/auth/ckeck/${user}`)
    console.log('Answer', result)
  } catch (err) {
    console.error('Error:', err)
    if (err.response) {
      console.warn('Response status: ', err.response.status, err.response.statusText)
      console.warn('Response data: ', err.response.data)
    }

  }
}
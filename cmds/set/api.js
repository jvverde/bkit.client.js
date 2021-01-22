const get = require('../../lib/get')
exports.command = 'api <url>'
exports.desc = 'Set api base URL address'
exports.handler = async ({url}) => {
  try {
    const info = await get(`${url}/info`)
    console.log('api info', info)
  } catch (err) {
    console.error('Error:', err)
    if (err.response) {
      console.warn('Response status: ', err.response.status, err.response.statusText)
      console.warn('Response data: ', err.response.data)
    }

  }
}
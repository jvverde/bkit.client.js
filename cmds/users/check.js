const { get } = require('../../lib/rest')

exports.command = 'check <user>'
exports.desc = 'Check if a user exists'
exports.handler = async ({user}) => {
  try {
    const result = await get(`/auth/check/${user}`)
    console.log('Answer:', result)
  } catch (err) {
    console.error('Error:', err)
  }
}
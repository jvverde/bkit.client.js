const { getAuth } = require('../../lib/rest')

exports.command = 'info'
exports.desc = 'Get Current User Info'
exports.handler = async () => {
  try {
    const info = await getAuth('/user/info')
    console.log('info:', info)
  } catch (err) {
    console.error('Error:', err)
  }
}
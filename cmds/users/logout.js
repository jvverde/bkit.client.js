const { getAuth } = require('../../lib/rest')

exports.command = 'logout'
exports.desc = 'Get Current User Info'
exports.handler = async () => {
  try {
    const logout = await getAuth('/user/logout')
    console.log('logout:', logout)
  } catch (err) {
    console.error('Error:', err)
  }
}
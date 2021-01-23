const post = require('../../lib/post')
const config = require('../../lib/config')
const { encrypt, decrypt, hmac } = require('../../lib/crypto')
const inquirer = require('inquirer')

exports.command = 'create <username> <email>'
exports.desc = 'Create a new user'
exports.handler = async ({ username, email }) => {
  try {
    const baseurl = config.load().BKITAPI_BASEURL
    if (!/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)
    const answer = await post(`${baseurl}/auth/request`, {
      username,
      email
    })
    console.log('Answer:', answer)
    const { code } = await inquirer.prompt({ type: 'input', name:'code', message: `Received code on ${email}:` })
    const secret = decrypt(answer.encsec, code)
    const digest = hmac(secret, code)

  } catch (err) {
    console.error('Error:', err)
  }
}
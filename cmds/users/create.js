const post = require('../../lib/post')
const config = require('../../lib/config')
const { encrypt, decrypt, hmac } = require('../../lib/crypto')
const stamp = require('../../lib/stamp')
const inquirer = require('inquirer')
const chalk = require('chalk')

const ask = {
  code: (email) => inquirer.prompt({ type: 'input', name:'code', message: `Received code on ${email}:` }),
  pass: () => inquirer.prompt({ type: 'password', name:'pass', message: 'Password:', mask: '*' })
}
exports.command = 'create <username> <email>'
exports.desc = 'Create a new user'
exports.handler = async ({ username, email, password }) => {
  password = password || (await ask.pass()).pass
  try {
    const baseurl = config.load().BKITAPI_BASEURL
    if (!/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)
    const answer = await post(`${baseurl}/auth/request`, {
      username,
      email
    })
    const { code } = await ask.code(email)
    let secret
    try {
      secret = decrypt(answer.encsec, code)
    } catch (err) {
      return console.warn(chalk.red.bgWhite('Wrong code'))
    }
    const { salt, verifier } = await stamp(username, password)
    const proof = hmac(answer.encsec, code)
    const encVerifier = encrypt(verifier, secret)
    const digest = hmac(verifier, secret)

    const confirm = { email, username, salt, encVerifier, proof, username, digest }
    const result = await post(`${baseurl}/auth/confirm`, confirm)
    console.log(result)
  } catch (err) {
    console.error('Error:', err)
  }
}
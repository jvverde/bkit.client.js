const crypto = require('crypto')
const argon2 = require('argon2')

const defaultAlgo = 'aes-256-cbc'
const encrypt = (text, password, algorithm = defaultAlgo) => {
  const salt = crypto.randomBytes(16)
  const key = crypto.scryptSync(password, salt, 32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  const encrypted = cipher.update(text, 'utf8', 'base64')
  return [
    iv.toString('base64'),
    salt.toString('base64'),
    encrypted + cipher.final('base64')
  ].join('|')
}

const randomBytes = (size = 16) =>  crypto.randomBytes(size)

const scrypt = (password, salt = randomBytes(), len = 32) => crypto.scryptSync(password, salt, len)

const decrypt = (text, password, algorithm = defaultAlgo) => {
  const [iv, salt, encrypted] = text.split('|').map(e => Buffer.from(e, 'base64'))
  // const key = crypto.scryptSync(password, salt, 32)
  const key = scrypt(password, salt, 32)
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  const decrypted = decipher.update(encrypted)
  return Buffer
    .concat([decrypted, decipher.final()])
    .toString()
}

const hmac = (text, key) => {
  return crypto.createHmac('sha256', key)
    .update(text)
    .digest('base64')
}

const hashsec = async (pass) => {
  return argon2.hash(pass)
}

module.exports = {
  scrypt,
  hmac,
  encrypt,
  decrypt,
  hashsec
}

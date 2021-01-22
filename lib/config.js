const path = require('path')
const os = require('os')
const home = os.homedir()
const fs = require('fs')
const dotenv = require('dotenv')
const shell = require('shelljs')
const { mv, echo, tempdir } = require('shelljs')

const configfile = path.resolve(home, '.bkit/etc/server/default/conf.init')
// console.log('configfile:', configfile)

const load = (file = configfile) => {
  try {
    const config = dotenv.parse(fs.readFileSync(configfile))
    return config
  } catch (err) {
    console.error('Error loading from:', file, err)
    return undefined
  }
}

const save = async (config, file = configfile) => {
  try {
    // return writeIniFile(file, config)
    const tmp = tempdir()
    const rand = Math.random().toString(36).substring(7)
    const tmpfile = path.resolve(tmp,`conf_${process.pid}_${rand}.tmp`)
    for (const [key, value] of Object.entries(config || {})) {
      echo(`${key}='${value}'`).toEnd(tmpfile);
    }
    mv(tmpfile, configfile)
  } catch (err) {
    console.error('Error saving to', file, err)
  }
}



module.exports = {
  load,
  save
}
const axios = require('axios')
const configuration = require('./config')

const baseurl = configuration.load().BKITAPI_BASEURL
if (baseurl && !/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)

axios.defaults.baseURL = baseurl
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const post = (url, data, config = {}) => {
  // console.info('get', url)
  return axios.post(url, data, config)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.error('Error:', err)
      if (err.response) {
        console.warn('Response status: ', err.response.status, err.response.statusText)
        console.warn('Response data: ', err.response.data)
      }
    })
}

const get = (url, config = {}) => {
  return axios.get(url, config)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.error('Error:', err)
      if (err.response) {
        console.warn('Response status: ', err.response.status, err.response.statusText)
        console.warn('Response data: ', err.response.data)
      }
    })
}

const getAuth = (url, config = {}) => {
  const conf = configuration.load()
  config.headers = config.headers || {}    
  config.headers.Authorization = `Bearer ${conf.TOKEN}` 
  return get(url, config)
}

module.exports = {
  getAuth,
  get,
  post
}

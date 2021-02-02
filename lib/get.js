const axios = require('axios')

module.exports = (url, config = {}) => {
  // console.info('get', url)
  config.headers = config.headers || { headers: { Accept: "application/json" } }
  config.headers.Accept = config.headers.Accept || { Accept: "application/json" }
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
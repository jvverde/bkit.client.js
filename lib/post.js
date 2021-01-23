const axios = require('axios')

module.exports = (url, data) => {
  // console.info('get', url)
  return axios.post(url, data, { headers: { Accept: "application/json" } })
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
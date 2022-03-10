import axios from 'axios'

export const requests = axios.create({
  // baseURL: location.protocol + '//' + location.hostname + ':' + process.env.BACKEND_PORT + '/'
  // baseURL: location.protocol + '//' + location.hostname + ':8080/'
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://expension-api.azurewebsites.net'
})

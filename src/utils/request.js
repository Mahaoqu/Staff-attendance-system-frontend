import axios from 'axios';
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  timeout: 5000,
});

service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status != 200 || res.status !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
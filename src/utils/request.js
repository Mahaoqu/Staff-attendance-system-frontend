import axios from 'axios';
import {
  Message,
} from 'element-ui'

const service = axios.create({
  timeout: 5000,
});

// 在请求之前调用
service.interceptors.request.use(config => {
  if (config.data) {
    let d = {}

    for (let prop in config.data) {
      if (config.data[prop] == null) {
        break; // 去除所有空属性
      } else if (prop === 'birthday' || prop.endsWith('Date')) {
        // ISO格式, '2018-08-08'
        d[prop] = config.data[prop].toISOString().slice(0, 10)
      } else if (prop.endsWith('stamp') || prop.endsWith('DateTime')) {
        // Unix格式, '1559656190798'. JS中为从1970/1/1至今的毫秒值.
        d[prop] = config.data[prop].getTime() / 1000
      } else {
        d[prop] = config.data[prop]
      }
    }
    // 格式化时间和日期
    config.data = d;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 在请求返回后调用
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

      let d = res.data
      // 返回的值可能是数组或者对象...
      // 格式化日期和时间
      for (let prop in res.data) {
        if (prop === 'birthday' || prop.endsWith('Date')) {
          // ISO格式, '2018-08-08'
          d[prop] = Date.parse(d[prop])
        } else if (prop.endsWith('stamp') || prop.endsWith('DateTime')) {
          // Unix格式，1559656190798
          d[prop] = new Date(parseInt(d[prop]))
        } else if (prop.endsWith('Time')) {
          // 普通格式, '19:22'不解析
          d[prop] = d[prop]
        } else {
          d[prop] = d[prop]
        }
      }
      return d
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

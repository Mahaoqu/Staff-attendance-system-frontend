import axios from 'axios';
import {
  Message,
} from 'element-ui'

const service = axios.create({
  timeout: 5000,
});

function inputParse(obj) {
  for (let prop in obj) {
    if (obj[prop] === null) {
      delete obj[prop];
    } else if (prop === 'birthday' || prop.endsWith('Date')) {
      // ISO格式, '2018-08-08'
      obj[prop] = Date.parse(obj[prop])
    } else if (prop.endsWith('Stamp') || prop.endsWith('DateTime')) {
      // Unix格式，1559656190798。后端返回秒为单位
      obj[prop] = new Date(parseInt(obj[prop]) * 1000)
    } else if (prop.endsWith('Time')) {
      // 普通格式, '19:22'不解析
      obj[prop] = obj[prop]
    } else {
      obj[prop] = obj[prop]
    }
  }
  return obj
}

// 格式化时间和日期
function outputParse(obj) {
  for (let prop in obj) {
    if (obj[prop] == null) {
      delete obj[prop] // 去除所有空属性
    } else if (prop === 'birthday' || prop.endsWith('Date')) {
      // ISO格式, '2018-08-08'
      obj[prop] = obj[prop].toISOString().slice(0, 10)
    } else if (prop.endsWith('stamp') || prop.endsWith('DateTime')) {
      // Unix格式, '1559656190798'. JS中为从1970/1/1至今的毫秒值.
      obj[prop] = obj[prop].getTime() / 1000
    } else {
      obj[prop] = obj[prop]
    }
  }
  return obj
}

// 在请求之前调用
service.interceptors.request.use(config => {
  if (config.data) {
    config.data = outputParse(config.data)
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
      // 返回的值可能是对象或者对象的数组...
      if (res.data instanceof Array) {
        res.data.map(e => inputParse(e))
      } else if (res.data instanceof Object) {
        res.data = inputParse(res.data)
      }
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

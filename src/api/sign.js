import axios from '@/utils/request'


export function sign(dataURL) {
  return axios.post('/sign/', {
    "img": dataURL
  })
}

export function adminSign(ID, DateTime) {
  return axios.post('/sign/' + ID, {
    DateTime
  })
}

import axios from '@/utils/request'


export default function (dataURL) {
  return axios.post('/sign', {
    "img": dataURL
  })
}

import axios from '@/utils/request'

export function login(id, password) {
  return axios.post('/auth/login', {
    data: {
      id,
      password
    }
  })
}

export function logout() {
  return axios.post('/auth/logout')
}

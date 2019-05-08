import request from '@/utils/request'

export function login(id, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data : {
      id,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
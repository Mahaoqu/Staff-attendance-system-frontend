import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/userinfo',
    method: 'get'
  })
}

export function getRole() {
  return request({
    url: '/role',
    method: 'get'
  })
}

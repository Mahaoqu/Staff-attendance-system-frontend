import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/userinfo',
    method: 'get'
  })
}

export function patchUserInfo(info) {
  return request({
    url: '/userinfo',
    method: 'patch',
    data: {
      "data":info
    }
  })
}

export function getRole() {
  return request({
    url: '/role',
    method: 'get'
  })
}

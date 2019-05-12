import request from '@/utils/request'

export function getStaffs() {
  return request({
    url: '/staffs',
    method: 'get'
  })
}

export function getDepartments() {
  return request({
    url: '/departments',
    method: 'get'
  })
}

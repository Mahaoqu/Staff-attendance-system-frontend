import request from '@/utils/request'

export function getStaffs() {
  return request({
    url: '/staffs',
    method: 'get'
  })
}

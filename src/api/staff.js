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

export function getStaff(id) {
  return request({
    url: '/staffs/' + id,
    method: 'get'
  })
}

export function newStaff(id, info) {
  return request({
    url: '/staffs/' + id,
    method: 'post',
    data: {
      "data": info
    }
  })
}

export function modifyStaff(id, info) {
  return request({
    url: '/staffs/' + id,
    method: 'put',
    data: {
      "data": info
    }
  })
}

export function deleteStaff(id) {
  return request({
    url: '/staffs/' + id,
    method: 'delete'
  })
}

import axios from '@/utils/request'

/** 
 * 所有的 Restful API 统一返回需要的对象/数组
 * 
 * */
// 部门

export function getDepartments() {
  return axios.get('/departments/')
}

// 员工信息

export function getStaffs() {
  return axios.get('/staffs/')
}

export function getStaff(id) {
  return axios.get('/staffs/' + id)
}

export function newStaff(info) {
  return axios.post('/staffs/', info)
}

export function modifyStaff(info) {
  return axios.put('/staffs/' + info.ID, info)
}

export function deleteStaff(id) {
  return axios.delete('/staffs/' + id)
}

export function getStaffsByDepartment(id) {
  return axios.get('/staffs/departmentID=' + id)
}

// 加班记录

export function getOvertimes() {
  return axios.get('/tempovertimes/')
}

export function getOvertime(id) {
  return axios.get('/tempovertimes/' + id)
}

export function newOvertime(info) {
  return axios.post('/tempovertimes/' + info.ID, info)
}

export function modifyOvertime(info) {
  return axios.put('/tempovertimes/' + id, {
    data: info
  })
}

export function getOvertimeByStaff(staffID) {
  return axios.get('/tempovertimes/?staffID=' + staffID)
}

export function getOvertimeByDepartmentID(departmentID) {
  return axios.get('/tempovertimes/?departmentID=' + departmentID)
}

// 临时加班记录

export function getTemporaryOvertimes() {
  return axios.get('/tempovertimes/')
}

export function getTemporaryOvertime(id) {
  return axios.get('/tempovertimes/' + id)
}

export function newTemporaryOvertime(info) {
  return axios.post('/tempovertimes/', info)
}

export function modifyTemporaryOvertime(info) {
  return axios.put('/tempovertimes/' + info.ID, info)
}

// 请假记录

export function getLeaves() {
  return axios.get('/leaves/')
}

export function getLeave(id) {
  return axios.get('/leaves/' + id)
}

export function newLeave(info) {
  return axios.post('/leaves/', info)
}

export function modifyLeave(info) {
  return axios.put('/leaves/' + info.ID, info)
}

export function deleteLeave(id) {
  return axios.delete('/leaves/' + id)
}

// 时间安排

export function getArrangements() {
  return axios.get('/arrangements/')
}

export function getArrangement(id) {
  return axios.get('/arrangements/' + id)
}

export function newArrangement(info) {
  return axios.post('/arrangements/', info)
}

export function modifyArrangement(info) {
  return axios.put('/arrangements/' + info.ID, info)
}

export function deleteArrangement(id) {
  return axios.delete('/arrangements/' + id)
}

export function getArrangementsByDepartment(d_id) {
  return axios.get('/arrangements?departmentID=' + d_id)
}

export function getArrangementsByStaff(id, date) {
  return axios.get('/arrangements/', {
    params: {
      ID: id,
      date: date
    }
  })
}

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
  return axios.get('/overtimes/')
}

export function getOvertime(id) {
  return axios.get('/overtimes/' + id)
}

export function newOvertime(info) {
  return axios.post('/overtimes/', info)
}

export function modifyOvertime(info) {
  return axios.put('/overtimes/' + info.ID, info)
}

export function permitOvertime(ID) {
  return axios.put('/overtimes/' + ID + '?permit=true')
}

export function rejectOvertime(ID) {
  return axios.put('/overtimes/' + ID + '?reject=true')
}

export function deleteOvertime(id) {
  return axios.delete('/overtimes/' + id)
}

export function getOvertimesByStaff(staffID) {
  return axios.get('/overtimes/?staffID=' + staffID)
}

export function getOvertimesByCharge(departmentID) {
  return axios.get('/overtimes/?chargeID=' + departmentID)
}

export function getOvertimesByDepartmentID(departmentID) {
  return axios.get('/overtimes/?departmentID=' + departmentID)
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

export function deleteTemporaryOvertime(ID) {
  return axios.delete('/tempovertimes/' + ID)
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

export function permitLeave(ID) {
  return axios.put('/leaves/' + ID + '?permit=true')
}

export function rejectLeave(ID) {
  return axios.put('/leaves/' + ID + '?reject=true')
}

export function reportLeave(id) {
  return axios.put('/leaves/' + id + '?report=true')
}

export function getLeavesByStaff(staffID) {
  return axios.get('/leaves/?staffID=' + staffID)
}

export function getLeavesByCharge(chargeID) {
  return axios.get('/leaves/?chargeID=' + chargeID)
}

export function getLeavesByDepartmentID(departmentID) {
  return axios.get('/leaves/?departmentID=' + departmentID)
}

// 时间安排

export function getArrangements() {
  return axios.get('/arrangements/')
}

export function getArrangement(id) {
  return axios.get('/arrangements/' + id)
}

export function getArrangementsByIDandDate(staffID, date) {
  return axios.get('/arrangements/', {
    params: {
      staffID: staffID,
      date: date
    }
  })
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

export function getStatus(staffID) {
  return axios.get('/workstatus')
}

import axios from '@/utils/request'

/** 
 * 所有的 Restful API 统一返回需要的对象/数组
 * 
 * */
// 部门

export function getDepartments() {
  return axios.get('/departments')
}

// 员工信息

export function getStaffs() {
  return axios.get('/staffs')
}

export function getStaff(id) {
  return axios.get('/staffs/' + id)
}

export function newStaff(id, info) {
  return axios.post('/staffs/' + id, {
    data: info
  })
}

export function modifyStaff(id, info) {
  return axios.put('/staffs/' + id, {
    data: info
  })
}

export function deleteStaff(id) {
  return axios.delete('/staffs/' + id)
}

export function getStaffsByDepartment(id) {
  return axios.get('/staffs/departmentID=' + id)
}

// 加班记录

export function getOvertimes() {
  return axios.get('/tempovertimes')
}

export function getOvertime(id) {
  return axios.get('/tempovertimes/' + id)
}

export function newOvertime(info) {
  return axios.get('/tempovertimes')
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
  return axios.get('/tempovertimes')
}

export function getTemporaryOvertime(id) {
  return axios.get('/tempovertimes/' + id)
}

export function newTemporaryOvertime(info) {
  return axios.get('/tempovertimes')
}

export function modifyTemporaryOvertime(info) {
  return axios.put('/tempovertimes/' + id, {
    data: info
  })
}

// 请假记录

export function getLeaves() {
  return axios.get('/leaves')
}

export function getLeave(id) {
  return axios.get('/leaves/' + id)
}

export function newLeave(id, info) {
  return axios.post('/leaves/' + id, {
    data: info
  })
}

export function modifyLeave(id, info) {
  return axios.put('/leaves/' + id, {
    data: info
  })
}

export function deleteLeave(id) {
  return axios.delete('/leaves/' + id)
}

// 时间安排

export function getArrangements() {
  return axios.get('/arrangements')
}

export function getArrangement(id) {
  return axios.get('/arrangements/' + id)
}

export function newArrangement(id, info) {
  return axios.post('/arrangements/' + id, {
    data: info
  })
}

export function modifyArrangement(id, info) {
  return axios.put('/arrangements/' + id, {
    data: info
  })
}

export function deleteArrangement(id) {
  return axios.delete('/arrangements/' + id)
}

export function getArrangementsByDepartment(d_id) {
  return axios.get('/arrangements?departmentID=' + d_id)
}

export function getArrangementsByStaff(id, date) {
  return axios.get('/arrangements', {
    params: {
      ID: id,
      date: date
    }
  })
}

// ========== 
//  实用方法
// ==========

// 输入一个数据对象数组，返回ID：名称的映射。
function parseDepartment(d) {

  let mapping = {}
  d.departments.forEach(x => {
    mapping[x.ID] = x.name;
  })
  return mapping
}

// 根据部门获取员工信息，将员工部门名称添加到
export async function get_dep_staffs_with_depart_name(department_id) {
  let [staffs, departments] = await Promise.all(
    [getStaffsByDepartment(department_id), getDepartments()])
  let nameMap = parseDepartment(departments)

  for (let staff of staffs.staffs) {
    staff.department = nameMap[staff.departmentID]
  }

  return staffs.staffs
}

export async function get_all_staffs_with_depart_name() {
  let [staffs, departments] = await Promise.all(
    [getStaffs(), getDepartments()])
  let nameMap = parseDepartment(departments)

  for (let staff of staffs.staffs) {
    staff.department = nameMap[staff.departmentID]
  }

  return staffs.staffs
}

export async function get_staff_with_depart_name(uid) {
  let [staff, departments] = await Promise.all(
    [getStaff(uid), getDepartments()])
  let nameMap = parseDepartment(departments)
  staff.department = nameMap[staff.departmentID]
  return staff
}

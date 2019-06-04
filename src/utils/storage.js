import {
  getDepartments
} from '@/api/restful'

function getCurrentRole() {
  return sessionStorage.getItem('role')
}

function getCurrentID() {
  return sessionStorage.getItem('ID')
}


let department_list = null

// departmentID => Name
let department_mapping = null

async function loadDepartments() {
  let d = await getDepartments()
  department_list = d;
  department_mapping = {};
  d.forEach(x => {
    department_mapping[x.ID] = x.name;
  })
}

async function departmentMapping(ID) {
  if (department_mapping == null) {
    await loadDepartments();
  }
  return department_mapping;
}

async function departmentList() {
  if (department_list == null)
    await loadDepartments();

  return department_list;
}

function roleList() {
  return [{
    ID: 2,
    name: "部门主管"
  }, {
    ID: 1,
    name: "员工"
  }]
}

async function roleMapping(ID) {
  return {
    "1": "员工",
    "2": "主管",
    "3": "经理"
  };
}

export {
  getCurrentID,
  getCurrentRole,
  departmentMapping,
  departmentList,
  roleMapping,
  roleList
}

function getCurrentRole() {
  return sessionStorage.getItem('role')
}

function getCurrentID() {
  return sessionStorage.getItem('ID')
}

export {
  getCurrentID,
  getCurrentRole
}

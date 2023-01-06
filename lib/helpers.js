export async function getAllEmployees() {
  const res = await fetch('/api/employees', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  // console.log(data)
  return data
}

export async function searchEmployees(term) {
  const res = await fetch(`/api/employees?term=${term}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  console.log(data)
  return data
}


export async function postEmployee(employeeData) {

  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
  const data = await res.json()
  console.log(data)
  return data
}

export async function deleteEmployee(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  console.log(data)
  return data

}

export async function putEmployee(employeeId, updatedData) {
  console.log("helpers.js putEmployee");
  console.log('helper.js ', employeeId);
  console.log('helper.js ', updatedData);
  const res = await fetch(`/api/employees/${employeeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  })
  const data = await res.json()
  console.log(data)
  return data

}



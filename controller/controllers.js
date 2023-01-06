import Employee from "../models/employee";




// GET /api/employees
export async function getAllEmployees(req, res) {
  try {
    const { term } = req.query
    if (term) {
      console.log('term: ' + term)
      const employees = await Employee.find({ $text: { $search: term } })
      if (!employees) res.status(404).json({ msg: "Employees not found" })
      res.status(200).json(employees)

    } else {
      const employees = await Employee.find().sort({ createdAt: -1 })
      if (!employees) res.status(404).json({ msg: "Employees not found" })
      res.status(200).json(employees)
    }
  } catch (error) {
    res.status(404).json(error.message)
  }
}

// GET /api/employees/[employeeId]
export async function getEmployeeById(req, res) {
  try {
    const { employeeId } = req.query
    const employee = await Employee.findById(employeeId)
    if (!employee) res.status(404).json({ msg: "Employees not found" })
    res.status(200).json(employee)
  } catch (error) {
    res.status(404).json(error.message)
  }
}


// POST /api/employees
export async function postEmployee(req, res) {
  try {
    console.log("postEmployee(req, res")
    const data = req.body
    console.log(data)
    if (!data) return res.status(404).json({ error: " data not provided" })

    const employees = await Employee.create(data)

    res.status(200).json(employees)
  } catch (error) {
    res.status(404).json(error.message)
  }
}


// PUT /api/employees/[employeeId]
export async function updateEmployee(req, res) {
  console.log("server updateEmployee");
  try {
    const { employeeId } = req.query
    const updatedData = req.body

    const employee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true })
    if (!employee) res.status(404).json({ msg: "Employee not found" })
    res.status(200).json(employee)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

// DELETE /api/employees/[employeeId]
export async function deleteEmployee(req, res) {
  try {
    const { employeeId } = req.query
    console.log(employeeId);

    const employee = await Employee.findByIdAndDelete(employeeId)
    if (!employee) res.status(404).json({ msg: "Employee not found" })
    res.status(200).json({ msg: `${employeeId} employee deleted` })
  } catch (error) {
    res.status(404).json(error.message)
  }
}


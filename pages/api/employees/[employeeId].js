import { deleteEmployee, getEmployeeById, updateEmployee } from "../../../controller/controllers"

export default function handler(req, res) {

  const { method } = req
  const { employeeId } = req.query

  switch (method) {
    case "GET":
      getEmployeeById(req, res)
      break
    // case "POST":
    //   res.status(200).json({ method: "POST" })
    //   break
    case "PUT":
      console.log("PUT API endpoint hit");
      updateEmployee(req, res)
      break
    case "DELETE":
      deleteEmployee(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} not allowed`)

  }
}
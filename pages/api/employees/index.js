import { getAllEmployees, postEmployee } from "../../../controller/controllers"
import connectDB from "../../../database/connectDB"

export default async function handler(req, res) {

  await connectDB().then(() => {

    const { method } = req

    switch (method) {
      case "GET":
        console.log("GET")
        getAllEmployees(req, res)
        break
      case "POST":
        console.log("POST")
        postEmployee(req, res)
        break
      // case "PUT":
      //   res.status(200).json({ method: "PUT" })
      //   break
      // case "DELETE":
      //   res.status(200).json({ method: "DELETE" })
      //   break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${method} not allowed`)

    }

  })
}
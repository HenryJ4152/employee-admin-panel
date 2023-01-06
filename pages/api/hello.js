// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../database/connectDB"


export default async function handler(req, res) {

  try {
    await connectDB()
    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    res.status(404).json({ error: error.message })

  }

}

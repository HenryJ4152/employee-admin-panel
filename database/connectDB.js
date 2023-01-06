const mongoose = require('mongoose')

const connectDB = async () => {

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (connection.readyState == 1) {
      console.log("database connected")
    }


  } catch (error) {
    console.log(error)
  }
}
export default connectDB
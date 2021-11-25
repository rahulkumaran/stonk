// Module that is handling connection to the database
// Exported from here and is used in server.js

const mongoose = require('mongoose')

const connectDB = async () => {
  const options = {
    useNewUrlParser: true
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, options)
    console.log(`MongoDB connected to: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`DB Error: ${error.message}`.red.underline.bold)
    //Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB

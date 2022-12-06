// const mongoose = require('mongoose')
// import { connect } from 'mongoose'
import mongoose from 'mongoose'
// import config from '../../config'

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)

    console.log(`🟢 Mongo db connected:`, connection.connection.host)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB

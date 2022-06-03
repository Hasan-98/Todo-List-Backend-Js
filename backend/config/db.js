const Mongoose = require('mongoose')
require('dotenv').config();
module.exports = connectDB = async() => {
    try {

        const env = process.env.MONGO_URI
        const conn = await Mongoose.connect(env)

        console.log(`MongoDB Connected: ${conn.connection.host}`)
        console.log('in connect')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
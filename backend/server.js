const Mongoose = require('mongoose')
require('dotenv').config();


(async() => {
    console.log('before try')
    try {
        const env = process.env.MONGO_URI
        console.log(env)
        const conn = await Mongoose.connect(env)
        console.log('before connection')
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        const App = require('./app')
        const app = new App();
        //  console.log('app is ', app)
        app.listen()
    } catch (error) {
        console.error('Something went wrong when initializing the server:\n', error.stack);
    }
})();
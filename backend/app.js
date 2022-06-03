// import express, { json, urlencoded } from 'express'
// import { errorHandler } from './middleware/errorMiddleware'

const express = require('express')
const urlencoded = require('express')

const bodyparser = require('body-parser')
require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware')
class App {
    constructor() {
        console.log('asdfasd construvcotr')
        this.app = express()
        this.app.use(express.json());
        this.app.use(bodyparser.urlencoded({ extended: true }));
        this.setRoutes()
    }

    setRoutes() {
        console.log('routes called')

        this.app.use('/api/goals', require('./routes/goalRoutes'))
        this.app.use('/api/users', require('./routes/userRoutes'))
        this.app.use(errorHandler);

    }
    getApp() {
        return this.app
    }
    listen() {
        const port = process.env.PORT || 5000
        this.app.listen(port, () => {
            console.log(`Listening at port ${port}`);
        });
    }
}

//export default App
module.exports = App
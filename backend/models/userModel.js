//import { Schema, model } from 'mongoose'
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
}, {
    timestamps: true,
});

//export default model('User', userSchema)
module.exports = mongoose.model('Users', userSchema)
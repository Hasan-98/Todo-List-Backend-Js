//import { Schema, model } from 'mongoose'

const mongoose = require('mongoose')
const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
}, {
    timestamps: true,
});


//export default model('Goal', goalSchema)
module.exports = mongoose.model('Goals', goalSchema)
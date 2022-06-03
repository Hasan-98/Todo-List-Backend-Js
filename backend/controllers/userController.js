// import { sign } from 'jsonwebtoken'
// import { genSalt, hash, compare } from 'bcryptjs'
// import asyncHandler from 'express-async-handler'
// import User from '../models/userModel'


const User = require('../models/userModel')

const { genSalt, hash, compare } = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cron = require('node-cron')
require('dotenv').config();


const registerUser = asyncHandler(async(req, res) => {
    console.log('register api called')
    console.log(req.body)
    const { name, email, password } = req.body
    console.log('asdfasdf asd ', name)
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
            user: 'hasanmehmood458@gmail.com',
            pass: 'jxtnqdylbjwtpooi'
        }
    })



    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    cron.schedule('*/2 * * * *', function() {
        console.log('---------------------');
        console.log('Running Cr on Job');
        console.log('Email Sent');

        let mailOption = {
            from: 'hasanmehmood458@gmail.com',
            to: 'hassan.mahmood@emumba.com',
            subject: 'Welcome to Goal Aurenited Site',
            text: 'Thanks for creating the Account, looking forward to hear back from you'
                // ,
                // attachments: [{
                //     filename: 'sample.pdf',
                //     content: fs.createreadStream("./sample.pdf"),
                //     contentType: 'application/pdf'
                // }]
        }
        transport.sendMail(mailOption, function(err, data) {
            if (err) {
                console.log('failed to send mail', err)
            } else {
                console.log('email send')
            }
        })
    })

    if (user) {
        console.log('added successfully')
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.toJSON()),
        })
    } else {
        console.log('added failed')

        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async(req, res) => {
    console.log('login api called')
    console.log(req.body)
    const { email, password } = req.body
        //  console.log('asdfasdf asd ', email)

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.toJSON()),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    console.log('token generator  ', process.env.JWT_SECRET)
    return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// export default {
//     registerUser,
//     loginUser,
//     getMe,
// }

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
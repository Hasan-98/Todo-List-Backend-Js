// import { Router } from 'express'
// import { registerUser, loginUser, getMe } from '../controllers/userController'
// import { protect } from '../middleware/authMiddleware'

const Router = require('express')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')


const router = Router()
console.log('before register')
router.post('/', registerUser)

router.post('/login', loginUser)
router.get('/me', protect, getMe)

//export default router
module.exports = router
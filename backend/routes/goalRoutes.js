//import { Router } from 'express'
//import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController'
//import { protect } from '../middleware/authMiddleware'
const protect = require('../middleware/authMiddleware')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

const Router = require('express')
const router = Router()
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

//export default router
module.exports = router
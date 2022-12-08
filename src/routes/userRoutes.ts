import express from 'express'
import { registerUser } from '../controllers/userController'
const router = express.Router()

router.post('/', registerUser)
// router.get('/login', loginUser)
// router.get('/me', getMe)

module.exports = router

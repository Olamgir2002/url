const express = require('express')
const router = express.Router()
import { createUser, loginUser, logoutUser } from '../controllers/auth.controller'
import { isAuthenticated } from '../middleware/isAuthenticated'

router.post('/', createUser)

router.post('/login', loginUser)
router.post('/logout', isAuthenticated, logoutUser)
export default router

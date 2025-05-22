import express from 'express'
import { allChats, getMessages, sendMessage } from '../controllers/contol message.js'
import { protectRoute } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/users', protectRoute, allChats)
router.get('/:id', protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)

export default router
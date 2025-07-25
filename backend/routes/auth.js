import express from 'express'
import { loginRedirect, googleCallback } from '../controllers/auth.js'

const router = express.Router()

router.get('/login', loginRedirect)
router.get('/g-callback', googleCallback)

export default router

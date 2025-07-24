import express from 'express'
import { getAuthUrl, getTokens, getUserInfo } from '../services/gAuth.js'
import User from '../models/user.js'

const router = express.Router()

// STEP 1: Redirect to Google login
router.get('/login', (req, res) => {
    const url = getAuthUrl()
    res.redirect(url)
})

// STEP 2: Handle Google redirect with ?code=...
router.get('/g-callback', async (req, res) => {
    const code = req.query.code
    try {
        const tokens = await getTokens(code)
        const userInfo = await getUserInfo()

        await User.upsert({
            google_id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            token_expires_at: new Date(Date.now() + tokens.expires_in * 1000)
        })

        res.redirect(`${process.env.FRONTEND_URL}/`)
    } catch (err) {
        console.error('OAuth callback error:', err)
        res.status(500).send('Authentication failed')
    }
})

export default router

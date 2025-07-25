import { getAuthUrl, getTokens, getUserInfo } from '../services/gAuth.js'
import { upsertGoogleUser } from '../services/user.js'

export const loginRedirect = (req, res) => {
    const url = getAuthUrl()
    res.redirect(url)
}

export const googleCallback = async (req, res) => {
    const code = req.query.code

    try {
        const tokens = await getTokens(code)
        const userInfo = await getUserInfo()

        const user = await upsertGoogleUser(userInfo, tokens)

        req.session.userId = user.id
        req.session.cookie.maxAge = tokens.expiry_date

        res.redirect(`${process.env.FRONTEND_URL}/`)
    } catch (err) {
        console.error('OAuth callback error:', err)
        res.status(500).send('Authentication failed')
    }
}

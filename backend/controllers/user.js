import { findUserById } from '../services/user.js'

export const getMe = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Not logged in' })
    }

    try {
        const user = await findUserById(req.session.userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
}

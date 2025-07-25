import User from '../models/user.js'

export const findUserById = async (id) => {
    return await User.findByPk(id)
}

export const upsertGoogleUser = async (userInfo, tokens) => {
    const [user] = await User.upsert({
        google_id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        refresh_token_expires_at: tokens.refresh_token_expires_in,
        token_expires_at: tokens.expiry_date
    }, { returning: true })

    return user
}
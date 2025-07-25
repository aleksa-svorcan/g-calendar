import express from 'express'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import sequelize from './config/database.js'

import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import userRoutes from './routes/user.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}))

app.use('/auth', authRoutes)
app.use('/events', eventRoutes)
app.use('/user', userRoutes)

sequelize.authenticate()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ DB Connection Failed:', err))

app.listen(5000, () => console.log('Backend running on http://localhost:5000'))

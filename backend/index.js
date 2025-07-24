import express from 'express'
import cors from 'cors'
import sequelize from './config/database.js'
import authRoutes from './routes/auth.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

sequelize.authenticate()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ DB Connection Failed:', err))

app.listen(5000, () => console.log('Backend running on http://localhost:5000'))

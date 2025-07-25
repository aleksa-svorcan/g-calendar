import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    google_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    access_token: {
        type: DataTypes.TEXT
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    token_expires_at: {
        type: DataTypes.STRING
    },
    refresh_token_expires_at: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

export default User

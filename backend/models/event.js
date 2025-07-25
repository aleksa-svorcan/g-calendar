import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import User from './user.js'

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.STRING, // Matches Google event ID
        primaryKey: true
    },
    summary: {
        type: DataTypes.STRING
    },
    html_link: {
        type: DataTypes.STRING
    },
    start_date: {
        type: DataTypes.DATEONLY // "2026-10-28"
    },
    end_date: {
        type: DataTypes.DATEONLY // "2026-10-29"
    },
    ical_uid: {
        type: DataTypes.STRING,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

// Associations
Event.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Event, { foreignKey: 'user_id' })

export default Event

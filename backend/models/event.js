import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import User from './user.js'

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    summary: {
        type: DataTypes.STRING
    },
    html_link: {
        type: DataTypes.STRING
    },
    start_date: {
        type: DataTypes.STRING
    },
    end_date: {
        type: DataTypes.STRING
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

Event.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Event, { foreignKey: 'user_id' })

export default Event

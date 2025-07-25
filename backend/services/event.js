import Event from '../models/event.js'
import { Op, literal } from 'sequelize'


export const getAll = async ({ userId, days = 7, ascending = true, page = 1, limit = 10 }) => {
    const now = new Date()
    const endDate = new Date()
    endDate.setDate(now.getDate() + days)

    const start = now.toISOString().split('T')[0]
    const end = endDate.toISOString().split('T')[0]

    const events = await Event.findAll({
        where: {
            user_id: userId,
            start_date: {
                [Op.between]: [start, end]
            }
        },
        order: [['start_date', ascending ? 'ASC' : 'DESC']]
    })

    const grouped = {}
    for (const event of events) {
        let key
        if (days === 30) {
            const startDate = new Date(event.start_date)
            const weekStart = new Date(startDate)
            weekStart.setDate(startDate.getDate() - startDate.getDay())
            key = weekStart.toISOString().split('T')[0]
        } else {
            key = event.start_date
        }

        if (!grouped[key]) grouped[key] = []
        grouped[key].push(event)
    }

    const allKeys = Object.keys(grouped).sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a))
    const paginatedKeys = allKeys.slice((page - 1) * limit, page * limit)

    const paginatedGrouped = {}
    for (const key of paginatedKeys) {
        paginatedGrouped[key] = grouped[key]
    }

    return {
        groupedEvents: paginatedGrouped,
        totalGroups: allKeys.length
    }
}

export const upsertEvent = async (googleEvent, userId) => {
    const startDate = googleEvent.start?.date || googleEvent.start?.dateTime?.split('T')[0]
    const endDate = googleEvent.end?.date || googleEvent.end?.dateTime?.split('T')[0]

    return await Event.upsert({
        id: googleEvent.id,
        summary: googleEvent.summary || '',
        html_link: googleEvent.htmlLink || '',
        start_date: startDate,
        end_date: endDate,
        ical_uid: googleEvent.iCalUID || '',
        user_id: userId
    })
}

export const deleteAllEventsForUser = async (userId) => {
    return await Event.destroy({ where: { user_id: userId } })
}
import Event from '../models/event.js'

export const getAll = async ({ limit, offset, ascending, userId = {} }) => {
    const where = {
        user_id: userId
    }

    return await Event.findAndCountAll({
        where,
        limit,
        offset,
        order: [['start_date', ascending ? 'ASC' : 'DESC']]
    })
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
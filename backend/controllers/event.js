import {google} from "googleapis";
import {findUserById} from "../services/user.js"
import {getOAuthClient} from "../services/gAuth.js";
import {getAll, upsertEvent, deleteAllEventsForUser} from "../services/event.js"

export const fetchEvents = async (req, res) => {
    const userId = req.session.userId
    if (!userId) return res.status(401).json({ message: 'Not logged in' })

    try {
        const user = await findUserById(userId)
        if (!user) return res.status(404).json({ error: "No user found." })

        const auth = getOAuthClient({
            access_token: user.access_token,
            refresh_token: user.refresh_token
        })

        const calendar = google.calendar({ version: 'v3', auth })


        const events = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime'
        })

        await deleteAllEventsForUser(userId)

        for (const evt of events.data.items) {
            await upsertEvent(evt, userId)
        }

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const ascending = parseInt(req.query.ascending) === 1
        const days = parseInt(req.query.days) || 7

        const result = await getAll({ userId, page, limit, ascending, days })

        res.json({
            data: result.groupedEvents,
            meta: {
                total: result.totalGroups,
                per_page: limit,
                current_page: page,
                total_pages: Math.ceil(result.totalGroups / limit),
                ascending: ascending ? 1 : 0
            }
        })

    } catch (err) {
        console.error('Sync and list error:', err)
        res.status(500).json({ message: 'Failed to sync and fetch events' })
    }
}

export const createEvent = async (req, res) => {
    const userId = req.session.userId
    if (!userId) return res.status(401).json({ message: 'Not logged in' })

    const user = await findUserById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const auth = getOAuthClient({
        access_token: user.access_token,
        refresh_token: user.refresh_token
    })

    const calendar = google.calendar({ version: 'v3', auth })

    const event = {
        summary: req.body.summary,
        description: req.body.description,
        start: { dateTime: req.body.start },
        end: { dateTime: req.body.end }
    }

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event
        })

        res.json(response.data)

    } catch (err) {
        console.error('Error while creating calendar event:', err)
        res.status(500).json({ message: 'Failed to create calendar event' })
    }
}

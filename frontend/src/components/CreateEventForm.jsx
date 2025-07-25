import { useState } from 'react'
import {
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material'
import api from '../api/axios'

const CreateEventForm = ({ onCreated }) => {
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!summary || !start || !end) return

        setLoading(true)
        try {
            await api.post('/events', {
                summary,
                description,
                start,
                end
            })
            if (onCreated) onCreated()
        } catch (e) {
            console.error('Failed to create event', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                    />
                    <TextField
                        label="Start (YYYY-MM-DDTHH:mm)"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="End (YYYY-MM-DDTHH:mm)"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} disabled={loading} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Box>
    )
}

export default CreateEventForm

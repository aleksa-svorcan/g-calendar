import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    Dialog
} from '@mui/material'
import api from '../api/axios.js'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import CreateEventForm from '../components/CreateEventForm'

const IndexPage = () => {
    const [events, setEvents] = useState({})
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [range, setRange] = useState(7)
    const [open, setOpen] = useState(false)

    const getEvents = async (pageNumber = 1, selectedRange = range) => {
        try {
            const response = await api.get('/events', {
                params: {
                    page: pageNumber,
                    limit: 10,
                    days: selectedRange
                }
            })
            setEvents(response.data.data)
            setTotalPages(response.data.meta.total_pages)
        } catch (e) {
            console.error('Error while getting events: ', e)
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value)
        getEvents(value)
    }

    const handleRangeChange = (event, newRange) => {
        if (newRange !== null) {
            setRange(newRange)
            setPage(1)
            getEvents(1, newRange)
        }
    }

    useEffect(() => {
        getEvents(page, range)
    }, [page, range])

    return (
        <Container sx={{ paddingTop: 4 }}>
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Dashboard</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <ToggleButtonGroup
                        value={range}
                        exclusive
                        onChange={handleRangeChange}
                        size="small"
                    >
                        <ToggleButton value={1}>1 Day</ToggleButton>
                        <ToggleButton value={7}>7 Days</ToggleButton>
                        <ToggleButton value={30}>30 Days</ToggleButton>
                    </ToggleButtonGroup>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Create Event
                    </Button>
                </Box>
            </Box>

            {Object.keys(events).length === 0 ? (
                <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
                    No data available in this date range.
                </Typography>
            ) : (
                Object.keys(events).map((groupKey) => (
                    <Box key={groupKey} mb={4}>
                        <Typography variant="h6" gutterBottom>
                            {(() => {
                                try {
                                    const parsed = parseISO(groupKey)
                                    return range === 30
                                        ? `Week of ${format(parsed, 'MMM d, yyyy')}`
                                        : format(parsed, 'EEEE, MMM d')
                                } catch {
                                    return groupKey
                                }
                            })()}
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Summary</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Link</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events[groupKey].map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell>{event.summary}</TableCell>
                                            <TableCell>{event.start_date}</TableCell>
                                            <TableCell>{event.end_date}</TableCell>
                                            <TableCell>
                                                <a
                                                    href={event.html_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))
            )}

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <CreateEventForm
                    onCreated={() => {
                        setOpen(false)
                        getEvents(page, range)
                    }}
                />
            </Dialog>
        </Container>
    )
}

export default IndexPage

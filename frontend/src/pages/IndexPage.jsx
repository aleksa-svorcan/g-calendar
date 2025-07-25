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
    Pagination
} from '@mui/material'
import api from "../api/axios.js"
import {useEffect, useState} from "react"

const IndexPage = () => {
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const getEvents = async (pageNumber = 1) => {
        try {
            const response = await api.get('/events', {
                params: { page: pageNumber, limit: 10 }
            })
            setEvents(response.data.data)
            setTotalPages(response.data.meta.total_pages)
        } catch (e) {
            console.error("Error while getting events: ", e)
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value)
        getEvents(value)
    }

    useEffect(() => {
        getEvents(page)
    }, [])

    return (
        <Container sx={{ paddingTop: 4 }}>
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
                        {events.map(event => (
                            <TableRow key={event.id}>
                                <TableCell>{event.summary}</TableCell>
                                <TableCell>{event.start_date}</TableCell>
                                <TableCell>{event.end_date}</TableCell>
                                <TableCell>
                                    <a href={event.html_link} target="_blank" rel="noopener noreferrer">View</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    )
}

export default IndexPage

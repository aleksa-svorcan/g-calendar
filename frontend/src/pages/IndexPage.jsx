import {Box, Container, Typography} from '@mui/material'
import api from "../api/axios.js"
import {useEffect} from "react";

const IndexPage = () => {

    const getEvents = async () => {
        try {
            const response = await api.get('/calendar')
            console.log('response', response.data)
        } catch (e) {
            console.log("error while getting events: ", e)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <Container sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 'calc(50% - 100px)',
                alignItems: 'center'
            }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
            </Box>
        </Container>
    )
}

export default IndexPage
import {Box, Container, Typography} from '@mui/material'

const IndexPage = () => {
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
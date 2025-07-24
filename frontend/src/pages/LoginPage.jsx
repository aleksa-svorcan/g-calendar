import {Box, Button, Container, Typography} from '@mui/material'

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/login'
    }

    return (
        <Container sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 'calc(50% - 100px)',
                alignItems: 'center'
            }}>
                <Typography variant="h4" gutterBottom>
                    Sign in with Google
                </Typography>
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Container>
    )
}

export default LoginPage
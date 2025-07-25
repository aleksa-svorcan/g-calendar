import axios from 'axios'

const api = axios.create({
    baseURL: '/api', // Vite will proxy this to http://localhost:5000
    withCredentials: true, // needed if using cookies/sessions
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
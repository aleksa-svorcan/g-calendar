import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthGuard = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('api/user/me', { withCredentials: true })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                navigate('/login')
            })
    }, [])

    if (loading) return <div>Loading...</div>

    return children
}

export default AuthGuard
import axios from 'axios'


// instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 60 * 60 * 1000, // 1 hour
    withCredentials: true,
})


// export 

export default api
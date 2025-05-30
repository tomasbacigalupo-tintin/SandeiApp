import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

let authToken: string | null = localStorage.getItem('token')

export function setAuthToken(token: string | null) {
  authToken = token
  if (token) localStorage.setItem('token', token)
  else localStorage.removeItem('token')
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null)
      window.dispatchEvent(new Event('unauthorized'))
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api

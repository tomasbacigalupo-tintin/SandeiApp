import axios from 'axios';

// Usa la variable de entorno VITE_API_URL y concatena /api
const baseURL =
  (import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '') + '/api';

const api = axios.create({
  baseURL,
});

// Mock mínimo para setAuthToken
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;

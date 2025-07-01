import axios from 'axios';

// Construye la baseURL usando VITE_API_URL y asegurando que termina con /api
let baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
if (!baseURL.endsWith('/api')) {
  baseURL += '/api';
}

const api = axios.create({
  baseURL,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;

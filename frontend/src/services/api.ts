import axios from 'axios';

// Lee la URL base desde la variable de entorno
export const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

const baseURL = API_URL;

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

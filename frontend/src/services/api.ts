import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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

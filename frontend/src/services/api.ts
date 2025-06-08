// Mock mínimo de API para evitar error de import. Reemplaza con tu lógica real si es necesario.
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default api;

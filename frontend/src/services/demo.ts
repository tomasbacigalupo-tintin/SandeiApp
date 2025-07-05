import api from './api';

const API_URL = import.meta.env.VITE_API_URL;

export async function createDemoData() {
  await api.post(`${API_URL}/api/demo`);
}

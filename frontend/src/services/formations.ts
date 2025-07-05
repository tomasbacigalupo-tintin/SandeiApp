import api from './api';

const API_URL = import.meta.env.VITE_API_URL;

export async function createFormation(data: {
  name: string;
  description?: string;
}) {
  const res = await api.post(`${API_URL}/api/formations`, data);
  return res.data;
}

export async function getFormations() {
  const res = await api.get(`${API_URL}/api/formations`);
  return res.data;
}

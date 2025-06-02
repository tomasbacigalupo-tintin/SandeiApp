import api from './api';

export async function createFormation(data: {
  name: string;
  description?: string;
}) {
  const res = await api.post('/formations', data);
  return res.data;
}

export async function getFormations() {
  const res = await api.get('/formations');
  return res.data;
}

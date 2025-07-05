import api, { API_URL } from './api';

export async function createDemoData() {
  await api.post(`${API_URL}/api/demo`);
}

import api from './api';

export async function createDemoData() {
  await api.post('/demo');
}

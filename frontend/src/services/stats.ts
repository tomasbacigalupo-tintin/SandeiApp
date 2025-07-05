import api from './api';

const API_URL = import.meta.env.VITE_API_URL;
import type { StatItem } from '@/types/stats';

export async function getStats(range: 'month' | 'season'): Promise<StatItem[]> {
  const res = await api.get(`${API_URL}/api/stats`, { params: { range } });
  return res.data;
}

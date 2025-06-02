import api from './api';
import { StatItem } from '@/types/stats';

export async function getStats(range: 'month' | 'season'): Promise<StatItem[]> {
  const res = await api.get(`/stats`, { params: { range } });
  return res.data;
}

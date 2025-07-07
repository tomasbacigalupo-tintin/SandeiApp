import api, { API_URL } from './api';
import type { Match } from '../types/match';

export async function getMatches(): Promise<Match[]> {
  const res = await api.get(`${API_URL}/api/matches`);
  return res.data;
}

import api from './api';

const API_URL = import.meta.env.VITE_API_URL;
import type { Match } from '../types/match';

export async function getMatches(): Promise<Match[]> {
  const res = await api.get(`${API_URL}/api/matches`);
  return res.data;
}

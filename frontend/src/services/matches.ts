import api from './api';
import { Match } from '../types/match';

export async function getMatches(): Promise<Match[]> {
  const res = await api.get('/matches');
  return res.data;
}

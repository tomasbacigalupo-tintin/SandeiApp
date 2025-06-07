import api from './api';
import type { CreatePlayerInput, Player } from '../types/player';

export async function createPlayer(data: CreatePlayerInput): Promise<Player> {
  const res = await api.post('/players', data);
  return res.data;
}
export async function deletePlayer(id: string) {
  await api.delete(`/players/${id}`);
}
export async function updatePlayer(
  id: string,
  data: Partial<CreatePlayerInput>,
): Promise<Player> {
  const res = await api.put(`/players/${id}`, data);
  return res.data;
}
export async function getPlayers(): Promise<Player[]> {
  const res = await api.get('/players');
  return res.data;
}

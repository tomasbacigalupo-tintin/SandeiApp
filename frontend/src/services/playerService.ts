import api from './api';

const API_URL = import.meta.env.VITE_API_URL;
import type { CreatePlayerInput, Player } from '../types/player';

export async function createPlayer(data: CreatePlayerInput): Promise<Player> {
  const res = await api.post(`${API_URL}/api/players`, data);
  return res.data;
}
export async function deletePlayer(id: string) {
  await api.delete(`${API_URL}/api/players/${id}`);
}
export async function updatePlayer(
  id: string,
  data: Partial<CreatePlayerInput>,
): Promise<Player> {
  const res = await api.put(`${API_URL}/api/players/${id}`, data);
  return res.data;
}
export async function getPlayers(): Promise<Player[]> {
  const res = await api.get(`${API_URL}/api/players`);
  return res.data;
}

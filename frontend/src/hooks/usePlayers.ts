import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'sonner';
import type { Player, CreatePlayerInput } from '@/types/player';

const fetchPlayers = async (): Promise<Player[]> => {
  const res = await api.get('/players');
  return res.data;
};

export const usePlayers = () => {
  // MOCK: Devuelve jugadores de ejemplo
  return {
    data: [
      { id: '1', name: 'Lionel Messi', stats: { goals: 10, assists: 5 } },
      { id: '2', name: 'Cristiano Ronaldo', stats: { goals: 8, assists: 3 } },
    ],
    isLoading: false,
    error: null,
  };
};

export const useCreatePlayer = () => ({
  mutateAsync: async () => {},
  isLoading: false,
  error: null,
});

export const useDeletePlayer = () => ({
  mutateAsync: async () => {},
  isLoading: false,
  error: null,
});

export const useUpdatePlayer = () => ({
  mutateAsync: async () => {},
  isLoading: false,
  error: null,
});

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { API_URL } from '@/services/api';
import { toast } from 'sonner';
import type { Player, CreatePlayerInput } from '@/types/player';

const fetchPlayers = async (): Promise<Player[]> => {
  const res = await api.get(`${API_URL}/api/players`);
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

<<<<<<< HEAD
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
=======
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation<Player, Error, CreatePlayerInput>({
    mutationFn: async (playerData: CreatePlayerInput) => {
      const res = await api.post(`${API_URL}/api/players`, playerData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Jugador creado correctamente');
      if (navigator.vibrate) navigator.vibrate(50);
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
    onError: () => {
      // handled globally
    },
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Player,
    Error,
    { id: string; data: Partial<CreatePlayerInput> }
  >({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePlayerInput>;
    }) => {
      const res = await api.put(`${API_URL}/api/players/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Jugador actualizado');
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
    onError: () => {
      // handled globally
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await api.delete(`${API_URL}/api/players/${id}`);
    },
    onSuccess: () => {
      toast.success('Jugador eliminado');
      if (navigator.vibrate) navigator.vibrate(50);
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
    onError: () => {
      // handled globally
    },
  });
};
>>>>>>> 4d6d44ccf4fe5e57a7dd184a4c8d6d3a5f9df5eb

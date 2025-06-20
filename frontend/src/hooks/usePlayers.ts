import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'sonner';
import type { Player, CreatePlayerInput } from '@/types/player';

const fetchPlayers = async (): Promise<Player[]> => {
  const res = await api.get('/players');
  return res.data;
};

export const usePlayers = () => {
  return useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  });
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation<Player, Error, CreatePlayerInput>({
    mutationFn: async (playerData: CreatePlayerInput) => {
      const res = await api.post('/players', playerData);
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
      const res = await api.put(`/players/${id}`, data);
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
      await api.delete(`/players/${id}`);
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

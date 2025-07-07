import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import type { Formation, CreateFormationInput } from '@/types/formation';
import { toast } from 'sonner';

const fetchFormations = async (): Promise<Formation[]> => {
  const res = await api.get('/formations');
  return res.data;
};

export const useFormations = () => {
  // MOCK: Devuelve formaciones de ejemplo
  return {
    data: [
      { id: '1', name: '4-3-3', description: 'Ofensiva' },
      { id: '2', name: '4-4-2', description: 'Clásica' },
    ],
    isLoading: false,
    error: null,
  };
};

export const useCreateFormation = () => ({
  mutateAsync: async () => {},
  isLoading: false,
  error: null,
});

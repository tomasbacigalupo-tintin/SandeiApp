import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { API_URL } from '@/services/api';
import type { Formation, CreateFormationInput } from '@/types/formation';
import { toast } from 'sonner';

const fetchFormations = async (): Promise<Formation[]> => {
  const res = await api.get(`${API_URL}/api/formations`);
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

<<<<<<< HEAD
export const useCreateFormation = () => ({
  mutateAsync: async () => {},
  isLoading: false,
  error: null,
});
=======
export const useCreateFormation = () => {
  const queryClient = useQueryClient();
  return useMutation<Formation, Error, CreateFormationInput>({
    mutationFn: async (data: CreateFormationInput) => {
      const res = await api.post(`${API_URL}/api/formations`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Formaci\u00f3n creada');
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    },
    onError: () => {
      // handled globally
    },
  });
};
>>>>>>> 4d6d44ccf4fe5e57a7dd184a4c8d6d3a5f9df5eb

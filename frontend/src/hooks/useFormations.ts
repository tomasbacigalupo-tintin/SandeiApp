import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import type { Formation, CreateFormationInput } from '@/types/formation';
import { toast } from 'sonner';

const fetchFormations = async (): Promise<Formation[]> => {
  const res = await api.get('/formations');
  return res.data;
};

export const useFormations = () => {
  return useQuery<Formation[]>({
    queryKey: ['formations'],
    queryFn: fetchFormations,
  });
};

export const useCreateFormation = () => {
  const queryClient = useQueryClient();
  return useMutation<Formation, Error, CreateFormationInput>({
    mutationFn: async (data: CreateFormationInput) => {
      const res = await api.post('/formations', data);
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

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { API_URL } from '@/services/api';
import type { Formation, CreateFormationInput } from '@/types/formation';
import { toast } from 'sonner';

const fetchFormations = async (): Promise<Formation[]> => {
  const res = await api.get(`${API_URL}/api/formations`);
  return res.data;
};

export const useFormations = () =>
  useQuery<Formation[]>({
    queryKey: ['formations'],
    queryFn: fetchFormations,
  });

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

export const useUpdateFormation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Formation,
    Error,
    { id: string; data: Partial<CreateFormationInput> }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`${API_URL}/api/formations/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Formaci\u00f3n actualizada');
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    },
    onError: () => {
      // handled globally
    },
  });
};

export const useDeleteFormation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await api.delete(`${API_URL}/api/formations/${id}`);
    },
    onSuccess: () => {
      toast.success('Formaci\u00f3n eliminada');
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    },
    onError: () => {
      // handled globally
    },
  });
};


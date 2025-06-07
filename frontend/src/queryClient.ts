import {
  QueryClient,
  QueryCache,
  MutationCache,
  type QueryClientConfig,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';

const getMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'Error inesperado'
    );
  }
  if (error instanceof Error) return error.message;
  return 'Error inesperado';
};

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error: unknown) => {
        toast.error(getMessage(error));
      },
      // Ejemplo para producción:
      // staleTime: 1000 * 60 * 5, // 5 minutos
      // cacheTime: 1000 * 60 * 10, // 10 minutos
    },
    mutations: {
      onError: (error: unknown) => {
        toast.error(getMessage(error));
      },
      // retry: false, // desactivar si no querés reintentos
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(getMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(getMessage(error));
    },
  }),
};

export const queryClient = new QueryClient(config);


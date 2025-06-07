import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
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
    },
    mutations: {
      onError: (error: unknown) => {
        toast.error(getMessage(error));
      },
    },
  },
};

export const queryClient = new QueryClient(config);

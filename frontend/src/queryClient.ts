import {
  QueryClient,
  QueryCache,
  MutationCache,
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

export const queryClient = new QueryClient({
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
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

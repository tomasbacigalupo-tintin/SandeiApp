type ToastOptions = {
  title?: string;
  description?: string;
  variant?: 'success' | 'destructive' | 'default';
};

export const toast = (options: ToastOptions) => {};
export const useToast = () => ({ toast });
